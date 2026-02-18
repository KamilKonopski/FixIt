using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using FixIt.Infrastructure.Persistence;
using FixIt.Domain.Enums;
using FixIt.Api.Dtos;
using FixIt.Domain.Entities;
using FixIt.Api.Services;

namespace FixIt.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize]
    public class TicketsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly HistoryLogService _historyLogService;

        public TicketsController(ApplicationDbContext context, HistoryLogService historyLogService)
        {
            _context = context;
            _historyLogService = historyLogService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTickets([FromQuery] TicketQueryParamsDto queryParams)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var isAdmin = User.IsInRole("Admin");
            var isTechnician = User.IsInRole("Technician");

            IQueryable<Ticket> query = _context.Tickets;

            if (!isAdmin && !isTechnician)
            {
                query = query.Where(t => t.ClientId == userId);
            }
            else if (isTechnician)
            {
                query = query.Where(t =>
                    t.TechnicianId == userId || t.Status == TicketStatus.New);
            }

            //Title search
            if (!string.IsNullOrWhiteSpace(queryParams.Search))
            {
                var search = $"%{queryParams.Search}%";
                query = query.Where(t => EF.Functions.ILike(t.Title, search));
            }

            //Status Filter
            if (queryParams.Status.HasValue)
            {
                query = query.Where(t => t.Status == queryParams.Status);
            }

            //SORT
            query = queryParams.Sort == SortDirection.Asc ? query.OrderBy(t => t.CreatedAt) : query.OrderByDescending(t => t.CreatedAt);

            var totalCount = await query.CountAsync();

            var result = await query
                .Skip((queryParams.Page - 1) * queryParams.PageSize)
                .Take(queryParams.PageSize)
                .Select(t => new TicketDto(
                    t.Id,
                    t.Title,
                    t.Description,
                    t.Status,
                    t.CreatedAt,
                    t.ClientId,
                    $"{t.Client.FirstName} {t.Client.LastName}",
                    t.TechnicianId,
                    t.TechnicianId != null
                    ? $"{t.Technician!.FirstName} {t.Technician.LastName}"
                    : "Nieprzypisany"
                ))
                .ToListAsync();

            return Ok(new
            {
                totalCount,
                queryParams.Page,
                queryParams.PageSize,
                result
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TicketDetailsDto>> GetTicketDetails(Guid id)
        {
            var ticket = await _context.Tickets
                .Include(t => t.Client)
                .Include(t => t.Technician)
                .Include(t => t.Notes).ThenInclude(n => n.Author)
                .Include(t => t.HistoryLogs).ThenInclude(h => h.ChangedByUser)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket == null) return NotFound("Nie znaleziono takiego zgłoszenia");

            var detailsDto = new TicketDetailsDto(
                ticket.Id,
                ticket.Title,
                ticket.Description,
                ticket.Status,
                ticket.CreatedAt,
                ticket.ClientId,
                $"{ticket.Client.FirstName} {ticket.Client.LastName}",
                ticket.TechnicianId,
                ticket.Technician != null
                ? $"{ticket.Technician.FirstName} {ticket.Technician.LastName}"
                : "Nieprzypisany",
                ticket.Notes
                    .OrderByDescending(n => n.CreatedAt)
                    .Select(n => new NoteDto(
                        n.Id,
                        n.Content,
                        n.CreatedAt,
                        n.AuthorId,
                        $"{n.Author.FirstName} {n.Author.LastName}"))
                    .ToList(),
                ticket.HistoryLogs
                    .OrderByDescending(h => h.CreatedAt)
                    .Select(h => new HistoryLogDto(
                        h.Id,
                        h.Description,
                        h.CreatedAt,
                        h.ChangedByUserId,
                        $"{h.ChangedByUser.FirstName} {h.ChangedByUser.LastName}"))
                    .ToList()
             );

            return Ok(detailsDto);
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CreateTicket(CreateTicketDto dto)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var ticket = new Ticket
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Description = dto.Description,
                Status = TicketStatus.New,
                CreatedAt = DateTime.UtcNow,
                ClientId = userId
            };

            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return Ok(ticket.Id);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Technician,Admin")]
        public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] TicketStatus newStatus)
        {
            var ticket = await _context.Tickets
                .FirstOrDefaultAsync(t => t.Id == id);
            if (ticket == null) return NotFound();

            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            if (!User.IsInRole("Admin") && ticket.TechnicianId != userId)
                return Forbid();

            string description = $"Zmiana statusu z {ticket.Status} na {newStatus}";

            ticket.Status = newStatus;

            await _historyLogService.AddHistoryLog(id, userId, description);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteTicket(Guid id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null) return NotFound();

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/claim")]
        [Authorize(Roles = "Technician")]
        public async Task<IActionResult> ClaimTicket(Guid id)
        {
            var technicianId =
                Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var activeTicketsCount = await _context.Tickets.CountAsync(t =>
                t.TechnicianId == technicianId &&
                (t.Status == TicketStatus.Assigned ||
                 t.Status == TicketStatus.InProgress));

            if (activeTicketsCount >= 3)
            {
                return BadRequest(
                    "Masz już 3 aktywne zgłoszenia. Ukończ obecne, aby wziąć nowe");
            }

            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null) return NotFound("Zgłoszenie nie istnieje.");
            if (ticket.Status != TicketStatus.New)
                return BadRequest("To zgłoszenie jest już zajęte.");

            ticket.TechnicianId = technicianId;
            ticket.Status = TicketStatus.Assigned;

            await _historyLogService.AddHistoryLog(id, technicianId, "Technik przypisał zgłoszenie do siebie.");

            await _context.SaveChangesAsync();
            return Ok("Zgłoszenie zostało przypisane.");
        }
    }
}
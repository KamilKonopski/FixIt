using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using FixIt.Infrastructure.Persistence;
using FixIt.Domain.Enums;
using FixIt.Api.Dtos;
using FixIt.Domain.Entities;

namespace FixIt.Api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize]
    public class TicketsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TicketsController(ApplicationDbContext context)
        {
            _context = context;
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
                    t.TechnicianId
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
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null) return NotFound();

            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            if (!User.IsInRole("Admin") && ticket.TechnicianId != userId)
                return Forbid();

            ticket.Status = newStatus;
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

            await _context.SaveChangesAsync();

            return Ok("Zgłoszenie zostało przypisane do Ciebie.");
        }
    }
}
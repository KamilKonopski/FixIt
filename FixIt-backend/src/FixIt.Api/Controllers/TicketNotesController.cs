using FixIt.Api.Services;
using FixIt.Domain.Entities;
using FixIt.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FixIt.Api.Controllers
{
    [ApiController]
    [Route("api/tickets/{ticketId}/notes")]
    [Authorize]
    public class TicketNotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly HistoryLogService _historyLogService;

        public TicketNotesController(ApplicationDbContext context, HistoryLogService historyLogService)
        {
            _context = context;
            _historyLogService = historyLogService;
        }

        [HttpPost]
        public async Task<IActionResult> AddNote(Guid ticketId, [FromBody] string content)
        {
            var ticket = await _context.Tickets.AnyAsync(t => t.Id == ticketId);
            if (!ticket) return NotFound();

            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var note = new TicketNote
            {
                Id = Guid.NewGuid(),
                TicketId = ticketId,
                AuthorId = userId,
                Content = content,
                CreatedAt = DateTime.UtcNow,
            };

            _context.TicketNotes.Add(note);

            await _historyLogService.AddHistoryLog(ticketId, userId, "Użytkownik dodał nową notatkę.");
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

using FixIt.Domain.Entities;
using FixIt.Infrastructure.Persistence;

namespace FixIt.Api.Services
{
    public class HistoryLogService
    {
        private readonly ApplicationDbContext _context;

        public HistoryLogService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddHistoryLog(Guid ticketId, Guid userId, string description)
        {
            var log = new TicketHistoryLog
            {
                Id = Guid.NewGuid(),
                TicketId = ticketId,
                ChangedByUserId = userId,
                Description = description,
                CreatedAt = DateTime.UtcNow,
            };

            _context.TicketHistoryLogs.Add(log);

            await _context.SaveChangesAsync();
        }
    }
}

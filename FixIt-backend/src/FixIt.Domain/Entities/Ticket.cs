using FixIt.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace FixIt.Domain.Entities
{
    public class Ticket
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public TicketStatus Status { get; set; } = TicketStatus.New;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid ClientId { get; set; }
        [ForeignKey("ClientId")]
        public virtual User Client { get; set; } = null!;

        public Guid? TechnicianId { get; set; }
        [ForeignKey("TechnicianId")]
        public virtual User? Technician { get; set; }

        public virtual ICollection<TicketNote> Notes { get; set; } = new List<TicketNote>();
        public virtual ICollection<TicketHistoryLog> HistoryLogs { get; set; } = new List<TicketHistoryLog>();
    }
}

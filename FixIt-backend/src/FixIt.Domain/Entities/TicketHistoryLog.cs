using System.ComponentModel.DataAnnotations.Schema;

namespace FixIt.Domain.Entities
{
    public class TicketHistoryLog
    {
        public Guid Id { get; set; }
        public Guid TicketId { get; set; }
        public Guid ChangedByUserId { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("TicketId")]
        public virtual Ticket Ticket { get; set; } = null!;

        [ForeignKey("ChangedByUserId")]
        public virtual User ChangedByUser { get; set; } = null!;
    }
}

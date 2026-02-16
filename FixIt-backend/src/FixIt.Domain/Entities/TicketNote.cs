using System.ComponentModel.DataAnnotations.Schema;

namespace FixIt.Domain.Entities
{
    public class TicketNote
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid TicketId { get; set; }
        public Guid AuthorId { get; set; }

        [ForeignKey("TicketId")]
        public virtual Ticket Ticket { get; set; } = null!;

        [ForeignKey("AuthorId")]
        public virtual User Author { get; set; } = null!;
    }
}

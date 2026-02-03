using FixIt.Domain.Enums;

namespace FixIt.Api.Dtos;

public record CreateTicketDto(string Title, string Description);
public record TicketDto(Guid Id, string Title, string Description, TicketStatus Status, DateTime CreatedAt, Guid ClientId, Guid? TechnicianId);
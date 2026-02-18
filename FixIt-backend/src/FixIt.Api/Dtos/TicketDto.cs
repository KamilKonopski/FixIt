using FixIt.Domain.Enums;

namespace FixIt.Api.Dtos;

public record CreateTicketDto(string Title, string Description);
public record TicketDto(
    Guid Id,
    string Title,
    string Description,
    TicketStatus Status,
    DateTime CreatedAt,
    Guid ClientId,
    string ClientName,
    Guid? TechnicianId,
    string? TechnicianName
);
public record TicketQueryParamsDto(
    int Page = 1,
    int PageSize = 10,
    string? Search = null,
    TicketStatus? Status = null,
    SortDirection Sort = SortDirection.Desc
);

public record TicketDetailsDto(
    Guid Id,
    string Title,
    string Description,
    TicketStatus Status,
    DateTime CreatedAt,
    Guid ClientId,
    string ClientName,
    Guid? TechnicianId,
    string? TechnicianName,
    List<NoteDto> Notes,
    List<HistoryLogDto> HistoryLogs
);
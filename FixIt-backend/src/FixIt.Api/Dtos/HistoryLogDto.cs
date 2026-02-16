public record HistoryLogDto(
    Guid Id,
    string Description,
    DateTime CreatedAt,
    Guid ChangedByUserId,
    string UserFullName
);
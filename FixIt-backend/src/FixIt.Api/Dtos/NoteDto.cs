public record NoteDto(
    Guid Id,
    string Content,
    DateTime CreatedAt,
    Guid AuthorId,
    string AuthorFullName
);
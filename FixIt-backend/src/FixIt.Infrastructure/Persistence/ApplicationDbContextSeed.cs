using BC = BCrypt.Net.BCrypt;
using FixIt.Domain.Entities;
using FixIt.Domain.Enums;

namespace FixIt.Infrastructure.Persistence;

public static class ApplicationDbContextSeed
{
    public static async Task SeedSampleDataAsync(ApplicationDbContext context)
    {
        if (!context.Users.Any())
        {
            context.Users.Add(new User
            {
                Id = Guid.NewGuid(),
                Email = "admin@fixit.pl",
                PasswordHash = BC.HashPassword("Admin123!"),
                FirstName = "Główny",
                LastName = "Administrator",
                Role = UserRole.Admin
            });

            await context.SaveChangesAsync();
        }
    }
}
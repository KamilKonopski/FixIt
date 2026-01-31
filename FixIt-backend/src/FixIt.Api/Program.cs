using DotNetEnv;
using FixIt.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

Env.Load(Path.Combine(Directory.GetCurrentDirectory(), "../../.env"));

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

foreach (var envVar in new[] { "DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD" })
{
    var value = Environment.GetEnvironmentVariable(envVar);
    if (!string.IsNullOrEmpty(value))
    {
        connectionString = connectionString?.Replace($"${{{envVar}}}", value);
    }
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();

        await context.Database.MigrateAsync();

        await ApplicationDbContextSeed.SeedSampleDataAsync(context);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"B³¹d bazy: {ex.Message}");
    }
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowReact");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
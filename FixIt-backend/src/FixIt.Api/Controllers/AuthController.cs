using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt;
using FixIt.Api.Dtos;
using FixIt.Api.Services;
using FixIt.Domain.Enums;
using FixIt.Domain.Entities;
using FixIt.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace FixIt.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly TokenService _tokenService;

    public AuthController(ApplicationDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest("Użytkownik o tym adresie już istnieje");

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Role = UserRole.User,
            PasswordHash = BC.HashPassword(dto.Password),
            CreatedAt = DateTime.UtcNow,
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("Rejestracja pomyślna! Możesz się zalogować!");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null || !BC.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Nieprawidłowy email lub hasło!");

        var token = _tokenService.CreateToken(user);

        return Ok(new AuthResponseDto(token, user.Email, user.Role.ToString()));
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetMe()
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (userIdClaim == null) return Unauthorized();

        var user = await _context.Users.FindAsync(Guid.Parse(userIdClaim.Value));
        if (user == null) return Unauthorized();

        return Ok(new
        {
            user.Email,
            user.FirstName,
            user.LastName,
            Role = user.Role.ToString()
        });
    }
}
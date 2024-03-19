using HealthHub.Application.Features.LoggedCardioExercises;
using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthHub.Infrastructure.Repositories
{
    public class LoggedCardioExerciseRepository : BaseRepository<LoggedCardioExercise>, ILoggedCardioExerciseRepository
    {
        public LoggedCardioExerciseRepository(HealthHubContext context) : base(context)
        {
        }

        public async Task<Result<List<LoggedCardioExerciseDto>>> GetByUserIdAndDateAsync(Guid userId, DateTime date)
        {
            var dayStart = date.Date;
            var dayEnd = dayStart.AddDays(1);
            var loggedCardioExercise = await context.LoggedCardioExercises
                .Where(x => x.UserId == userId && x.DateLogged >= dayStart && x.DateLogged < dayEnd)
                .Select(x => new LoggedCardioExerciseDto
                {
                    LoggedCardioExerciseId = x.LoggedCardioExerciseId,
                    UserId = x.UserId,
                    Name = x.Name,
                    Duration = x.Duration,
                    CaloriesBurned = x.CaloriesBurned,
                    DateLogged = x.DateLogged
                }).ToListAsync();
            return Result<List<LoggedCardioExerciseDto>>.Success(loggedCardioExercise);
        }

        public async Task<Result<List<LoggedCardioExerciseDto>>> GetRecentLoggedCardioExercises(Guid userId)
        {
            var loggedCardioExercises = await context.LoggedCardioExercises
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.DateLogged)
                .Take(15)
                .Select(x => new LoggedCardioExerciseDto
                {
                    LoggedCardioExerciseId = x.LoggedCardioExerciseId,
                    UserId = x.UserId,
                    Name = x.Name,
                    Duration = x.Duration,
                    CaloriesBurned = x.CaloriesBurned,
                    DateLogged = x.DateLogged
                })
                .ToListAsync();
            return Result<List<LoggedCardioExerciseDto>>.Success(loggedCardioExercises);
        }
    }
}

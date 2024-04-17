using HealthHub.Application.Features.EmailMessages.Queries.GetUserData;
using HealthHub.Application.Features.LoggedCardioExercises;
using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate;
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
        public async Task<Result<List<LoggedCardioExerciseDto>>> GetByUserIdAndDateInterval(Guid userId, DateRange dateRange)
        {
            var fromDate = GetFromDate(dateRange);
            var toDate = DateTime.UtcNow;
            var loggedCardioExercises = await context.LoggedCardioExercises
                .Where(x => x.UserId == userId && x.DateLogged >= fromDate && x.DateLogged <= toDate)
                .OrderByDescending(x => x.DateLogged)
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
        private DateTime GetFromDate(DateRange range)
        {
            switch (range)
            {
                case DateRange.Last7Days:
                    return DateTime.UtcNow.AddDays(-7);
                case DateRange.Last90Days:
                    return DateTime.UtcNow.AddDays(-90);
                case DateRange.Last180Days:
                    return DateTime.UtcNow.AddDays(-180);
                case DateRange.LastYear:
                    return DateTime.UtcNow.AddYears(-1);
                default:
                    throw new ArgumentOutOfRangeException(nameof(range), range, null);
            }
        }
    }
}

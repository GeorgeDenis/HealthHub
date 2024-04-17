using HealthHub.Application.Features.EmailMessages.Queries.GetUserData;
using HealthHub.Application.Features.LoggedFoods.Queries.GetLoggedFoodByUserIdAndDate;
using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthHub.Infrastructure.Repositories
{
    public class LoggedFoodRepository : BaseRepository<LoggedFood>, ILoggedFoodRepository
    {
        public LoggedFoodRepository(HealthHubContext context) : base(context)
        {
        }

        public async Task<Result<List<LoggedFoodDto>>> GetByUserIdAndDateAsync(Guid userId, DateTime date)
        {
            var dayStart = date.Date;
            var dayEnd = dayStart.AddDays(1);
            var loggedFoods = await context.LoggedFoods
                .Where(x => x.UserId == userId && x.DateLogged >= dayStart && x.DateLogged < dayEnd)
                .Select(x => new LoggedFoodDto
                {
                    Id = x.LoggedFoodId,
                    UserId = x.UserId,
                    FoodName = x.Name,
                    ServingSize = x.ServingSize,
                    NumberOfServings = x.NumberOfServings,
                    Calories = x.Calories,
                    Protein = x.Protein,
                    Carbohydrates = x.Carbohydrates,
                    Fat = x.Fat,
                    MealType = x.MealType,
                    DateLogged = x.DateLogged
                }).ToListAsync();
            return Result<List<LoggedFoodDto>>.Success(loggedFoods);
        }

        public async Task<Result<List<LoggedFoodDto>>> GetRecentLoggedFoodByUserId(Guid userId)
        {
            var loggedFoods = await context.LoggedFoods
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.DateLogged)
                .Take(15)
                .Select(x => new LoggedFoodDto
                {
                    Id = x.LoggedFoodId,
                    UserId = x.UserId,
                    FoodName = x.Name,
                    ServingSize = x.ServingSize,
                    NumberOfServings = x.NumberOfServings,
                    Calories = x.Calories,
                    Protein = x.Protein,
                    Carbohydrates = x.Carbohydrates,
                    Fat = x.Fat,
                    MealType = x.MealType,
                    DateLogged = x.DateLogged
                }).ToListAsync();
            return Result<List<LoggedFoodDto>>.Success(loggedFoods);
        }
        public async Task<Result<List<LoggedFoodDto>>> GetByUserIdAndDateInterval(Guid userId, DateRange dateRange)
        {
            var fromDate = GetFromDate(dateRange);
            var toDate = DateTime.UtcNow;
            var loggedFoods = await context.LoggedFoods
                .Where(x => x.UserId == userId && x.DateLogged >= fromDate && x.DateLogged <= toDate)
                .OrderByDescending(x => x.DateLogged)
                .Select(x => new LoggedFoodDto
                {
                    Id = x.LoggedFoodId,
                    UserId = x.UserId,
                    FoodName = x.Name,
                    ServingSize = x.ServingSize,
                    NumberOfServings = x.NumberOfServings,
                    Calories = x.Calories,
                    Protein = x.Protein,
                    Carbohydrates = x.Carbohydrates,
                    Fat = x.Fat,
                    MealType = x.MealType,
                    DateLogged = x.DateLogged
                }).ToListAsync();
            return Result<List<LoggedFoodDto>>.Success(loggedFoods);

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

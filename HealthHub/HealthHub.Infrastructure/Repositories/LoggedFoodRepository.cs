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
    }
}

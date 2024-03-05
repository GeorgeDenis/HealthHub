using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthHub.Infrastructure.Repositories
{
    public class LoggedWaterRepository : BaseRepository<LoggedWater>, ILoggedWaterRepository
    {
        public LoggedWaterRepository(HealthHubContext context) : base(context)
        {
        }

        public async Task<LoggedWater> GetByUserIdAndDate(Guid userId, DateTime date)
        {
            var dayStart = date.Date;
            var dayEnd = dayStart.AddDays(1);
            var loggedWater = await context.LoggedWater
                .Where(x => x.UserId == userId && x.DateLogged >= dayStart && x.DateLogged < dayEnd)
                .FirstOrDefaultAsync();
            return loggedWater;
        }
    }
}

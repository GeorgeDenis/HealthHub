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

        public async Task<int> GetLoggedConsecutiveWater(Guid userId)
        {
            var loggedWater = await context.LoggedWater
                .Where(x => x.UserId == userId)
                .OrderBy(x => x.DateLogged)
                .ToListAsync();

            if (loggedWater.Count == 0)
            {
                return 0;
            }

            var maxConsecutiveDays = 1; 
            var lastLoggedDate = loggedWater[0].DateLogged;
            var consecutiveDays = 1;

            for (int i = 1; i < loggedWater.Count; i++)
            {
                var currentDate = loggedWater[i].DateLogged.Date; 
                if (currentDate == lastLoggedDate.AddDays(1) && loggedWater[i].Amount > 0)
                {
                    consecutiveDays++;
                }
                else
                {
                    consecutiveDays = 1; 
                }

                if (consecutiveDays > maxConsecutiveDays)
                {
                    maxConsecutiveDays = consecutiveDays; 
                }

                lastLoggedDate = currentDate; 
            }


            return maxConsecutiveDays;
        }

    }
}

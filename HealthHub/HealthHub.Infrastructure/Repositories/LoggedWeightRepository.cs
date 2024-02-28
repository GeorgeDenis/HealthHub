using HealthHub.Application.Features.LoggedWeights;
using HealthHub.Application.Persistence;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthHub.Infrastructure.Repositories
{
    public class LoggedWeightRepository : BaseRepository<LoggedWeight>, ILoggedWeightRepository
    {
        public LoggedWeightRepository(HealthHubContext context) : base(context)
        {
        }

        public async Task<Result<List<LoggedWeightDto>>> GetByUserIdAsync(Guid userId)
        {
            var loggedWeights = await context.LoggedWeights
                .Where(lw => lw.UserId == userId)
                .Select(lw => new LoggedWeightDto
                {
                    Id = lw.LoggedWeightId,
                    UserId = lw.UserId,
                    Weight = lw.Weight,
                    DateLogged = lw.DateLogged
                }).ToListAsync();
            return Result<List<LoggedWeightDto>>.Success(loggedWeights);
        }
    }
}

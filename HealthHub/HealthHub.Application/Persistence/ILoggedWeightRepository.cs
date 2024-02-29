using HealthHub.Application.Features.LoggedWeights;
using HealthHub.Domain.Common;
using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface ILoggedWeightRepository : IAsyncRepository<LoggedWeight>
    {
        Task<Result<List<LoggedWeightDto>>> GetByUserIdAsync(Guid userId);
        Task<Result<LoggedWeightDto>> GetLastLoggedWeightByUserId(Guid userId);

    }
}

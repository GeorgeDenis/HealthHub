using HealthHub.Domain.Entities;

namespace HealthHub.Application.Persistence
{
    public interface IUserRepository : IAsyncRepository<User>
    {
    }
}

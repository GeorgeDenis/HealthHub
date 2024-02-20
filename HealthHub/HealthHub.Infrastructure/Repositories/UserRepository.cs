using HealthHub.Application.Persistence;
using HealthHub.Domain.Entities;

namespace HealthHub.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(HealthHubContext context) : base(context)
        {

        }


    }
}

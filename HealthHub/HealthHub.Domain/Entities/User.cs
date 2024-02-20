using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class User
    {
        private User(Guid userId)
        {
            UserId = userId;
        }

        public Guid UserId { get; private set; }

        public static Result<User> Create(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return Result<User>.Failure("UserId cannot be empty");
            }

            return Result<User>.Success(new User(userId));
        }
    }
}

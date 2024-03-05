using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class LoggedWater
    {
        private LoggedWater(Guid userId, float amount)
        {
            LoggedWaterId = Guid.NewGuid();
            UserId = userId;
            Amount = amount;
            DateLogged = DateTime.UtcNow;
        }
        public LoggedWater()
        {
        }
        public Guid LoggedWaterId { get; private set; }
        public Guid UserId { get; private set; }
        public float Amount { get; private set; }
        public DateTime DateLogged { get; private set; }
        public static Result<LoggedWater> Create(Guid userId, float amount)
        {
            if (amount <= 0)
            {
                return Result<LoggedWater>.Failure("Amount must be greater than 0");
            }
            return Result<LoggedWater>.Success(new LoggedWater(userId, amount));
        }
        public Result<LoggedWater> Update(float amount)
        {
            if (amount <= 0)
            {
                return Result<LoggedWater>.Failure("Amount must be greater than 0");
            }
            Amount = amount;
            return Result<LoggedWater>.Success(this);
        }

        
    }
}

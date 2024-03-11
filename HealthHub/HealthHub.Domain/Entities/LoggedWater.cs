using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class LoggedWater
    {
        private LoggedWater(Guid userId, float amount, DateTime dateTime)
        {
            LoggedWaterId = Guid.NewGuid();
            UserId = userId;
            Amount = amount;
            DateLogged = dateTime;
        }
        public LoggedWater()
        {
        }
        public Guid LoggedWaterId { get; private set; }
        public Guid UserId { get; private set; }
        public float Amount { get; private set; }
        public DateTime DateLogged { get; private set; }
        public static Result<LoggedWater> Create(Guid userId, float amount, DateTime dateTime)
        {
            if (amount < 0)
            {
                return Result<LoggedWater>.Failure("Amount must be greater than 0");
            }
            
            
            return Result<LoggedWater>.Success(new LoggedWater(userId, amount,dateTime));
        }
        public Result<LoggedWater> Update(float amount)
        {
            if (amount < 0)
            {
                return Result<LoggedWater>.Failure("Amount must be greater than 0");
            }
            Amount = amount;
            return Result<LoggedWater>.Success(this);
        }

        
    }
}

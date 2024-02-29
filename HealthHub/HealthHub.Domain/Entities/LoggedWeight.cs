using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class LoggedWeight
    {
        private LoggedWeight( Guid UserId, float Weight)
        {
            this.UserId = UserId;
            this.DateLogged = DateTime.UtcNow;
            this.Weight = Weight;
        }
        public LoggedWeight()
        {
        }
        public Guid LoggedWeightId { get; private set; }
        public Guid UserId { get; private set; }
        public DateTime DateLogged { get; private set; }
        public float Weight { get; private set; }
        public static Result<LoggedWeight> Create(Guid UserId, float Weight)
        {
            if(UserId == Guid.Empty)
            {
                return Result<LoggedWeight>.Failure("UserId cannot be empty");
            }
            if (Weight <= 0)
            {
                return Result<LoggedWeight>.Failure("Weight must be greater than 0");
            }
            return Result<LoggedWeight>.Success(new LoggedWeight(UserId, Weight));
            
        }
        

    }
}

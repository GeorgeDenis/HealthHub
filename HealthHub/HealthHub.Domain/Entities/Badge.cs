using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class Badge
    {
        private Badge(string name, int count, Guid userId, string type, string description)
        {
            BadgeId = Guid.NewGuid();
            Name = name;
            Count = count;
            UserId = userId;
            Type = type;

            if (type == "Challenge-Leader" || type == "Community-Champ" || type == "Friendly-Spirit" || type == "Consistency")
            {
                Active = true;
            }
            else
            {
                Active = false;

            }
            Description = description;
        }
        public Guid BadgeId { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public Guid UserId { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public Badge()
        {

        }
        public static Result<Badge> Create(string name, int count, Guid userId, string type, string description)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return Result<Badge>.Failure(Common.Constants.BadgeNameRequired);
            }
            if (count < 0)
            {
                return Result<Badge>.Failure(Common.Constants.BadgeCountRequired);
            }
            if (userId == Guid.Empty)
            {
                return Result<Badge>.Failure(Common.Constants.UserIdRequired);
            }
            if (string.IsNullOrWhiteSpace(type))
            {
                return Result<Badge>.Failure(Common.Constants.BadgeTypeRequired);
            }
            if (string.IsNullOrWhiteSpace(description))
            {
                return Result<Badge>.Failure(Common.Constants.BadgeDescriptionRequired);
            }

            return Result<Badge>.Success(new Badge(name, count, userId, type, description));
        }
        public Result<Badge> UpdateCount(int count)
        {
            if (count < 0)
            {
                return Result<Badge>.Failure(Common.Constants.BadgeCountRequired);
            }
            Count = count;
            switch (Type)
            {
                case "Nutrition":
                    if (count >= 30)
                    {
                        Active = true;
                    }
                    break;
                case "Weight":
                    if (count >= 6)
                    {
                        Active = true;
                    }
                    break;
                case "Community":
                    if (count >= 100)
                    {
                        Active = true;
                    }
                    break;
                case "Hydration":
                    if (count >= 30)
                    {
                        Active = true;
                    }
                    break;
                case "Recipe":
                    if (count >= 50)
                    {
                        Active = true;
                    }
                    break;
                case "Workout":
                    if (count >= 100)
                    {
                        Active = true;
                    }
                    break;
            }

            return Result<Badge>.Success(this);
        }
    }
}

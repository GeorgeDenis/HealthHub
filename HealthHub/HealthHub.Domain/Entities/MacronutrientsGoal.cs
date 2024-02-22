using HealthHub.Domain.Common;

namespace HealthHub.Domain.Entities
{
    public class MacronutrientsGoal
    {
        private MacronutrientsGoal( Guid userId, int protein, int carbohydrates, int fats)
        {
            MacronutrientsGoalId = Guid.NewGuid();
            UserId = userId;
            ProteinPercent = protein;
            CarbohydratesPercent = carbohydrates;
            FatsPercent = fats;
        }
        public MacronutrientsGoal()
        {
        }
        public Guid MacronutrientsGoalId { get; private set; }
        public Guid UserId { get; private set; }
        public int ProteinPercent { get; private set; }
        public int CarbohydratesPercent { get; private set; }
        public int FatsPercent { get; private set; }

        public static Result<MacronutrientsGoal> Create(Guid userId, int protein, int carbohydrates, int fats)
        {
            if (protein < 0)
            {
                return Result<MacronutrientsGoal>.Failure("Protein cannot be less than 0");
            }
            if (carbohydrates < 0)
            {
                return Result<MacronutrientsGoal>.Failure("Carbohydrates cannot be less than 0");
            }
            if (fats < 0)
            {
                return Result<MacronutrientsGoal>.Failure("Fats cannot be less than 0");
            }
            return Result<MacronutrientsGoal>.Success(new MacronutrientsGoal(userId, protein, carbohydrates, fats));
        }
        public Result<MacronutrientsGoal> Update(int protein, int carbohydrates, int fats)
        {
            if(protein < 0)
            {
                return Result<MacronutrientsGoal>.Failure("Protein percent cannot be less than 0");
            }
            if (carbohydrates < 0)
            {
                return Result<MacronutrientsGoal>.Failure("Carbohydrates percent cannot be less than 0");
            }
            if (fats < 0)
            {
                return Result<MacronutrientsGoal>.Failure("Fats percent cannot be less than 0");
            }
            if(protein + carbohydrates + fats != 100)
            {
                return Result<MacronutrientsGoal>.Failure("The sum of protein, carbohydrates and fats must be 100");
            }
            ProteinPercent = protein;
            CarbohydratesPercent = carbohydrates;
            FatsPercent = fats;
            return Result<MacronutrientsGoal>.Success(this);
        }
    }
}

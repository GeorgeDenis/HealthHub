namespace HealthHub.Application.Features.MacronutrientsGoal
{
    public class MacronutrientsGoalDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public int Protein { get; set; }
        public int Carbohydrates { get; set; }
        public int Fats { get; set; }
    }
}
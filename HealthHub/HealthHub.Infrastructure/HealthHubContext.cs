using HealthHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HealthHub.Infrastructure
{
    public class HealthHubContext : DbContext
    {
        public HealthHubContext(DbContextOptions<HealthHubContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<PasswordResetCode> PasswordResetCodes { get; set; }
        public DbSet<MacronutrientsGoal> MacronutrientsGoals { get; set; }
        public DbSet<LoggedWeight> LoggedWeights { get; set; }
        public DbSet<LoggedMeasurements> LoggedMeasurements { get; set; }
        public DbSet<LoggedFood> LoggedFoods { get; set; }
        public DbSet<LoggedWater> LoggedWater { get; set; }
        public DbSet<LoggedStrengthExercise> LoggedStrengthExercises { get; set; }
        public DbSet<LoggedCardioExercise> LoggedCardioExercises { get; set; }


    }
}

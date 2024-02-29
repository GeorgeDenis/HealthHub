using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LoggedCardioExercises",
                columns: table => new
                {
                    LoggedCardioExerciseId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Duration = table.Column<int>(type: "integer", nullable: false),
                    CaloriesBurned = table.Column<int>(type: "integer", nullable: false),
                    DateLogged = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoggedCardioExercises", x => x.LoggedCardioExerciseId);
                });

            migrationBuilder.CreateTable(
                name: "LoggedFoods",
                columns: table => new
                {
                    LoggedFoodId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ServingSize = table.Column<float>(type: "real", nullable: true),
                    NumberOfServings = table.Column<float>(type: "real", nullable: true),
                    MealType = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Calories = table.Column<int>(type: "integer", nullable: false),
                    Protein = table.Column<int>(type: "integer", nullable: false),
                    Carbohydrates = table.Column<int>(type: "integer", nullable: false),
                    Fat = table.Column<int>(type: "integer", nullable: false),
                    DateLogged = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoggedFoods", x => x.LoggedFoodId);
                });

            migrationBuilder.CreateTable(
                name: "LoggedStrengthExercises",
                columns: table => new
                {
                    LoggedStrengthExerciseId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    MuscleGroup = table.Column<string>(type: "text", nullable: false),
                    NumberOfSets = table.Column<int>(type: "integer", nullable: false),
                    WeightPerSet = table.Column<int>(type: "integer", nullable: false),
                    DateLogged = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoggedStrengthExercises", x => x.LoggedStrengthExerciseId);
                });

            migrationBuilder.CreateTable(
                name: "LoggedWeights",
                columns: table => new
                {
                    LoggedWeightId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    DateLogged = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Weight = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoggedWeights", x => x.LoggedWeightId);
                });

            migrationBuilder.CreateTable(
                name: "MacronutrientsGoals",
                columns: table => new
                {
                    MacronutrientsGoalId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProteinPercent = table.Column<int>(type: "integer", nullable: false),
                    CarbohydratesPercent = table.Column<int>(type: "integer", nullable: false),
                    FatsPercent = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MacronutrientsGoals", x => x.MacronutrientsGoalId);
                });

            migrationBuilder.CreateTable(
                name: "PasswordResetCodes",
                columns: table => new
                {
                    PasswordResetCodeId = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    ExpirationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PasswordResetCodes", x => x.PasswordResetCodeId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LoggedCardioExercises");

            migrationBuilder.DropTable(
                name: "LoggedFoods");

            migrationBuilder.DropTable(
                name: "LoggedStrengthExercises");

            migrationBuilder.DropTable(
                name: "LoggedWeights");

            migrationBuilder.DropTable(
                name: "MacronutrientsGoals");

            migrationBuilder.DropTable(
                name: "PasswordResetCodes");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

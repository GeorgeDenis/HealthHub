using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class LoggedStrengthExercise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_LoggedStrenghtExercises",
                table: "LoggedStrenghtExercises");

            migrationBuilder.RenameTable(
                name: "LoggedStrenghtExercises",
                newName: "LoggedStrengthExercises");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LoggedStrengthExercises",
                table: "LoggedStrengthExercises",
                column: "LoggedStrengthExerciseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_LoggedStrengthExercises",
                table: "LoggedStrengthExercises");

            migrationBuilder.RenameTable(
                name: "LoggedStrengthExercises",
                newName: "LoggedStrenghtExercises");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LoggedStrenghtExercises",
                table: "LoggedStrenghtExercises",
                column: "LoggedStrengthExerciseId");
        }
    }
}

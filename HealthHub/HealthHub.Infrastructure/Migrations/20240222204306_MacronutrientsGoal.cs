using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MacronutrientsGoal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MacronutrientsGoals");
        }
    }
}

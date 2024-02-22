using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHub.Identity.Migrations
{
    /// <inheritdoc />
    public partial class UserDataUpdateGoalType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GoalType",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GoalType",
                table: "AspNetUsers");
        }
    }
}

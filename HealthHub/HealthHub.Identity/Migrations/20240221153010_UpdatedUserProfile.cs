using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHub.Identity.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedUserProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Activity",
                table: "AspNetUsers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "CurrentWeight",
                table: "AspNetUsers",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "GoalWeight",
                table: "AspNetUsers",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "StartingWeight",
                table: "AspNetUsers",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "WeeklyGoal",
                table: "AspNetUsers",
                type: "real",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Activity",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CurrentWeight",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "GoalWeight",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StartingWeight",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "WeeklyGoal",
                table: "AspNetUsers");
        }
    }
}

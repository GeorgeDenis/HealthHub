using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AIConversationFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Message",
                table: "Recipes",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Recipes",
                newName: "Message");
        }
    }
}

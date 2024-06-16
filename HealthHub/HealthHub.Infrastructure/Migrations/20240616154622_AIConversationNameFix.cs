using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AIConversationNameFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Recipes",
                table: "Recipes");

            migrationBuilder.RenameTable(
                name: "Recipes",
                newName: "AIConversation");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AIConversation",
                table: "AIConversation",
                column: "AIConversationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AIConversation",
                table: "AIConversation");

            migrationBuilder.RenameTable(
                name: "AIConversation",
                newName: "Recipes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Recipes",
                table: "Recipes",
                column: "AIConversationId");
        }
    }
}

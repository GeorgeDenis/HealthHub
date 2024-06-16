using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AIConversationChatFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AiChat",
                table: "AiChat");

            migrationBuilder.RenameTable(
                name: "AiChat",
                newName: "AIChat");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AIChat",
                table: "AIChat",
                column: "AiChatId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AIChat",
                table: "AIChat");

            migrationBuilder.RenameTable(
                name: "AIChat",
                newName: "AiChat");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AiChat",
                table: "AiChat",
                column: "AiChatId");
        }
    }
}

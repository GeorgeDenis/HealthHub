using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AIConversationChat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AiChat",
                columns: table => new
                {
                    AiChatId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    DateSent = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AiConversationId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiChat", x => x.AiChatId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AiChat");
        }
    }
}

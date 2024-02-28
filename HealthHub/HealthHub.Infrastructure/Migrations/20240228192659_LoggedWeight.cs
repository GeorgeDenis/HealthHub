using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthHub.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class LoggedWeight : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LoggedWeights");
        }
    }
}

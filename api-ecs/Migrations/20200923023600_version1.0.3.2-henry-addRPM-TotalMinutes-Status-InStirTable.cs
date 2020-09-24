using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version1032henryaddRPMTotalMinutesStatusInStirTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RPM",
                table: "Stirs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Stirs",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TotalMinutes",
                table: "Stirs",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RPM",
                table: "Stirs");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Stirs");

            migrationBuilder.DropColumn(
                name: "TotalMinutes",
                table: "Stirs");
        }
    }
}

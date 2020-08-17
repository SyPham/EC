using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version104 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "MixingInfos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "MixingInfos");
        }
    }
}

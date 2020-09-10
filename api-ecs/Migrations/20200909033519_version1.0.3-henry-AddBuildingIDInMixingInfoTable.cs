using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version103henryAddBuildingIDInMixingInfoTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BuildingID",
                table: "MixingInfos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MixingInfoID",
                table: "BuildingGlues",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuildingID",
                table: "MixingInfos");

            migrationBuilder.DropColumn(
                name: "MixingInfoID",
                table: "BuildingGlues");
        }
    }
}

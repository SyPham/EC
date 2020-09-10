using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version103henryAddGlueNameInMixingInfoBuildingGlueTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GlueName",
                table: "MixingInfos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GlueName",
                table: "BuildingGlues",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GlueName",
                table: "MixingInfos");

            migrationBuilder.DropColumn(
                name: "GlueName",
                table: "BuildingGlues");
        }
    }
}

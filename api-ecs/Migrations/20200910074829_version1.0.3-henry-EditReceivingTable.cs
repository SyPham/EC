using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version103henryEditReceivingTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BuildingName",
                table: "IngredientsInfos",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "IngredientsInfos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "BuildingName",
                table: "IngredientInfoReports",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "IngredientInfoReports",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuildingName",
                table: "IngredientsInfos");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "IngredientsInfos");

            migrationBuilder.DropColumn(
                name: "BuildingName",
                table: "IngredientInfoReports");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "IngredientInfoReports");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version104AddColumnBatchInredientInfoAndReportsTblleo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Batch",
                table: "IngredientsInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Batch",
                table: "IngredientInfoReports",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Batch",
                table: "IngredientsInfos");

            migrationBuilder.DropColumn(
                name: "Batch",
                table: "IngredientInfoReports");
        }
    }
}

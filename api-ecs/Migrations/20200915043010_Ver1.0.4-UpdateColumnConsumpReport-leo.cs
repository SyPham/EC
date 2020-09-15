using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class Ver104UpdateColumnConsumpReportleo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Consumption",
                table: "IngredientInfoReports",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Consumption",
                table: "IngredientInfoReports",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}

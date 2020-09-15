using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class Ver105UpdateColumnConsumpIngredientleo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Consumption",
                table: "IngredientsInfos",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Consumption",
                table: "IngredientsInfos",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}

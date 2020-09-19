using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class Ver107UpdateDatetimeIngredientleo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpiredTime",
                table: "IngredientsInfos",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpiredTime",
                table: "IngredientInfoReports",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ExpiredTime",
                table: "IngredientsInfos",
                type: "int",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<int>(
                name: "ExpiredTime",
                table: "IngredientInfoReports",
                type: "int",
                nullable: false,
                oldClrType: typeof(DateTime));
        }
    }
}

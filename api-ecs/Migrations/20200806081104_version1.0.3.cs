using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version103 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Glues");

            migrationBuilder.DropColumn(
                name: "Real",
                table: "GlueIngredient");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Glues",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Real",
                table: "GlueIngredient",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version1032henryremoveGlueIDInStirTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GlueID",
                table: "Stirs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GlueID",
                table: "Stirs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

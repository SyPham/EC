using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version105RemoveForeignKeyBuildingGlueTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuildingGlues_Glues_GlueID",
                table: "BuildingGlues");

            migrationBuilder.DropIndex(
                name: "IX_BuildingGlues_GlueID",
                table: "BuildingGlues");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_BuildingGlues_GlueID",
                table: "BuildingGlues",
                column: "GlueID");

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingGlues_Glues_GlueID",
                table: "BuildingGlues",
                column: "GlueID",
                principalTable: "Glues",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

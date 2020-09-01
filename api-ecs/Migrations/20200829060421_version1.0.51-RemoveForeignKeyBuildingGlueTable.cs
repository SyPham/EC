using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version1051RemoveForeignKeyBuildingGlueTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuildingGlues_Buildings_BuildingID",
                table: "BuildingGlues");

            migrationBuilder.DropIndex(
                name: "IX_BuildingGlues_BuildingID",
                table: "BuildingGlues");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_BuildingGlues_BuildingID",
                table: "BuildingGlues",
                column: "BuildingID");

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingGlues_Buildings_BuildingID",
                table: "BuildingGlues",
                column: "BuildingID",
                principalTable: "Buildings",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

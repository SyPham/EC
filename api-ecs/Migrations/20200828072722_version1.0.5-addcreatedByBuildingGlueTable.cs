using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version105addcreatedByBuildingGlueTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuildingGlues_Glues_GLueID",
                table: "BuildingGlues");

            migrationBuilder.RenameColumn(
                name: "GLueID",
                table: "BuildingGlues",
                newName: "GlueID");

            migrationBuilder.RenameIndex(
                name: "IX_BuildingGlues_GLueID",
                table: "BuildingGlues",
                newName: "IX_BuildingGlues_GlueID");

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "BuildingGlues",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingGlues_Glues_GlueID",
                table: "BuildingGlues",
                column: "GlueID",
                principalTable: "Glues",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuildingGlues_Glues_GlueID",
                table: "BuildingGlues");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "BuildingGlues");

            migrationBuilder.RenameColumn(
                name: "GlueID",
                table: "BuildingGlues",
                newName: "GLueID");

            migrationBuilder.RenameIndex(
                name: "IX_BuildingGlues_GlueID",
                table: "BuildingGlues",
                newName: "IX_BuildingGlues_GLueID");

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingGlues_Glues_GLueID",
                table: "BuildingGlues",
                column: "GLueID",
                principalTable: "Glues",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

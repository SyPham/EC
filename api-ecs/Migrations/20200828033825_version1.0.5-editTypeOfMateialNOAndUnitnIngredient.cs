using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version105editTypeOfMateialNOAndUnitnIngredient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuildingGlue_Buildings_BuildingID",
                table: "BuildingGlue");

            migrationBuilder.DropForeignKey(
                name: "FK_BuildingGlue_Glues_GLueID",
                table: "BuildingGlue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BuildingGlue",
                table: "BuildingGlue");

            migrationBuilder.RenameTable(
                name: "BuildingGlue",
                newName: "BuildingGlues");

            migrationBuilder.RenameIndex(
                name: "IX_BuildingGlue_GLueID",
                table: "BuildingGlues",
                newName: "IX_BuildingGlues_GLueID");

            migrationBuilder.RenameIndex(
                name: "IX_BuildingGlue_BuildingID",
                table: "BuildingGlues",
                newName: "IX_BuildingGlues_BuildingID");

            migrationBuilder.AlterColumn<string>(
                name: "Unit",
                table: "Ingredients",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "MaterialNO",
                table: "Ingredients",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BuildingGlues",
                table: "BuildingGlues",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingGlues_Buildings_BuildingID",
                table: "BuildingGlues",
                column: "BuildingID",
                principalTable: "Buildings",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingGlues_Glues_GLueID",
                table: "BuildingGlues",
                column: "GLueID",
                principalTable: "Glues",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BuildingGlues_Buildings_BuildingID",
                table: "BuildingGlues");

            migrationBuilder.DropForeignKey(
                name: "FK_BuildingGlues_Glues_GLueID",
                table: "BuildingGlues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BuildingGlues",
                table: "BuildingGlues");

            migrationBuilder.RenameTable(
                name: "BuildingGlues",
                newName: "BuildingGlue");

            migrationBuilder.RenameIndex(
                name: "IX_BuildingGlues_GLueID",
                table: "BuildingGlue",
                newName: "IX_BuildingGlue_GLueID");

            migrationBuilder.RenameIndex(
                name: "IX_BuildingGlues_BuildingID",
                table: "BuildingGlue",
                newName: "IX_BuildingGlue_BuildingID");

            migrationBuilder.AlterColumn<int>(
                name: "Unit",
                table: "Ingredients",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MaterialNO",
                table: "Ingredients",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_BuildingGlue",
                table: "BuildingGlue",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingGlue_Buildings_BuildingID",
                table: "BuildingGlue",
                column: "BuildingID",
                principalTable: "Buildings",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BuildingGlue_Glues_GLueID",
                table: "BuildingGlue",
                column: "GLueID",
                principalTable: "Glues",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

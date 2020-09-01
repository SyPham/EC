using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version105 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BuildingGlue",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Qty = table.Column<string>(nullable: true),
                    BuildingID = table.Column<int>(nullable: false),
                    GLueID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingGlue", x => x.ID);
                    table.ForeignKey(
                        name: "FK_BuildingGlue_Buildings_BuildingID",
                        column: x => x.BuildingID,
                        principalTable: "Buildings",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BuildingGlue_Glues_GLueID",
                        column: x => x.GLueID,
                        principalTable: "Glues",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BuildingGlue_BuildingID",
                table: "BuildingGlue",
                column: "BuildingID");

            migrationBuilder.CreateIndex(
                name: "IX_BuildingGlue_GLueID",
                table: "BuildingGlue",
                column: "GLueID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuildingGlue");
        }
    }
}

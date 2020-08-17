using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version102 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MixingInfos",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GlueID = table.Column<int>(nullable: false),
                    ChemicalA = table.Column<string>(nullable: true),
                    ChemicalB = table.Column<string>(nullable: true),
                    ChemicalC = table.Column<string>(nullable: true),
                    ChemicalD = table.Column<string>(nullable: true),
                    ChemicalE = table.Column<string>(nullable: true),
                    MixBy = table.Column<int>(nullable: false),
                    ExpiredTime = table.Column<DateTime>(nullable: false),
                    CreatedTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MixingInfos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MixingInfos_Glues_GlueID",
                        column: x => x.GlueID,
                        principalTable: "Glues",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MixingInfos_GlueID",
                table: "MixingInfos",
                column: "GlueID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MixingInfos");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version1032henryupdateSettingTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BuildingID",
                table: "Settings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "MachineCode",
                table: "Settings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MachineType",
                table: "Settings",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MaxRPM",
                table: "Settings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MinRPM",
                table: "Settings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Settings_BuildingID",
                table: "Settings",
                column: "BuildingID");

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_Buildings_BuildingID",
                table: "Settings",
                column: "BuildingID",
                principalTable: "Buildings",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Settings_Buildings_BuildingID",
                table: "Settings");

            migrationBuilder.DropIndex(
                name: "IX_Settings_BuildingID",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "BuildingID",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "MachineCode",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "MachineType",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "MaxRPM",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "MinRPM",
                table: "Settings");
        }
    }
}

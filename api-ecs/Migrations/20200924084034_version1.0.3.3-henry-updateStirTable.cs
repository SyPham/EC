using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version1033henryupdateStirTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "SettingID",
                table: "Stirs",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Stirs_SettingID",
                table: "Stirs",
                column: "SettingID");

            migrationBuilder.AddForeignKey(
                name: "FK_Stirs_Settings_SettingID",
                table: "Stirs",
                column: "SettingID",
                principalTable: "Settings",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stirs_Settings_SettingID",
                table: "Stirs");

            migrationBuilder.DropIndex(
                name: "IX_Stirs_SettingID",
                table: "Stirs");

            migrationBuilder.AlterColumn<int>(
                name: "SettingID",
                table: "Stirs",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}

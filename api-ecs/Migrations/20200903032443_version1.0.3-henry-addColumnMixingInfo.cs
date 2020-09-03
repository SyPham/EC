using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version103henryaddColumnMixingInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BatchA",
                table: "MixingInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BatchB",
                table: "MixingInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BatchC",
                table: "MixingInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BatchD",
                table: "MixingInfos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BatchE",
                table: "MixingInfos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BatchA",
                table: "MixingInfos");

            migrationBuilder.DropColumn(
                name: "BatchB",
                table: "MixingInfos");

            migrationBuilder.DropColumn(
                name: "BatchC",
                table: "MixingInfos");

            migrationBuilder.DropColumn(
                name: "BatchD",
                table: "MixingInfos");

            migrationBuilder.DropColumn(
                name: "BatchE",
                table: "MixingInfos");
        }
    }
}

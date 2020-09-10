using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version103henryPlanDetailTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanDetail_Plans_PlanID",
                table: "PlanDetail");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlanDetail",
                table: "PlanDetail");

            migrationBuilder.RenameTable(
                name: "PlanDetail",
                newName: "PlanDetails");

            migrationBuilder.RenameIndex(
                name: "IX_PlanDetail_PlanID",
                table: "PlanDetails",
                newName: "IX_PlanDetails_PlanID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlanDetails",
                table: "PlanDetails",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanDetails_Plans_PlanID",
                table: "PlanDetails",
                column: "PlanID",
                principalTable: "Plans",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlanDetails_Plans_PlanID",
                table: "PlanDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlanDetails",
                table: "PlanDetails");

            migrationBuilder.RenameTable(
                name: "PlanDetails",
                newName: "PlanDetail");

            migrationBuilder.RenameIndex(
                name: "IX_PlanDetails_PlanID",
                table: "PlanDetail",
                newName: "IX_PlanDetail_PlanID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlanDetail",
                table: "PlanDetail",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanDetail_Plans_PlanID",
                table: "PlanDetail",
                column: "PlanID",
                principalTable: "Plans",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

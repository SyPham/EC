using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version101 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {


            migrationBuilder.CreateIndex(
                name: "IX_BPFCEstablishes_ArtProcessID",
                table: "BPFCEstablishes",
                column: "ArtProcessID");

            migrationBuilder.CreateIndex(
                name: "IX_BPFCEstablishes_ArticleNoID",
                table: "BPFCEstablishes",
                column: "ArticleNoID");

            migrationBuilder.CreateIndex(
                name: "IX_BPFCEstablishes_ModelNameID",
                table: "BPFCEstablishes",
                column: "ModelNameID");

            migrationBuilder.CreateIndex(
                name: "IX_BPFCEstablishes_ModelNoID",
                table: "BPFCEstablishes",
                column: "ModelNoID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BPFCEstablishes_ArtProcessID",
                table: "BPFCEstablishes");

            migrationBuilder.DropIndex(
                name: "IX_BPFCEstablishes_ArticleNoID",
                table: "BPFCEstablishes");

            migrationBuilder.DropIndex(
                name: "IX_BPFCEstablishes_ModelNameID",
                table: "BPFCEstablishes");

            migrationBuilder.DropIndex(
                name: "IX_BPFCEstablishes_ModelNoID",
                table: "BPFCEstablishes");

            migrationBuilder.CreateIndex(
                name: "IX_BPFCEstablishes_ArtProcessID",
                table: "BPFCEstablishes",
                column: "ArtProcessID",
                unique: false);

            migrationBuilder.CreateIndex(
                name: "IX_BPFCEstablishes_ArticleNoID",
                table: "BPFCEstablishes",
                column: "ArticleNoID",
                unique: false);

            migrationBuilder.CreateIndex(
                name: "IX_BPFCEstablishes_ModelNameID",
                table: "BPFCEstablishes",
                column: "ModelNameID",
                unique: false);

            migrationBuilder.CreateIndex(
                name: "IX_BPFCEstablishes_ModelNoID",
                table: "BPFCEstablishes",
                column: "ModelNoID",
                unique: false);
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EC_API.Migrations
{
    public partial class version100 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Buildings",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Level = table.Column<int>(nullable: false),
                    ParentID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buildings", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "BuildingUser",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(nullable: false),
                    BuildingID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuildingUser", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<int>(nullable: false),
                    BPFCEstablishID = table.Column<int>(nullable: false),
                    Content = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Kinds",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kinds", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Line",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Line", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "MapModel",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelNameID = table.Column<int>(nullable: false),
                    ModelNoID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapModel", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "MaterialName",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialName", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Materials",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materials", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ModelNames",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModelNames", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PartName",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartName", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PartName2",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartName2", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Parts",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parts", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Processes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Processes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Supplier",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplier", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "UserDetails",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(nullable: false),
                    LineID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDetails", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ModelNos",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    ModelNameID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModelNos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ModelNos_ModelNames_ModelNameID",
                        column: x => x.ModelNameID,
                        principalTable: "ModelNames",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<string>(nullable: true),
                    ManufacturingDate = table.Column<DateTime>(nullable: false),
                    SupplierID = table.Column<int>(nullable: false),
                    VOC = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    ExpiredTime = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Ingredients_Supplier_SupplierID",
                        column: x => x.SupplierID,
                        principalTable: "Supplier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ArticleNos",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    ModelNoID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleNos", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ArticleNos_ModelNos_ModelNoID",
                        column: x => x.ModelNoID,
                        principalTable: "ModelNos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ArtProcesses",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ArticleNoID = table.Column<int>(nullable: false),
                    ProcessID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtProcesses", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ArtProcesses_ArticleNos_ArticleNoID",
                        column: x => x.ArticleNoID,
                        principalTable: "ArticleNos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArtProcesses_Processes_ProcessID",
                        column: x => x.ProcessID,
                        principalTable: "Processes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "BPFCEstablishes",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelNameID = table.Column<int>(nullable: false),
                    ModelNoID = table.Column<int>(nullable: false),
                    ArticleNoID = table.Column<int>(nullable: false),
                    ArtProcessID = table.Column<int>(nullable: false),
                    ApprovalStatus = table.Column<bool>(nullable: false),
                    FinishedStatus = table.Column<bool>(nullable: false),
                    ApprovalBy = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<int>(nullable: false),
                    Season = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedDate = table.Column<DateTime>(nullable: true),
                    UpdateTime = table.Column<DateTime>(nullable: true),
                    BuildingDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BPFCEstablishes", x => x.ID);
                    table.ForeignKey(
                        name: "FK_BPFCEstablishes_ArtProcesses_ArtProcessID",
                        column: x => x.ArtProcessID,
                        principalTable: "ArtProcesses",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_BPFCEstablishes_ArticleNos_ArticleNoID",
                        column: x => x.ArticleNoID,
                        principalTable: "ArticleNos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_BPFCEstablishes_ModelNames_ModelNameID",
                        column: x => x.ModelNameID,
                        principalTable: "ModelNames",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_BPFCEstablishes_ModelNos_ModelNoID",
                        column: x => x.ModelNoID,
                        principalTable: "ModelNos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Glues",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Consumption = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<string>(nullable: true),
                    MaterialID = table.Column<int>(nullable: true),
                    ExpiredTime = table.Column<int>(nullable: false),
                    KindID = table.Column<int>(nullable: true),
                    PartID = table.Column<int>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    BPFCEstablishID = table.Column<int>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    MaterialNameID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Glues", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Glues_BPFCEstablishes_BPFCEstablishID",
                        column: x => x.BPFCEstablishID,
                        principalTable: "BPFCEstablishes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Glues_Kinds_KindID",
                        column: x => x.KindID,
                        principalTable: "Kinds",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Glues_Materials_MaterialID",
                        column: x => x.MaterialID,
                        principalTable: "Materials",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Glues_MaterialName_MaterialNameID",
                        column: x => x.MaterialNameID,
                        principalTable: "MaterialName",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Glues_Parts_PartID",
                        column: x => x.PartID,
                        principalTable: "Parts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BuildingID = table.Column<int>(nullable: false),
                    BPFCEstablishID = table.Column<int>(nullable: false),
                    HourlyOutput = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    DueDate = table.Column<DateTime>(nullable: false),
                    WorkingHour = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Plans_BPFCEstablishes_BPFCEstablishID",
                        column: x => x.BPFCEstablishID,
                        principalTable: "BPFCEstablishes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Plans_Buildings_BuildingID",
                        column: x => x.BuildingID,
                        principalTable: "Buildings",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GlueIngredient",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GlueID = table.Column<int>(nullable: false),
                    IngredientID = table.Column<int>(nullable: false),
                    Allow = table.Column<int>(nullable: false),
                    Percentage = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<string>(nullable: true),
                    Position = table.Column<string>(nullable: true),
                    Real = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GlueIngredient", x => x.ID);
                    table.ForeignKey(
                        name: "FK_GlueIngredient_Glues_GlueID",
                        column: x => x.GlueID,
                        principalTable: "Glues",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GlueIngredient_Ingredients_IngredientID",
                        column: x => x.IngredientID,
                        principalTable: "Ingredients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArticleNos_ModelNoID",
                table: "ArticleNos",
                column: "ModelNoID");

            migrationBuilder.CreateIndex(
                name: "IX_ArtProcesses_ArticleNoID",
                table: "ArtProcesses",
                column: "ArticleNoID");

            migrationBuilder.CreateIndex(
                name: "IX_ArtProcesses_ProcessID",
                table: "ArtProcesses",
                column: "ProcessID");

            migrationBuilder.CreateIndex(
                name: "IX_GlueIngredient_GlueID",
                table: "GlueIngredient",
                column: "GlueID");

            migrationBuilder.CreateIndex(
                name: "IX_GlueIngredient_IngredientID",
                table: "GlueIngredient",
                column: "IngredientID");

            migrationBuilder.CreateIndex(
                name: "IX_Glues_BPFCEstablishID",
                table: "Glues",
                column: "BPFCEstablishID");

            migrationBuilder.CreateIndex(
                name: "IX_Glues_KindID",
                table: "Glues",
                column: "KindID");

            migrationBuilder.CreateIndex(
                name: "IX_Glues_MaterialID",
                table: "Glues",
                column: "MaterialID");

            migrationBuilder.CreateIndex(
                name: "IX_Glues_MaterialNameID",
                table: "Glues",
                column: "MaterialNameID");

            migrationBuilder.CreateIndex(
                name: "IX_Glues_PartID",
                table: "Glues",
                column: "PartID");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_SupplierID",
                table: "Ingredients",
                column: "SupplierID");

            migrationBuilder.CreateIndex(
                name: "IX_ModelNos_ModelNameID",
                table: "ModelNos",
                column: "ModelNameID");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_BPFCEstablishID",
                table: "Plans",
                column: "BPFCEstablishID");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_BuildingID",
                table: "Plans",
                column: "BuildingID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuildingUser");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "GlueIngredient");

            migrationBuilder.DropTable(
                name: "Line");

            migrationBuilder.DropTable(
                name: "MapModel");

            migrationBuilder.DropTable(
                name: "PartName");

            migrationBuilder.DropTable(
                name: "PartName2");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropTable(
                name: "UserDetails");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Glues");

            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropTable(
                name: "Buildings");

            migrationBuilder.DropTable(
                name: "BPFCEstablishes");

            migrationBuilder.DropTable(
                name: "Kinds");

            migrationBuilder.DropTable(
                name: "Materials");

            migrationBuilder.DropTable(
                name: "MaterialName");

            migrationBuilder.DropTable(
                name: "Parts");

            migrationBuilder.DropTable(
                name: "Supplier");

            migrationBuilder.DropTable(
                name: "ArtProcesses");

            migrationBuilder.DropTable(
                name: "ArticleNos");

            migrationBuilder.DropTable(
                name: "Processes");

            migrationBuilder.DropTable(
                name: "ModelNos");

            migrationBuilder.DropTable(
                name: "ModelNames");
        }
    }
}

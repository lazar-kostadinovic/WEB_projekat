using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Autobuska_Stanica.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AutobuskaStanica",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Lokacija = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutobuskaStanica", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Odrediste",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Grad = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Zemlja = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    nazivStanice = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Odrediste", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Autobus",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Registacija = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Marka = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Model = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    BrojSedista = table.Column<int>(type: "int", nullable: false),
                    StanicaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Autobus", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Autobus_AutobuskaStanica_StanicaID",
                        column: x => x.StanicaID,
                        principalTable: "AutobuskaStanica",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Voznje",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdAutobus = table.Column<int>(type: "int", nullable: false),
                    IdOdredista = table.Column<int>(type: "int", nullable: false),
                    Vreme = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ocekivanaDuzinaPuta = table.Column<int>(type: "int", nullable: false),
                    DolazniOdlazni = table.Column<int>(type: "int", nullable: false),
                    BrojPresedanja = table.Column<int>(type: "int", nullable: false),
                    AutobusID = table.Column<int>(type: "int", nullable: true),
                    OdredisteID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voznje", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Voznje_Autobus_AutobusID",
                        column: x => x.AutobusID,
                        principalTable: "Autobus",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Voznje_Odrediste_OdredisteID",
                        column: x => x.OdredisteID,
                        principalTable: "Odrediste",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Autobus_StanicaID",
                table: "Autobus",
                column: "StanicaID");

            migrationBuilder.CreateIndex(
                name: "IX_Voznje_AutobusID",
                table: "Voznje",
                column: "AutobusID");

            migrationBuilder.CreateIndex(
                name: "IX_Voznje_OdredisteID",
                table: "Voznje",
                column: "OdredisteID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Voznje");

            migrationBuilder.DropTable(
                name: "Autobus");

            migrationBuilder.DropTable(
                name: "Odrediste");

            migrationBuilder.DropTable(
                name: "AutobuskaStanica");
        }
    }
}

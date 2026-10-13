using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IOM.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderPayments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Method = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                    CardBrand = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                    CardLast4 = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: true),
                    CardholderName = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    TransactionId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    PaidDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RefundedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payments_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_OrderId",
                table: "Payments",
                column: "OrderId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payments");
        }
    }
}

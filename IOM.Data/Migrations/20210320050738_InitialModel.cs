using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IOM.Data.Migrations
{
    public partial class InitialModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,4)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Item",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Item", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Item_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SupplierProducts",
                columns: table => new
                {
                    SupplierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupplierProducts", x => new { x.SupplierId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_SupplierProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SupplierProducts_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Total = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invoices_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InvoiceProducts",
                columns: table => new
                {
                    InvoiceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceProducts", x => new { x.InvoiceId, x.ItemId });
                    table.ForeignKey(
                        name: "FK_InvoiceProducts_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InvoiceProducts_Item_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InvoiceSuppliers",
                columns: table => new
                {
                    SupplierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    InvoiceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceSuppliers", x => new { x.SupplierId, x.InvoiceId });
                    table.ForeignKey(
                        name: "FK_InvoiceSuppliers_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InvoiceSuppliers_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Name", "Price" },
                values: new object[,]
                {
                    { new Guid("aaa8df7f-83c3-4917-937b-efe170f3e9a3"), "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals", "Licensed Cotton Keyboard", 109.90m },
                    { new Guid("2e4561e8-428c-406d-b347-afe7edaf1c43"), "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016", "Incredible Soft Table", 12.20m },
                    { new Guid("ccc92b47-718b-4b23-a0e0-4d3f456a4e64"), "The Football Is Good For Training And Recreational Purposes", "Licensed Steel Chair", 382.71m },
                    { new Guid("49b5185b-0213-4175-a638-bf4978956c82"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Gorgeous Metal Bike", 89.91m },
                    { new Guid("4e71823f-fe44-4308-9e2a-8a1dd426b3d0"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Ergonomic Plastic Gloves", 896.06m },
                    { new Guid("1895644f-7117-4fe0-801f-4e9c5682f5a9"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Licensed Metal Sausages", 692.14m },
                    { new Guid("cbb92643-3463-4517-9cd7-e8cdc3191a07"), "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "Unbranded Frozen Computer", 341.71m },
                    { new Guid("ad4b37a3-6068-4752-b0d3-facce5f34e59"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Refined Metal Fish", 93.97m },
                    { new Guid("afb40ba1-8194-45a0-b9e9-c96df0cf021a"), "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "Small Concrete Ball", 961.61m },
                    { new Guid("7c945bf4-584e-4a53-8572-6890432251f1"), "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "Awesome Steel Shoes", 486.17m }
                });

            migrationBuilder.InsertData(
                table: "Suppliers",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("61d97d8e-7893-41a1-9339-90362b64cf1b"), "Kuphal - Grimes" },
                    { new Guid("3bb7e13c-4e9f-4bb8-955b-cacf14f00a96"), "Langworth - Lockman" },
                    { new Guid("360c8591-a98c-4483-8385-935eefca7bc7"), "Bode - Ziemann" },
                    { new Guid("85b45c2a-3e34-43a3-b633-d2dd0a8bad8d"), "Emard - McDermott" },
                    { new Guid("832eb7b4-5471-489e-bd0c-e6812777bdf6"), "Steuber Group" },
                    { new Guid("7fdbcc31-1f43-4a72-a36a-ce07811b36ed"), "Bartell, Bode and Turner" },
                    { new Guid("85f0b92f-fffa-4998-a44b-952e18c3463d"), "Kuvalis - Schowalter" },
                    { new Guid("3e5d8e8a-7e48-4639-b6ef-5ea3cdd21bef"), "White and Sons" },
                    { new Guid("10224046-fef3-44e0-85f1-90108ae50612"), "MacGyver Inc" },
                    { new Guid("765eec08-18e9-4d3c-9f47-4c6ea70bdf77"), "Predovic Group" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "Password" },
                values: new object[,]
                {
                    { new Guid("5f45814a-1396-46a6-a597-519cc933db09"), "aajmeri7@gmail.com", "Delores", "password123" },
                    { new Guid("e7da8ccf-9616-49a1-9910-18e0935ba85b"), "aajmeri7@gmail.com", "Bernita", "password123" },
                    { new Guid("3d9ed7e0-14dc-4359-bae0-6f74dfe7c4c4"), "aajmeri7@gmail.com", "Jamir", "password123" },
                    { new Guid("09154fe6-7192-4c07-81ec-2f062221dca8"), "aajmeri7@gmail.com", "Oleta", "password123" },
                    { new Guid("3f65a7e4-3ce0-4dea-b2a9-bb8bb12cee2a"), "aajmeri7@gmail.com", "Madyson", "password123" },
                    { new Guid("7cb7d9ba-9429-408d-a2cc-b50e00acf1bd"), "aajmeri7@gmail.com", "Holly", "password123" },
                    { new Guid("59b78cc3-f5c3-47df-ace0-7a48ed183929"), "aajmeri7@gmail.com", "Fidel", "password123" },
                    { new Guid("da953856-f9fa-4247-aa82-4fdc34c9c16f"), "aajmeri7@gmail.com", "Tyree", "password123" },
                    { new Guid("b40b24f4-0e64-4d8f-9709-c84160776bd8"), "aajmeri7@gmail.com", "Barrett", "password123" },
                    { new Guid("6141e820-569b-4124-b3ac-5aad62de303c"), "aajmeri7@gmail.com", "Lucy", "password123" }
                });

            migrationBuilder.InsertData(
                table: "Invoices",
                columns: new[] { "Id", "CreatedDate", "Number", "Total", "UserId" },
                values: new object[,]
                {
                    { new Guid("4ade0ece-b49d-4951-bda7-0a50cc4fc498"), new DateTime(2021, 3, 18, 23, 2, 25, 227, DateTimeKind.Local).AddTicks(3710), "8608", "5778", new Guid("b40b24f4-0e64-4d8f-9709-c84160776bd8") },
                    { new Guid("d88460ae-8c14-4fa5-99fa-27e6996ff589"), new DateTime(2021, 3, 19, 1, 58, 36, 24, DateTimeKind.Local).AddTicks(874), "3845", "7154", new Guid("59b78cc3-f5c3-47df-ace0-7a48ed183929") },
                    { new Guid("6ce4fe84-4ae0-4a79-be9b-4492fd0e250c"), new DateTime(2021, 3, 19, 19, 54, 16, 394, DateTimeKind.Local).AddTicks(3077), "2880", "3854", new Guid("3f65a7e4-3ce0-4dea-b2a9-bb8bb12cee2a") },
                    { new Guid("d4eaa2f8-0d13-445f-8014-e615ee0de36d"), new DateTime(2021, 3, 19, 7, 51, 44, 433, DateTimeKind.Local).AddTicks(1161), "9150", "8023", new Guid("3f65a7e4-3ce0-4dea-b2a9-bb8bb12cee2a") },
                    { new Guid("75c6c68e-1e1c-4419-8e6a-9c94f54a869a"), new DateTime(2021, 3, 19, 13, 13, 53, 318, DateTimeKind.Local).AddTicks(6906), "4", "4700", new Guid("09154fe6-7192-4c07-81ec-2f062221dca8") },
                    { new Guid("af175a51-ad02-4027-9120-c5d30af913f0"), new DateTime(2021, 3, 19, 21, 59, 5, 218, DateTimeKind.Local).AddTicks(3449), "6141", "3201", new Guid("e7da8ccf-9616-49a1-9910-18e0935ba85b") },
                    { new Guid("a417cd12-32b1-4f35-b2c8-9947fa1fe38a"), new DateTime(2021, 3, 19, 5, 1, 55, 954, DateTimeKind.Local).AddTicks(9698), "7199", "4862", new Guid("e7da8ccf-9616-49a1-9910-18e0935ba85b") },
                    { new Guid("60c64789-c77a-4b37-9663-07f4f6f8ad40"), new DateTime(2021, 3, 19, 4, 25, 14, 503, DateTimeKind.Local).AddTicks(5528), "7099", "1389", new Guid("5f45814a-1396-46a6-a597-519cc933db09") },
                    { new Guid("5f471f2e-fd20-483b-8ac7-7dc95106249b"), new DateTime(2021, 3, 19, 12, 28, 28, 459, DateTimeKind.Local).AddTicks(1939), "2041", "9133", new Guid("5f45814a-1396-46a6-a597-519cc933db09") },
                    { new Guid("9e7c0998-65f9-4885-bf11-59120b732d69"), new DateTime(2021, 3, 19, 17, 45, 34, 480, DateTimeKind.Local).AddTicks(1988), "7574", "5911", new Guid("da953856-f9fa-4247-aa82-4fdc34c9c16f") }
                });

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "ProductId" },
                values: new object[,]
                {
                    { new Guid("ffca3879-39c3-40fa-bf48-7d2e364a3712"), new Guid("7c945bf4-584e-4a53-8572-6890432251f1") },
                    { new Guid("9f0e6215-3808-4095-a381-eda6a7284b21"), new Guid("cbb92643-3463-4517-9cd7-e8cdc3191a07") },
                    { new Guid("f401c5a9-6ea3-4daf-9df4-4564125dd2cd"), new Guid("1895644f-7117-4fe0-801f-4e9c5682f5a9") },
                    { new Guid("f524fdb6-6a04-4aae-8d5c-71624543958c"), new Guid("4e71823f-fe44-4308-9e2a-8a1dd426b3d0") },
                    { new Guid("740ab68b-419c-451b-895e-9800dab41860"), new Guid("49b5185b-0213-4175-a638-bf4978956c82") },
                    { new Guid("480fdbeb-4408-4938-9b73-11e8feb2659c"), new Guid("ccc92b47-718b-4b23-a0e0-4d3f456a4e64") },
                    { new Guid("f821b235-0335-489d-a0ec-5c8546eb006b"), new Guid("ccc92b47-718b-4b23-a0e0-4d3f456a4e64") },
                    { new Guid("c813ab6e-9ad8-442a-a03c-510bdc2eda2f"), new Guid("2e4561e8-428c-406d-b347-afe7edaf1c43") },
                    { new Guid("90639fcd-1991-4906-9544-8e1944b782bf"), new Guid("7c945bf4-584e-4a53-8572-6890432251f1") },
                    { new Guid("195f6b61-8a14-459a-9b24-081d5cb03f12"), new Guid("2e4561e8-428c-406d-b347-afe7edaf1c43") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceProducts_ItemId",
                table: "InvoiceProducts",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_UserId",
                table: "Invoices",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceSuppliers_InvoiceId",
                table: "InvoiceSuppliers",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Item_ProductId",
                table: "Item",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_SupplierProducts_ProductId",
                table: "SupplierProducts",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InvoiceProducts");

            migrationBuilder.DropTable(
                name: "InvoiceSuppliers");

            migrationBuilder.DropTable(
                name: "SupplierProducts");

            migrationBuilder.DropTable(
                name: "Item");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

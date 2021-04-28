using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IOM.Data.Migrations
{
    public partial class AddMoreProductsAndItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Invoices",
                keyColumn: "Id",
                keyValue: new Guid("4ade0ece-b49d-4951-bda7-0a50cc4fc498"));

            migrationBuilder.DeleteData(
                table: "Invoices",
                keyColumn: "Id",
                keyValue: new Guid("5f471f2e-fd20-483b-8ac7-7dc95106249b"));

            migrationBuilder.DeleteData(
                table: "Invoices",
                keyColumn: "Id",
                keyValue: new Guid("60c64789-c77a-4b37-9663-07f4f6f8ad40"));

            migrationBuilder.DeleteData(
                table: "Invoices",
                keyColumn: "Id",
                keyValue: new Guid("6ce4fe84-4ae0-4a79-be9b-4492fd0e250c"));

            migrationBuilder.DeleteData(
                table: "Invoices",
                keyColumn: "Id",
                keyValue: new Guid("75c6c68e-1e1c-4419-8e6a-9c94f54a869a"));

            migrationBuilder.DeleteData(
                table: "Invoices",
                keyColumn: "Id",
                keyValue: new Guid("9e7c0998-65f9-4885-bf11-59120b732d69"));

            migrationBuilder.DeleteData(
                table: "Invoices",
                keyColumn: "Id",
                keyValue: new Guid("a417cd12-32b1-4f35-b2c8-9947fa1fe38a"));

            migrationBuilder.DeleteData(
                table: "Invoices",
                keyColumn: "Id",
                keyValue: new Guid("af175a51-ad02-4027-9120-c5d30af913f0"));

            migrationBuilder.DeleteData(
                table: "Invoices",
                keyColumn: "Id",
                keyValue: new Guid("d4eaa2f8-0d13-445f-8014-e615ee0de36d"));

            migrationBuilder.DeleteData(
                table: "Invoices",
                keyColumn: "Id",
                keyValue: new Guid("d88460ae-8c14-4fa5-99fa-27e6996ff589"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("195f6b61-8a14-459a-9b24-081d5cb03f12"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("480fdbeb-4408-4938-9b73-11e8feb2659c"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("740ab68b-419c-451b-895e-9800dab41860"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("90639fcd-1991-4906-9544-8e1944b782bf"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("9f0e6215-3808-4095-a381-eda6a7284b21"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("c813ab6e-9ad8-442a-a03c-510bdc2eda2f"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("f401c5a9-6ea3-4daf-9df4-4564125dd2cd"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("f524fdb6-6a04-4aae-8d5c-71624543958c"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("f821b235-0335-489d-a0ec-5c8546eb006b"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("ffca3879-39c3-40fa-bf48-7d2e364a3712"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("aaa8df7f-83c3-4917-937b-efe170f3e9a3"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("ad4b37a3-6068-4752-b0d3-facce5f34e59"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("afb40ba1-8194-45a0-b9e9-c96df0cf021a"));

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: new Guid("10224046-fef3-44e0-85f1-90108ae50612"));

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: new Guid("360c8591-a98c-4483-8385-935eefca7bc7"));

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: new Guid("3bb7e13c-4e9f-4bb8-955b-cacf14f00a96"));

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: new Guid("3e5d8e8a-7e48-4639-b6ef-5ea3cdd21bef"));

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: new Guid("61d97d8e-7893-41a1-9339-90362b64cf1b"));

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: new Guid("765eec08-18e9-4d3c-9f47-4c6ea70bdf77"));

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: new Guid("7fdbcc31-1f43-4a72-a36a-ce07811b36ed"));

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: new Guid("832eb7b4-5471-489e-bd0c-e6812777bdf6"));

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: new Guid("85b45c2a-3e34-43a3-b633-d2dd0a8bad8d"));

            migrationBuilder.DeleteData(
                table: "Suppliers",
                keyColumn: "Id",
                keyValue: new Guid("85f0b92f-fffa-4998-a44b-952e18c3463d"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("3d9ed7e0-14dc-4359-bae0-6f74dfe7c4c4"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("6141e820-569b-4124-b3ac-5aad62de303c"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("7cb7d9ba-9429-408d-a2cc-b50e00acf1bd"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("1895644f-7117-4fe0-801f-4e9c5682f5a9"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("2e4561e8-428c-406d-b347-afe7edaf1c43"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("49b5185b-0213-4175-a638-bf4978956c82"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("4e71823f-fe44-4308-9e2a-8a1dd426b3d0"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("7c945bf4-584e-4a53-8572-6890432251f1"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("cbb92643-3463-4517-9cd7-e8cdc3191a07"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("ccc92b47-718b-4b23-a0e0-4d3f456a4e64"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("09154fe6-7192-4c07-81ec-2f062221dca8"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("3f65a7e4-3ce0-4dea-b2a9-bb8bb12cee2a"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("59b78cc3-f5c3-47df-ace0-7a48ed183929"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5f45814a-1396-46a6-a597-519cc933db09"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("b40b24f4-0e64-4d8f-9709-c84160776bd8"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("da953856-f9fa-4247-aa82-4fdc34c9c16f"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("e7da8ccf-9616-49a1-9910-18e0935ba85b"));

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Name", "Price" },
                values: new object[,]
                {
                    { new Guid("ef566634-0b1a-4aad-a3fc-3bb1572c274b"), "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals", "Licensed Cotton Keyboard", 109.90m },
                    { new Guid("f13c577e-1f72-45a3-aff0-30b929242b76"), "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "Intelligent Rubber Salad", 716.51m },
                    { new Guid("abf7294f-426d-43c3-847f-e365f10a8866"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Small Rubber Keyboard", 4.42m },
                    { new Guid("8fb764c3-63d9-4456-8e90-a5d8db79ab8d"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Incredible Wooden Shoes", 629.03m },
                    { new Guid("65a286a8-ccb1-4b8d-a36f-990fc4511ebf"), "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "Rustic Concrete Salad", 418.78m },
                    { new Guid("36883096-52c7-488a-94f1-0539a489f70d"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Handmade Cotton Chicken", 559.27m },
                    { new Guid("7aa3c047-b801-4374-8180-7dca75b1a718"), "The Football Is Good For Training And Recreational Purposes", "Rustic Plastic Chicken", 344.74m },
                    { new Guid("36dd1df2-41e6-47e5-bc66-e7dfadb77e70"), "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "Tasty Granite Chicken", 949.01m },
                    { new Guid("c7390686-dbe1-4732-8b92-ffe5c86c1746"), "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016", "Awesome Frozen Towels", 514.51m },
                    { new Guid("7988059a-be79-465b-b44c-1a61bdb59cf1"), "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "Small Frozen Tuna", 68.88m },
                    { new Guid("966c6717-c62b-4f4a-8780-a899e60cf011"), "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "Handcrafted Fresh Pizza", 792.60m },
                    { new Guid("84fd00e6-586b-4333-a806-a0b524a3b232"), "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "Incredible Cotton Tuna", 32.34m },
                    { new Guid("910ca9e6-c3f9-4b65-9ae8-34646870695c"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Intelligent Concrete Keyboard", 686.03m },
                    { new Guid("85b757da-1e19-4163-b7c5-0570727d3887"), "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Small Concrete Soap", 556.63m },
                    { new Guid("e7f2b5e3-db46-4d84-af30-9b1ced62a9d8"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Intelligent Frozen Bacon", 680.75m },
                    { new Guid("0b9c7e8d-e6fc-43a9-8b3f-a66b4582fad9"), "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "Sleek Fresh Hat", 85.84m },
                    { new Guid("51a7e236-fc50-4159-be4b-e6c1b426a1ab"), "The Football Is Good For Training And Recreational Purposes", "Unbranded Granite Towels", 865.10m },
                    { new Guid("1f65d25d-6134-4b4d-a0e9-23d63f56b114"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Practical Fresh Shoes", 533.70m },
                    { new Guid("d68d8ffc-a9a4-4371-8330-4a2d7700980b"), "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals", "Tasty Plastic Pants", 965.27m },
                    { new Guid("a00a44fc-59c8-4457-b490-ce736284b9b3"), "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "Practical Granite Car", 692.84m },
                    { new Guid("62f2448a-c310-452d-afc0-f3a95e9e872a"), "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "Awesome Rubber Mouse", 564.96m },
                    { new Guid("207f5b5e-c91c-4a17-8768-bacc83811e90"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Awesome Plastic Chips", 719.71m },
                    { new Guid("87d63569-4b9e-44aa-bc8e-5d8fa2b2a51d"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Licensed Metal Pants", 863.07m },
                    { new Guid("56d9aa26-6971-435d-b1e3-6918ddc15072"), "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "Handcrafted Soft Tuna", 453.12m },
                    { new Guid("f6503aa7-5815-4445-baf5-9b57be57d5b1"), "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals", "Fantastic Wooden Gloves", 58.21m },
                    { new Guid("a0674f51-9cb8-4c60-b009-0ff94d48b7ba"), "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Incredible Steel Computer", 190.97m },
                    { new Guid("b5a53c24-820b-4499-a14a-11da946a04fb"), "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "Licensed Soft Pants", 932.27m },
                    { new Guid("1c681462-8681-4690-a689-5ac18ec656ae"), "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals", "Incredible Steel Pizza", 344.93m },
                    { new Guid("2ce63658-f846-48fb-8021-2cdbdf658bdc"), "The Football Is Good For Training And Recreational Purposes", "Intelligent Frozen Chips", 570.82m },
                    { new Guid("486891b5-7d73-4c4c-a689-9822ff16bd64"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Incredible Frozen Pants", 771.08m },
                    { new Guid("4ba1ec54-d5f8-4b90-98db-fbc14d943a03"), "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "Handmade Wooden Mouse", 253.53m },
                    { new Guid("29e392c9-3375-4a60-9322-a72154b4b83f"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Unbranded Steel Tuna", 782.81m },
                    { new Guid("7538ebcc-92a5-4205-9170-8721e25d2455"), "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "Awesome Wooden Shoes", 855.56m },
                    { new Guid("77056e1d-bc25-4983-9738-09127b567cbb"), "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "Generic Plastic Mouse", 30.44m },
                    { new Guid("e1e42e20-a837-4c91-9bb2-b5ff0702f085"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Handmade Fresh Keyboard", 943.23m },
                    { new Guid("b17e13ee-e85f-4e0d-8865-6ca1abb9c599"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Ergonomic Granite Chips", 224.67m },
                    { new Guid("31d7eb7c-96a2-4e9c-9d16-41df9c6fb866"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Practical Fresh Hat", 43.36m },
                    { new Guid("42599a4b-43ee-4762-af65-8fc107bfa481"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Intelligent Frozen Tuna", 492.92m },
                    { new Guid("d2f537ea-f360-4291-9a2e-8b2e419f6794"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Intelligent Concrete Fish", 946.12m },
                    { new Guid("87977af4-3963-4d87-9115-7d7a032d8452"), "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Handmade Fresh Chicken", 305.78m },
                    { new Guid("bfe642ae-b013-4b57-9afd-4e156fb30af5"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Rustic Granite Computer", 846.32m },
                    { new Guid("dbbf57b6-035f-4492-9538-9336f185282c"), "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Handmade Fresh Ball", 690.22m }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Name", "Price" },
                values: new object[,]
                {
                    { new Guid("118afaa1-71b1-457c-9b6f-20fb21167b4d"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Rustic Soft Hat", 967.89m },
                    { new Guid("84efa03f-b036-44cc-90c7-1b56162477ef"), "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "Practical Fresh Bike", 59.83m },
                    { new Guid("db25efaf-4958-4671-8f8e-5fa97464a243"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Ergonomic Granite Pants", 777.90m },
                    { new Guid("5b6fc1c4-88b3-40da-8c9e-5dc0d8d5b5cd"), "The Football Is Good For Training And Recreational Purposes", "Awesome Wooden Sausages", 115.73m },
                    { new Guid("26d5b702-214c-4e07-88e4-4f647d77e4bc"), "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "Refined Steel Bacon", 931.62m },
                    { new Guid("7e768ae1-696c-4e18-96a8-3a16af240f48"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Handcrafted Plastic Cheese", 939.59m },
                    { new Guid("c935f927-dbff-4a15-998f-c43fae82686f"), "The Football Is Good For Training And Recreational Purposes", "Handcrafted Concrete Table", 628.16m },
                    { new Guid("afe3eb58-841d-4081-b1c4-e7e963279fc3"), "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "Awesome Cotton Salad", 7.16m },
                    { new Guid("9f888ca1-56e5-4b88-b658-7654250009cf"), "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "Sleek Frozen Chicken", 259.41m },
                    { new Guid("d24f5b95-3d3d-4b6f-a693-4d3135ed7e1b"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Handcrafted Steel Table", 784.56m },
                    { new Guid("95ccc587-3451-4816-b118-440c82846109"), "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Generic Steel Gloves", 893.44m },
                    { new Guid("3956c3d8-aa5f-48d4-8428-65fe82e40c25"), "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "Rustic Frozen Fish", 177.17m },
                    { new Guid("aa5eb30d-dfff-468f-9e75-7dd99135785d"), "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "Licensed Concrete Tuna", 440.49m },
                    { new Guid("757a63d5-4367-4c5c-98a1-bffb60172f15"), "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "Incredible Fresh Mouse", 908.78m },
                    { new Guid("5f26001b-73b1-4483-8cb3-741fb23de570"), "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "Licensed Wooden Soap", 50.35m },
                    { new Guid("72305cfe-bcbf-49bc-b9a2-40b22195f349"), "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Licensed Steel Bacon", 340.57m },
                    { new Guid("d6eeacf3-abad-4c53-ab41-59a43801857b"), "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "Generic Frozen Towels", 49.43m },
                    { new Guid("c5eac18a-0c68-47ae-aee0-83ed87d5d28b"), "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016", "Licensed Frozen Chips", 532.92m },
                    { new Guid("afc6cbed-ccf0-4683-8a92-0c8e0995e5c7"), "The Football Is Good For Training And Recreational Purposes", "Handcrafted Fresh Pants", 86.64m },
                    { new Guid("3f455689-154a-4461-9241-1bab66de5495"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Practical Steel Table", 297.06m },
                    { new Guid("170d6671-45e0-4e64-90ad-aad7fe9ebf1d"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Generic Rubber Car", 595.78m },
                    { new Guid("751c2f3e-8df1-4a82-b7f1-7f5375d3e9c2"), "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "Awesome Steel Shoes", 486.17m },
                    { new Guid("fcbf01ea-4fa2-4ad0-8cc0-1787178a4b8c"), "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "Small Concrete Ball", 961.61m },
                    { new Guid("ff2ebfd5-49eb-40f3-9ab4-216ce34ab7ef"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Refined Metal Fish", 93.97m },
                    { new Guid("a44ac53f-8536-40a6-85b2-b70db3c64c1a"), "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "Unbranded Frozen Computer", 341.71m },
                    { new Guid("2852e319-9a9d-40a6-9cd9-b1f2b33876b9"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Licensed Metal Sausages", 692.14m },
                    { new Guid("3df20c2a-6bab-472a-b469-fb797fd5c8c2"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Ergonomic Plastic Gloves", 896.06m },
                    { new Guid("21dd46a4-ad83-4c36-867a-aa01620ef9ee"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Gorgeous Metal Bike", 89.91m },
                    { new Guid("5db2271e-a20d-4a4e-90d4-dbf4a08a2c0f"), "The Football Is Good For Training And Recreational Purposes", "Licensed Steel Chair", 382.71m },
                    { new Guid("2e4bf7a5-c43c-4280-8ed8-5dcddfb9bfab"), "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016", "Incredible Soft Table", 12.20m },
                    { new Guid("db51a931-d057-42d7-b632-7b8c7e14d190"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Fantastic Concrete Tuna", 501.81m },
                    { new Guid("c6ee0204-703d-424e-b012-eed78b6885b5"), "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "Sleek Plastic Fish", 780.59m },
                    { new Guid("f33eff8e-e358-4617-b442-ed82b3622f8d"), "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "Refined Metal Hat", 757.31m },
                    { new Guid("4396694e-958c-4bbe-a4e2-c8d7ff8e8ce9"), "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016", "Incredible Plastic Keyboard", 883.38m },
                    { new Guid("c1551edb-d4f5-402d-ba14-d607e2daf707"), "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals", "Gorgeous Granite Keyboard", 650.35m },
                    { new Guid("75c94cdd-c710-4917-b3fc-6ed5d9dfc76c"), "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016", "Rustic Frozen Computer", 523.04m },
                    { new Guid("8df0db69-6a0c-4312-a15c-659e66c16e0a"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Refined Soft Pizza", 221.32m },
                    { new Guid("70559fd9-637a-4b7a-9e66-9d15c1a7707a"), "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016", "Unbranded Steel Cheese", 532.30m },
                    { new Guid("af08bec1-b8d7-4718-bfb7-6eade8c3f6dc"), "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals", "Tasty Metal Chips", 206.31m },
                    { new Guid("c3babf65-6cbc-4775-99f5-732365cbac80"), "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Awesome Metal Pants", 801.20m },
                    { new Guid("c8693996-14c1-4260-9a84-eac33f01622c"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Fantastic Wooden Keyboard", 891.30m },
                    { new Guid("f2d7a16e-5dbd-4e73-b965-d01ce1a90b26"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Handcrafted Granite Pizza", 309.81m }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Name", "Price" },
                values: new object[,]
                {
                    { new Guid("880cb16a-0190-45a2-9afa-70f6bd4df394"), "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Incredible Concrete Shirt", 540.73m },
                    { new Guid("55d8bbdb-f798-439a-8cc3-58b9716f72e6"), "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016", "Intelligent Soft Fish", 986.90m },
                    { new Guid("04b4acc0-e4f3-4d16-9807-cd6a91f9445c"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Gorgeous Cotton Bike", 126.41m },
                    { new Guid("2e56538b-5589-401c-8d1a-c034fef15d3c"), "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "Handcrafted Wooden Cheese", 803.99m },
                    { new Guid("89a26fe3-6e0b-4294-b305-1f6d6fa06a59"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Fantastic Plastic Pizza", 226.57m },
                    { new Guid("2734d4ec-6ddc-4d6b-aba2-80b0b0ce7142"), "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive", "Generic Granite Chair", 545.90m },
                    { new Guid("8615a7a3-078b-45c8-9d6a-831e125e4916"), "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "Small Fresh Car", 755.23m },
                    { new Guid("99fd2bb4-e678-4874-b081-2d0b961aa375"), "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals", "Fantastic Frozen Bike", 898.73m },
                    { new Guid("94f11d67-56da-4bd2-ad3a-d6030ad5a577"), "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support", "Unbranded Granite Car", 553.88m },
                    { new Guid("5a2bb5a9-3f55-411f-af4f-9cd45bbf1e4f"), "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "Refined Concrete Bike", 298.61m },
                    { new Guid("a4f0546b-e584-4d0d-b482-75a2df1bfcd7"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Awesome Rubber Salad", 951.85m },
                    { new Guid("d8bdd3f3-0b97-4110-8233-b06bc1abf3d7"), "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "Intelligent Granite Pants", 552.24m },
                    { new Guid("281fa34f-3c3e-4d66-b5eb-a8672d3fb602"), "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Handmade Fresh Cheese", 366.69m },
                    { new Guid("fae36503-1517-41b1-91b0-173e7cea66cc"), "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "Unbranded Plastic Shirt", 711.48m },
                    { new Guid("f2d23011-a3ab-4564-ab05-cd69fdb1a87b"), "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016", "Handmade Cotton Ball", 9.72m },
                    { new Guid("80e192c5-5c04-4cca-8f21-caaf0cafcdef"), "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients", "Small Fresh Car", 485.62m }
                });

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "ProductId" },
                values: new object[,]
                {
                    { new Guid("bf948d5b-6a47-4cc5-834c-4dc0d9a64c22"), new Guid("2e4bf7a5-c43c-4280-8ed8-5dcddfb9bfab") },
                    { new Guid("8b093abe-5209-459d-9024-f4ede2b79961"), new Guid("7e768ae1-696c-4e18-96a8-3a16af240f48") },
                    { new Guid("5de935c5-1d20-4a44-aef7-0a0c70542703"), new Guid("f6503aa7-5815-4445-baf5-9b57be57d5b1") },
                    { new Guid("d1553be8-83eb-40f0-a5ed-08277501ddeb"), new Guid("f13c577e-1f72-45a3-aff0-30b929242b76") },
                    { new Guid("6219a60d-0155-457b-8ac5-eb3dd938141e"), new Guid("8fb764c3-63d9-4456-8e90-a5d8db79ab8d") },
                    { new Guid("2de4ba6d-edb3-4af9-a2d0-ff7dd068665f"), new Guid("65a286a8-ccb1-4b8d-a36f-990fc4511ebf") },
                    { new Guid("ff51fae4-854a-4428-bb5a-01527a7175eb"), new Guid("65a286a8-ccb1-4b8d-a36f-990fc4511ebf") },
                    { new Guid("59c9ca7d-8c05-4541-8801-fa122a43a601"), new Guid("36883096-52c7-488a-94f1-0539a489f70d") },
                    { new Guid("516295d3-7c91-4069-b1a7-b101f20aac6a"), new Guid("36883096-52c7-488a-94f1-0539a489f70d") },
                    { new Guid("51afa89b-e5f4-48bc-9305-99c207265c88"), new Guid("966c6717-c62b-4f4a-8780-a899e60cf011") },
                    { new Guid("a67ebf76-0e51-4aae-9316-6d59eceab693"), new Guid("84fd00e6-586b-4333-a806-a0b524a3b232") },
                    { new Guid("3199bd5c-fa7e-4a7d-9676-c33523357c07"), new Guid("e7f2b5e3-db46-4d84-af30-9b1ced62a9d8") },
                    { new Guid("761bb9b5-eea0-489b-b915-3e7fa66b2e7c"), new Guid("a00a44fc-59c8-4457-b490-ce736284b9b3") },
                    { new Guid("a96eb04c-cecc-4b1b-a51a-1ad31658e58f"), new Guid("62f2448a-c310-452d-afc0-f3a95e9e872a") },
                    { new Guid("8c60acd0-29d0-4e5d-adab-ca2b08ecb189"), new Guid("62f2448a-c310-452d-afc0-f3a95e9e872a") },
                    { new Guid("15f34f75-57c6-4709-8e70-fb44f6431a9d"), new Guid("56d9aa26-6971-435d-b1e3-6918ddc15072") },
                    { new Guid("6a328fd5-fb77-412f-8107-0832a131bdde"), new Guid("c935f927-dbff-4a15-998f-c43fae82686f") },
                    { new Guid("6cf6c19d-e9b8-4b8b-8fba-940bd70aa2a3"), new Guid("c935f927-dbff-4a15-998f-c43fae82686f") },
                    { new Guid("ec2b97b6-eb19-467b-bc66-959ea4bd01a9"), new Guid("afe3eb58-841d-4081-b1c4-e7e963279fc3") },
                    { new Guid("5989fd08-1c5c-43ef-83b3-cd5f269004c7"), new Guid("9f888ca1-56e5-4b88-b658-7654250009cf") },
                    { new Guid("d35c8ca4-454b-4473-98ae-b5f2aa7d0434"), new Guid("9f888ca1-56e5-4b88-b658-7654250009cf") },
                    { new Guid("d65e7908-3dc7-4120-b2b3-ca41faedfc0e"), new Guid("9f888ca1-56e5-4b88-b658-7654250009cf") },
                    { new Guid("3eebae61-ca1c-456e-9016-18f043100269"), new Guid("26d5b702-214c-4e07-88e4-4f647d77e4bc") },
                    { new Guid("c4290f57-0bf5-4b21-8c5b-88e26355c960"), new Guid("9f888ca1-56e5-4b88-b658-7654250009cf") },
                    { new Guid("b4078c6a-3a53-4805-bb90-c1e8b6a699bf"), new Guid("26d5b702-214c-4e07-88e4-4f647d77e4bc") },
                    { new Guid("7016ad12-312e-4507-afa7-9bdc58a682ec"), new Guid("5b6fc1c4-88b3-40da-8c9e-5dc0d8d5b5cd") },
                    { new Guid("70d44373-36ba-42b9-be3a-828d63cf13db"), new Guid("80e192c5-5c04-4cca-8f21-caaf0cafcdef") },
                    { new Guid("747e022a-8fa6-4c69-86db-e0c09dba0ad2"), new Guid("04b4acc0-e4f3-4d16-9807-cd6a91f9445c") },
                    { new Guid("38efac0d-7baa-4a15-b8bf-4b0fc3d69bfa"), new Guid("04b4acc0-e4f3-4d16-9807-cd6a91f9445c") },
                    { new Guid("7dbb41cc-6d7c-42ee-b931-96ea13f9e557"), new Guid("b5a53c24-820b-4499-a14a-11da946a04fb") },
                    { new Guid("c056e375-7799-4dbb-b43f-6119507a8adc"), new Guid("b5a53c24-820b-4499-a14a-11da946a04fb") },
                    { new Guid("38992019-a877-4cde-bf10-eb42ddeff355"), new Guid("b5a53c24-820b-4499-a14a-11da946a04fb") },
                    { new Guid("7c5af048-e8fd-4fc0-bf0e-52a3d3f8c170"), new Guid("b5a53c24-820b-4499-a14a-11da946a04fb") },
                    { new Guid("51899001-462a-4468-82ad-13e23e0219f9"), new Guid("1c681462-8681-4690-a689-5ac18ec656ae") },
                    { new Guid("2b057359-7324-4244-a8df-3b5603fb146b"), new Guid("2ce63658-f846-48fb-8021-2cdbdf658bdc") },
                    { new Guid("034d233b-53d4-4260-92f4-bb773a1e473a"), new Guid("2ce63658-f846-48fb-8021-2cdbdf658bdc") },
                    { new Guid("ffbbdd2a-31a9-46e7-8e51-bd24f34f059d"), new Guid("29e392c9-3375-4a60-9322-a72154b4b83f") },
                    { new Guid("9fcd2510-2aec-4375-9881-1904c47ef34c"), new Guid("29e392c9-3375-4a60-9322-a72154b4b83f") },
                    { new Guid("2ad974e8-86dd-4cf2-bb2a-5aa6978c73f9"), new Guid("7538ebcc-92a5-4205-9170-8721e25d2455") },
                    { new Guid("d320094b-cdb2-4c0e-ab79-f295aaa59d7b"), new Guid("77056e1d-bc25-4983-9738-09127b567cbb") },
                    { new Guid("7809304c-4e1e-485a-89e2-c2785ad09498"), new Guid("e1e42e20-a837-4c91-9bb2-b5ff0702f085") },
                    { new Guid("da2ddefc-8c73-4ae3-90e0-95ca5c6ccfa7"), new Guid("b17e13ee-e85f-4e0d-8865-6ca1abb9c599") }
                });

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "ProductId" },
                values: new object[,]
                {
                    { new Guid("886db569-4293-4f0d-82be-80c94f7bd705"), new Guid("bfe642ae-b013-4b57-9afd-4e156fb30af5") },
                    { new Guid("484a2ed8-ab8f-4def-8acc-c0cff8149bac"), new Guid("bfe642ae-b013-4b57-9afd-4e156fb30af5") },
                    { new Guid("10412d1a-0ced-400d-9b30-c41bdcdbc543"), new Guid("118afaa1-71b1-457c-9b6f-20fb21167b4d") },
                    { new Guid("35500c66-b543-4789-8f49-b6908fe8ead4"), new Guid("84efa03f-b036-44cc-90c7-1b56162477ef") },
                    { new Guid("5c1a3d35-f8fd-4fe6-b330-c54188279280"), new Guid("db25efaf-4958-4671-8f8e-5fa97464a243") },
                    { new Guid("a7df641b-2ffc-4493-89dd-ebbd81626d85"), new Guid("5b6fc1c4-88b3-40da-8c9e-5dc0d8d5b5cd") },
                    { new Guid("4346fd91-ead1-4dcc-911c-a7c515889578"), new Guid("c1551edb-d4f5-402d-ba14-d607e2daf707") },
                    { new Guid("9c014e4f-2d5c-484b-8d31-2f64fb7b736f"), new Guid("75c94cdd-c710-4917-b3fc-6ed5d9dfc76c") },
                    { new Guid("39a755e9-f10f-49b1-a781-dfd9451e661c"), new Guid("70559fd9-637a-4b7a-9e66-9d15c1a7707a") },
                    { new Guid("5fd3d053-15e7-4830-8a9e-0692f89940a3"), new Guid("d6eeacf3-abad-4c53-ab41-59a43801857b") },
                    { new Guid("cce407fd-6093-4de2-9c2e-6a7ba0ee9319"), new Guid("afc6cbed-ccf0-4683-8a92-0c8e0995e5c7") },
                    { new Guid("e86925e0-b032-478f-bf1a-dffbdcb696db"), new Guid("3f455689-154a-4461-9241-1bab66de5495") },
                    { new Guid("7de9f1d1-5c9d-48fe-9c42-20fde891b965"), new Guid("3f455689-154a-4461-9241-1bab66de5495") },
                    { new Guid("da628acd-66f2-425b-806b-ab718e393374"), new Guid("3f455689-154a-4461-9241-1bab66de5495") },
                    { new Guid("ebbfe919-bf0f-4c7a-9368-9d3083288dff"), new Guid("170d6671-45e0-4e64-90ad-aad7fe9ebf1d") },
                    { new Guid("173e9db4-a9e0-48d1-8d17-7ae027a4093a"), new Guid("170d6671-45e0-4e64-90ad-aad7fe9ebf1d") },
                    { new Guid("d743c207-a32d-4241-9bf5-fc7e6a5560b0"), new Guid("170d6671-45e0-4e64-90ad-aad7fe9ebf1d") },
                    { new Guid("e38683d9-dbfa-406e-be00-4028d606ab75"), new Guid("751c2f3e-8df1-4a82-b7f1-7f5375d3e9c2") },
                    { new Guid("bda7a401-d232-4081-ad6d-593b09d98356"), new Guid("751c2f3e-8df1-4a82-b7f1-7f5375d3e9c2") },
                    { new Guid("3907a6a6-eedb-44c0-8b19-cebae4da8e4a"), new Guid("fcbf01ea-4fa2-4ad0-8cc0-1787178a4b8c") },
                    { new Guid("e575c3ab-898d-416d-a2e5-a7555c0f231e"), new Guid("fcbf01ea-4fa2-4ad0-8cc0-1787178a4b8c") },
                    { new Guid("50a8fb40-0bed-4434-9275-5f5f8f74b280"), new Guid("ff2ebfd5-49eb-40f3-9ab4-216ce34ab7ef") },
                    { new Guid("4dcb0baf-a626-4360-bcd1-9a28d61c916e"), new Guid("ff2ebfd5-49eb-40f3-9ab4-216ce34ab7ef") },
                    { new Guid("9ec80281-f74a-4c01-a577-53a6f22e5f18"), new Guid("a44ac53f-8536-40a6-85b2-b70db3c64c1a") },
                    { new Guid("2acfeccd-1054-4216-9b01-ad39d955d04c"), new Guid("a44ac53f-8536-40a6-85b2-b70db3c64c1a") },
                    { new Guid("244bcacf-bd10-4bed-a80c-6aa9e426ed4e"), new Guid("a44ac53f-8536-40a6-85b2-b70db3c64c1a") },
                    { new Guid("4928fd9a-7982-4815-8d51-ec6ab6e1c953"), new Guid("3df20c2a-6bab-472a-b469-fb797fd5c8c2") },
                    { new Guid("20e83bc9-1bb6-4ee0-83aa-409ce2798ad1"), new Guid("21dd46a4-ad83-4c36-867a-aa01620ef9ee") },
                    { new Guid("c708ec26-d9a1-4ee2-af18-392565a635f9"), new Guid("21dd46a4-ad83-4c36-867a-aa01620ef9ee") },
                    { new Guid("49f07a97-f0e5-4d9d-9260-7a87ecb74379"), new Guid("5db2271e-a20d-4a4e-90d4-dbf4a08a2c0f") },
                    { new Guid("3a240826-bca1-4104-b823-765ed61470db"), new Guid("72305cfe-bcbf-49bc-b9a2-40b22195f349") },
                    { new Guid("11cb025f-cc0b-4034-aa6d-2554324f9060"), new Guid("72305cfe-bcbf-49bc-b9a2-40b22195f349") },
                    { new Guid("c5e90c4c-3224-42ec-833f-ff0934cb9799"), new Guid("757a63d5-4367-4c5c-98a1-bffb60172f15") },
                    { new Guid("a8ec5835-53cc-4e16-9dfe-e832c3feb96e"), new Guid("757a63d5-4367-4c5c-98a1-bffb60172f15") },
                    { new Guid("ec50e6ec-22dc-43d9-aa92-099d1f01c00c"), new Guid("af08bec1-b8d7-4718-bfb7-6eade8c3f6dc") },
                    { new Guid("69bccdc0-3196-424f-bb9f-75f465429513"), new Guid("55d8bbdb-f798-439a-8cc3-58b9716f72e6") },
                    { new Guid("b14c119d-b7fb-4e85-b08b-e69910604a82"), new Guid("2e56538b-5589-401c-8d1a-c034fef15d3c") },
                    { new Guid("17778bba-7fd3-4bdc-abf5-d6937d72eb0c"), new Guid("2e56538b-5589-401c-8d1a-c034fef15d3c") },
                    { new Guid("60f3c381-2b6c-465b-89cd-59b127d6c3cb"), new Guid("f2d23011-a3ab-4564-ab05-cd69fdb1a87b") },
                    { new Guid("8e2d698b-140a-4a59-bafb-e52d8a6438c4"), new Guid("89a26fe3-6e0b-4294-b305-1f6d6fa06a59") },
                    { new Guid("e3074660-2ea1-4ff4-bc79-ee39e1840c28"), new Guid("2734d4ec-6ddc-4d6b-aba2-80b0b0ce7142") },
                    { new Guid("9c0cfd62-4f20-4a1b-a6ea-7f3c857d5260"), new Guid("8615a7a3-078b-45c8-9d6a-831e125e4916") }
                });

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "ProductId" },
                values: new object[,]
                {
                    { new Guid("825f0043-6934-48f4-93e8-e0ab1c68ba47"), new Guid("8615a7a3-078b-45c8-9d6a-831e125e4916") },
                    { new Guid("7acaa69a-35ad-40c8-a730-a2d22eed554b"), new Guid("5a2bb5a9-3f55-411f-af4f-9cd45bbf1e4f") },
                    { new Guid("618d6577-bd25-4894-b9c9-a3bb765f482e"), new Guid("80e192c5-5c04-4cca-8f21-caaf0cafcdef") },
                    { new Guid("f83a144e-fd4c-4ae0-bc67-227007caef34"), new Guid("d8bdd3f3-0b97-4110-8233-b06bc1abf3d7") },
                    { new Guid("38ae1e84-f445-4a14-adf9-f7b9a59be993"), new Guid("fae36503-1517-41b1-91b0-173e7cea66cc") },
                    { new Guid("c4846de3-0a6c-4e79-b5f6-148916b748c9"), new Guid("4396694e-958c-4bbe-a4e2-c8d7ff8e8ce9") },
                    { new Guid("4ba3a023-6710-4235-b32b-4d9037003985"), new Guid("4396694e-958c-4bbe-a4e2-c8d7ff8e8ce9") },
                    { new Guid("a688714b-5f89-49e5-8175-ec6fec3a5fc8"), new Guid("c6ee0204-703d-424e-b012-eed78b6885b5") },
                    { new Guid("617c22a5-b50f-4c78-a5fa-4779fbcb1d17"), new Guid("c6ee0204-703d-424e-b012-eed78b6885b5") },
                    { new Guid("a8b665ae-9a8a-4f78-b1cf-4334586f61cf"), new Guid("95ccc587-3451-4816-b118-440c82846109") },
                    { new Guid("97ba90d6-f2ad-474d-9fc9-8941c6901699"), new Guid("3956c3d8-aa5f-48d4-8428-65fe82e40c25") },
                    { new Guid("1b5963a9-7fd5-4491-9325-9df69eb6f90b"), new Guid("3956c3d8-aa5f-48d4-8428-65fe82e40c25") },
                    { new Guid("4accf78a-57e3-40fa-8934-ab5f52b08fe0"), new Guid("3956c3d8-aa5f-48d4-8428-65fe82e40c25") },
                    { new Guid("c3ac26fb-0400-4342-bb47-3ed130d7a1ae"), new Guid("aa5eb30d-dfff-468f-9e75-7dd99135785d") },
                    { new Guid("af81854a-372e-4b4e-8aee-81bf1bf2ca45"), new Guid("fae36503-1517-41b1-91b0-173e7cea66cc") },
                    { new Guid("f1a17dec-aeff-49c5-a119-456960ad13bb"), new Guid("80e192c5-5c04-4cca-8f21-caaf0cafcdef") }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("034d233b-53d4-4260-92f4-bb773a1e473a"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("10412d1a-0ced-400d-9b30-c41bdcdbc543"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("11cb025f-cc0b-4034-aa6d-2554324f9060"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("15f34f75-57c6-4709-8e70-fb44f6431a9d"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("173e9db4-a9e0-48d1-8d17-7ae027a4093a"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("17778bba-7fd3-4bdc-abf5-d6937d72eb0c"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("1b5963a9-7fd5-4491-9325-9df69eb6f90b"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("20e83bc9-1bb6-4ee0-83aa-409ce2798ad1"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("244bcacf-bd10-4bed-a80c-6aa9e426ed4e"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("2acfeccd-1054-4216-9b01-ad39d955d04c"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("2ad974e8-86dd-4cf2-bb2a-5aa6978c73f9"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("2b057359-7324-4244-a8df-3b5603fb146b"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("2de4ba6d-edb3-4af9-a2d0-ff7dd068665f"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("3199bd5c-fa7e-4a7d-9676-c33523357c07"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("35500c66-b543-4789-8f49-b6908fe8ead4"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("38992019-a877-4cde-bf10-eb42ddeff355"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("38ae1e84-f445-4a14-adf9-f7b9a59be993"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("38efac0d-7baa-4a15-b8bf-4b0fc3d69bfa"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("3907a6a6-eedb-44c0-8b19-cebae4da8e4a"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("39a755e9-f10f-49b1-a781-dfd9451e661c"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("3a240826-bca1-4104-b823-765ed61470db"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("3eebae61-ca1c-456e-9016-18f043100269"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("4346fd91-ead1-4dcc-911c-a7c515889578"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("484a2ed8-ab8f-4def-8acc-c0cff8149bac"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("4928fd9a-7982-4815-8d51-ec6ab6e1c953"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("49f07a97-f0e5-4d9d-9260-7a87ecb74379"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("4accf78a-57e3-40fa-8934-ab5f52b08fe0"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("4ba3a023-6710-4235-b32b-4d9037003985"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("4dcb0baf-a626-4360-bcd1-9a28d61c916e"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("50a8fb40-0bed-4434-9275-5f5f8f74b280"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("516295d3-7c91-4069-b1a7-b101f20aac6a"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("51899001-462a-4468-82ad-13e23e0219f9"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("51afa89b-e5f4-48bc-9305-99c207265c88"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("5989fd08-1c5c-43ef-83b3-cd5f269004c7"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("59c9ca7d-8c05-4541-8801-fa122a43a601"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("5c1a3d35-f8fd-4fe6-b330-c54188279280"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("5de935c5-1d20-4a44-aef7-0a0c70542703"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("5fd3d053-15e7-4830-8a9e-0692f89940a3"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("60f3c381-2b6c-465b-89cd-59b127d6c3cb"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("617c22a5-b50f-4c78-a5fa-4779fbcb1d17"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("618d6577-bd25-4894-b9c9-a3bb765f482e"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("6219a60d-0155-457b-8ac5-eb3dd938141e"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("69bccdc0-3196-424f-bb9f-75f465429513"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("6a328fd5-fb77-412f-8107-0832a131bdde"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("6cf6c19d-e9b8-4b8b-8fba-940bd70aa2a3"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("7016ad12-312e-4507-afa7-9bdc58a682ec"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("70d44373-36ba-42b9-be3a-828d63cf13db"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("747e022a-8fa6-4c69-86db-e0c09dba0ad2"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("761bb9b5-eea0-489b-b915-3e7fa66b2e7c"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("7809304c-4e1e-485a-89e2-c2785ad09498"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("7acaa69a-35ad-40c8-a730-a2d22eed554b"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("7c5af048-e8fd-4fc0-bf0e-52a3d3f8c170"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("7dbb41cc-6d7c-42ee-b931-96ea13f9e557"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("7de9f1d1-5c9d-48fe-9c42-20fde891b965"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("825f0043-6934-48f4-93e8-e0ab1c68ba47"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("886db569-4293-4f0d-82be-80c94f7bd705"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("8b093abe-5209-459d-9024-f4ede2b79961"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("8c60acd0-29d0-4e5d-adab-ca2b08ecb189"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("8e2d698b-140a-4a59-bafb-e52d8a6438c4"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("97ba90d6-f2ad-474d-9fc9-8941c6901699"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("9c014e4f-2d5c-484b-8d31-2f64fb7b736f"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("9c0cfd62-4f20-4a1b-a6ea-7f3c857d5260"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("9ec80281-f74a-4c01-a577-53a6f22e5f18"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("9fcd2510-2aec-4375-9881-1904c47ef34c"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("a67ebf76-0e51-4aae-9316-6d59eceab693"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("a688714b-5f89-49e5-8175-ec6fec3a5fc8"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("a7df641b-2ffc-4493-89dd-ebbd81626d85"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("a8b665ae-9a8a-4f78-b1cf-4334586f61cf"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("a8ec5835-53cc-4e16-9dfe-e832c3feb96e"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("a96eb04c-cecc-4b1b-a51a-1ad31658e58f"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("af81854a-372e-4b4e-8aee-81bf1bf2ca45"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("b14c119d-b7fb-4e85-b08b-e69910604a82"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("b4078c6a-3a53-4805-bb90-c1e8b6a699bf"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("bda7a401-d232-4081-ad6d-593b09d98356"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("bf948d5b-6a47-4cc5-834c-4dc0d9a64c22"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("c056e375-7799-4dbb-b43f-6119507a8adc"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("c3ac26fb-0400-4342-bb47-3ed130d7a1ae"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("c4290f57-0bf5-4b21-8c5b-88e26355c960"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("c4846de3-0a6c-4e79-b5f6-148916b748c9"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("c5e90c4c-3224-42ec-833f-ff0934cb9799"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("c708ec26-d9a1-4ee2-af18-392565a635f9"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("cce407fd-6093-4de2-9c2e-6a7ba0ee9319"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("d1553be8-83eb-40f0-a5ed-08277501ddeb"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("d320094b-cdb2-4c0e-ab79-f295aaa59d7b"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("d35c8ca4-454b-4473-98ae-b5f2aa7d0434"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("d65e7908-3dc7-4120-b2b3-ca41faedfc0e"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("d743c207-a32d-4241-9bf5-fc7e6a5560b0"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("da2ddefc-8c73-4ae3-90e0-95ca5c6ccfa7"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("da628acd-66f2-425b-806b-ab718e393374"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("e3074660-2ea1-4ff4-bc79-ee39e1840c28"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("e38683d9-dbfa-406e-be00-4028d606ab75"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("e575c3ab-898d-416d-a2e5-a7555c0f231e"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("e86925e0-b032-478f-bf1a-dffbdcb696db"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("ebbfe919-bf0f-4c7a-9368-9d3083288dff"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("ec2b97b6-eb19-467b-bc66-959ea4bd01a9"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("ec50e6ec-22dc-43d9-aa92-099d1f01c00c"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("f1a17dec-aeff-49c5-a119-456960ad13bb"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("f83a144e-fd4c-4ae0-bc67-227007caef34"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("ff51fae4-854a-4428-bb5a-01527a7175eb"));

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: new Guid("ffbbdd2a-31a9-46e7-8e51-bd24f34f059d"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("0b9c7e8d-e6fc-43a9-8b3f-a66b4582fad9"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("1f65d25d-6134-4b4d-a0e9-23d63f56b114"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("207f5b5e-c91c-4a17-8768-bacc83811e90"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("281fa34f-3c3e-4d66-b5eb-a8672d3fb602"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("2852e319-9a9d-40a6-9cd9-b1f2b33876b9"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("31d7eb7c-96a2-4e9c-9d16-41df9c6fb866"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("36dd1df2-41e6-47e5-bc66-e7dfadb77e70"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("42599a4b-43ee-4762-af65-8fc107bfa481"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("486891b5-7d73-4c4c-a689-9822ff16bd64"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("4ba1ec54-d5f8-4b90-98db-fbc14d943a03"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("51a7e236-fc50-4159-be4b-e6c1b426a1ab"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("5f26001b-73b1-4483-8cb3-741fb23de570"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("7988059a-be79-465b-b44c-1a61bdb59cf1"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("7aa3c047-b801-4374-8180-7dca75b1a718"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("85b757da-1e19-4163-b7c5-0570727d3887"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("87977af4-3963-4d87-9115-7d7a032d8452"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("87d63569-4b9e-44aa-bc8e-5d8fa2b2a51d"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("880cb16a-0190-45a2-9afa-70f6bd4df394"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("8df0db69-6a0c-4312-a15c-659e66c16e0a"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("910ca9e6-c3f9-4b65-9ae8-34646870695c"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("94f11d67-56da-4bd2-ad3a-d6030ad5a577"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("99fd2bb4-e678-4874-b081-2d0b961aa375"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("a0674f51-9cb8-4c60-b009-0ff94d48b7ba"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("a4f0546b-e584-4d0d-b482-75a2df1bfcd7"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("abf7294f-426d-43c3-847f-e365f10a8866"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("c3babf65-6cbc-4775-99f5-732365cbac80"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("c5eac18a-0c68-47ae-aee0-83ed87d5d28b"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("c7390686-dbe1-4732-8b92-ffe5c86c1746"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("c8693996-14c1-4260-9a84-eac33f01622c"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("d24f5b95-3d3d-4b6f-a693-4d3135ed7e1b"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("d2f537ea-f360-4291-9a2e-8b2e419f6794"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("d68d8ffc-a9a4-4371-8330-4a2d7700980b"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("db51a931-d057-42d7-b632-7b8c7e14d190"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("dbbf57b6-035f-4492-9538-9336f185282c"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("ef566634-0b1a-4aad-a3fc-3bb1572c274b"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("f2d7a16e-5dbd-4e73-b965-d01ce1a90b26"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("f33eff8e-e358-4617-b442-ed82b3622f8d"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("04b4acc0-e4f3-4d16-9807-cd6a91f9445c"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("118afaa1-71b1-457c-9b6f-20fb21167b4d"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("170d6671-45e0-4e64-90ad-aad7fe9ebf1d"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("1c681462-8681-4690-a689-5ac18ec656ae"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("21dd46a4-ad83-4c36-867a-aa01620ef9ee"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("26d5b702-214c-4e07-88e4-4f647d77e4bc"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("2734d4ec-6ddc-4d6b-aba2-80b0b0ce7142"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("29e392c9-3375-4a60-9322-a72154b4b83f"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("2ce63658-f846-48fb-8021-2cdbdf658bdc"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("2e4bf7a5-c43c-4280-8ed8-5dcddfb9bfab"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("2e56538b-5589-401c-8d1a-c034fef15d3c"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("36883096-52c7-488a-94f1-0539a489f70d"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("3956c3d8-aa5f-48d4-8428-65fe82e40c25"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("3df20c2a-6bab-472a-b469-fb797fd5c8c2"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("3f455689-154a-4461-9241-1bab66de5495"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("4396694e-958c-4bbe-a4e2-c8d7ff8e8ce9"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("55d8bbdb-f798-439a-8cc3-58b9716f72e6"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("56d9aa26-6971-435d-b1e3-6918ddc15072"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("5a2bb5a9-3f55-411f-af4f-9cd45bbf1e4f"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("5b6fc1c4-88b3-40da-8c9e-5dc0d8d5b5cd"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("5db2271e-a20d-4a4e-90d4-dbf4a08a2c0f"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("62f2448a-c310-452d-afc0-f3a95e9e872a"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("65a286a8-ccb1-4b8d-a36f-990fc4511ebf"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("70559fd9-637a-4b7a-9e66-9d15c1a7707a"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("72305cfe-bcbf-49bc-b9a2-40b22195f349"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("751c2f3e-8df1-4a82-b7f1-7f5375d3e9c2"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("7538ebcc-92a5-4205-9170-8721e25d2455"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("757a63d5-4367-4c5c-98a1-bffb60172f15"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("75c94cdd-c710-4917-b3fc-6ed5d9dfc76c"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("77056e1d-bc25-4983-9738-09127b567cbb"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("7e768ae1-696c-4e18-96a8-3a16af240f48"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("80e192c5-5c04-4cca-8f21-caaf0cafcdef"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("84efa03f-b036-44cc-90c7-1b56162477ef"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("84fd00e6-586b-4333-a806-a0b524a3b232"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("8615a7a3-078b-45c8-9d6a-831e125e4916"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("89a26fe3-6e0b-4294-b305-1f6d6fa06a59"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("8fb764c3-63d9-4456-8e90-a5d8db79ab8d"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("95ccc587-3451-4816-b118-440c82846109"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("966c6717-c62b-4f4a-8780-a899e60cf011"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("9f888ca1-56e5-4b88-b658-7654250009cf"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("a00a44fc-59c8-4457-b490-ce736284b9b3"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("a44ac53f-8536-40a6-85b2-b70db3c64c1a"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("aa5eb30d-dfff-468f-9e75-7dd99135785d"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("af08bec1-b8d7-4718-bfb7-6eade8c3f6dc"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("afc6cbed-ccf0-4683-8a92-0c8e0995e5c7"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("afe3eb58-841d-4081-b1c4-e7e963279fc3"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("b17e13ee-e85f-4e0d-8865-6ca1abb9c599"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("b5a53c24-820b-4499-a14a-11da946a04fb"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("bfe642ae-b013-4b57-9afd-4e156fb30af5"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("c1551edb-d4f5-402d-ba14-d607e2daf707"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("c6ee0204-703d-424e-b012-eed78b6885b5"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("c935f927-dbff-4a15-998f-c43fae82686f"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("d6eeacf3-abad-4c53-ab41-59a43801857b"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("d8bdd3f3-0b97-4110-8233-b06bc1abf3d7"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("db25efaf-4958-4671-8f8e-5fa97464a243"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("e1e42e20-a837-4c91-9bb2-b5ff0702f085"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("e7f2b5e3-db46-4d84-af30-9b1ced62a9d8"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("f13c577e-1f72-45a3-aff0-30b929242b76"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("f2d23011-a3ab-4564-ab05-cd69fdb1a87b"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("f6503aa7-5815-4445-baf5-9b57be57d5b1"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("fae36503-1517-41b1-91b0-173e7cea66cc"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("fcbf01ea-4fa2-4ad0-8cc0-1787178a4b8c"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("ff2ebfd5-49eb-40f3-9ab4-216ce34ab7ef"));

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
        }
    }
}

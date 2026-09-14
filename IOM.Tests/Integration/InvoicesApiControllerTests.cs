using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using IOM.Api.Resources;
using Xunit;

namespace IOM.Tests.Integration
{
    [Collection(IntegrationCollection.Name)]
    public class InvoicesApiControllerTests
    {
        private readonly IomWebApplicationFactory _factory;

        public InvoicesApiControllerTests(IomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        private async Task<(HttpClient client, Guid supplierId)> CreateClientWithSupplierAsync()
        {
            var client = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var supplierResponse = await client.PostAsJsonAsync("api/suppliers", new SaveSupplierResource
            {
                Name = $"Invoice Supplier {Guid.NewGuid()}"
            });
            supplierResponse.EnsureSuccessStatusCode();
            var supplier = await supplierResponse.Content.ReadFromJsonAsync<SupplierResource>();
            return (client, supplier.Id);
        }

        private static MultipartFormDataContent BuildUploadForm(string csv, Guid supplierId, string invoiceNumber)
        {
            var form = new MultipartFormDataContent();
            var fileContent = new ByteArrayContent(Encoding.UTF8.GetBytes(csv));
            fileContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("text/csv");
            form.Add(fileContent, "file", "shipping-order.csv");
            form.Add(new StringContent(supplierId.ToString()), "supplierId");
            form.Add(new StringContent(invoiceNumber), "invoiceNumber");
            return form;
        }

        [Fact]
        public async Task Upload_ValidCsv_CreatesInvoiceAndNewProduct()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync();
            var barcode = $"UPLOAD-{Guid.NewGuid():N}";
            var csv = "Barcode,ProductName,Quantity,ExpirationDate,Price\n" +
                      $"{barcode},Uploaded Widget,4,2027-01-01,3.50";

            var response = await client.PostAsync("api/invoices/upload", BuildUploadForm(csv, supplierId, $"SO-{Guid.NewGuid():N}"));

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var result = await response.Content.ReadFromJsonAsync<UploadResultResource>();
            Assert.NotNull(result.InvoiceId);
            Assert.Equal(1, result.ProductsCreated);
            Assert.Equal(1, result.ItemsCreated);
            Assert.Empty(result.RowErrors);

            var productResponse = await client.GetAsync($"api/products/by-barcode/{barcode}");
            Assert.Equal(HttpStatusCode.OK, productResponse.StatusCode);
        }

        [Fact]
        public async Task Upload_DuplicateBarcodeAcrossTwoRows_CreatesOnlyOneProduct()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync();
            var barcode = $"DUPROW-{Guid.NewGuid():N}";
            var csv = "Barcode,ProductName,Quantity,ExpirationDate,Price\n" +
                      $"{barcode},Duplicate Widget,2,,1.00\n" +
                      $"{barcode},Duplicate Widget,3,,1.00";

            var response = await client.PostAsync("api/invoices/upload", BuildUploadForm(csv, supplierId, $"SO-{Guid.NewGuid():N}"));

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var result = await response.Content.ReadFromJsonAsync<UploadResultResource>();
            Assert.Equal(1, result.ProductsCreated);
            Assert.Equal(1, result.ProductsMatched);
            Assert.Equal(2, result.ItemsCreated);

            // Confirm only one product row actually exists for this barcode by re-uploading a
            // single-row CSV referencing the same barcode: it should now match (not create) it.
            var followUpCsv = "Barcode,ProductName,Quantity,ExpirationDate,Price\n" +
                               $"{barcode},Duplicate Widget,1,,1.00";
            var followUpResponse = await client.PostAsync("api/invoices/upload", BuildUploadForm(followUpCsv, supplierId, $"SO-{Guid.NewGuid():N}"));
            var followUpResult = await followUpResponse.Content.ReadFromJsonAsync<UploadResultResource>();
            Assert.Equal(0, followUpResult.ProductsCreated);
            Assert.Equal(1, followUpResult.ProductsMatched);
        }

        [Fact]
        public async Task Upload_UnknownSupplier_ReturnsBadRequest()
        {
            var client = await AuthHelper.CreateAuthenticatedClientAsync(_factory);
            var csv = "Barcode,ProductName,Quantity,ExpirationDate,Price\n123,Widget,1,,1.00";

            var response = await client.PostAsync("api/invoices/upload", BuildUploadForm(csv, Guid.NewGuid(), "SO-X"));

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            var result = await response.Content.ReadFromJsonAsync<UploadResultResource>();
            Assert.Null(result.InvoiceId);
            Assert.NotEmpty(result.RowErrors);
        }

        [Fact]
        public async Task Upload_WithoutFile_ReturnsBadRequest()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync();
            var form = new MultipartFormDataContent
            {
                { new StringContent(supplierId.ToString()), "supplierId" },
                { new StringContent("SO-EMPTY"), "invoiceNumber" }
            };

            var response = await client.PostAsync("api/invoices/upload", form);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Upload_WithoutAuth_ReturnsUnauthorized()
        {
            var client = _factory.CreateClient();
            var csv = "Barcode,ProductName,Quantity,ExpirationDate,Price\n123,Widget,1,,1.00";

            var response = await client.PostAsync("api/invoices/upload", BuildUploadForm(csv, Guid.NewGuid(), "SO-X"));

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetById_AfterUpload_ReturnsInvoiceWithItems()
        {
            var (client, supplierId) = await CreateClientWithSupplierAsync();
            var barcode = $"GETBYID-{Guid.NewGuid():N}";
            var csv = "Barcode,ProductName,Quantity,ExpirationDate,Price\n" +
                      $"{barcode},Get By Id Widget,7,,2.00";
            var uploadResponse = await client.PostAsync("api/invoices/upload", BuildUploadForm(csv, supplierId, $"SO-{Guid.NewGuid():N}"));
            var uploadResult = await uploadResponse.Content.ReadFromJsonAsync<UploadResultResource>();

            var response = await client.GetAsync($"api/invoices/{uploadResult.InvoiceId}");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var invoice = await response.Content.ReadFromJsonAsync<InvoiceResource>();
            Assert.Equal(supplierId, invoice.SupplierId);
            Assert.Single(invoice.Items);
            Assert.Equal(7, invoice.Items[0].Quantity);
        }
    }
}

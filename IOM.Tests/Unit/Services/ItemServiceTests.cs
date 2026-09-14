using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Repositories;
using IOM.Service.Services;
using Moq;
using Xunit;

namespace IOM.Tests.Unit.Services
{
    public class ItemServiceTests
    {
        private readonly Mock<IUnitOfWork> _unitOfWork = new();
        private readonly Mock<IItemRepository> _items = new();

        private ItemService CreateService()
        {
            _unitOfWork.SetupGet(u => u.Items).Returns(_items.Object);
            return new ItemService(_unitOfWork.Object);
        }

        [Fact]
        public async Task GetItemById_DelegatesToIncludingRepositoryMethod()
        {
            var id = Guid.NewGuid();
            var item = new Item { Id = id };
            _items.Setup(i => i.GetByIdWithProductAsync(id)).ReturnsAsync(item);
            var service = CreateService();

            var result = await service.GetItemById(id);

            Assert.Same(item, result);
        }

        [Fact]
        public async Task CreateItem_SetsAuditFieldsAndActive()
        {
            var newItem = new Item { Quantity = 3 };
            var service = CreateService();

            var result = await service.CreateItem(newItem);

            Assert.True(result.Active);
            Assert.True(result.CreatedDate > DateTime.MinValue);
            _items.Verify(i => i.AddAsync(newItem), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task UpdateItem_UsesIncomingProductId_NotItemToBeUpdatedId()
        {
            var itemId = Guid.NewGuid();
            var productId = Guid.NewGuid();
            var itemToBeUpdated = new Item { Id = itemId, ProductId = Guid.NewGuid(), Quantity = 1 };
            var incoming = new Item { ProductId = productId, Quantity = 9, ExpirationDate = new DateTime(2027, 1, 1) };
            var service = CreateService();

            await service.UpdateItem(itemToBeUpdated, incoming);

            Assert.Equal(productId, itemToBeUpdated.ProductId);
            Assert.NotEqual(itemId, itemToBeUpdated.ProductId);
            Assert.Equal(9, itemToBeUpdated.Quantity);
            Assert.Equal(new DateTime(2027, 1, 1), itemToBeUpdated.ExpirationDate);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }

        [Fact]
        public async Task UpdateItem_WithInvoiceItem_ReplacesCollection()
        {
            var itemToBeUpdated = new Item { InvoiceItem = new List<InvoiceItem>() };
            var newInvoiceItems = new List<InvoiceItem> { new InvoiceItem() };
            var incoming = new Item { InvoiceItem = newInvoiceItems };
            var service = CreateService();

            await service.UpdateItem(itemToBeUpdated, incoming);

            Assert.Same(newInvoiceItems, itemToBeUpdated.InvoiceItem);
        }

        [Fact]
        public async Task DeleteItem_RemovesAndCommits()
        {
            var item = new Item { Id = Guid.NewGuid() };
            var service = CreateService();

            await service.DeleteItem(item);

            _items.Verify(i => i.Remove(item), Times.Once);
            _unitOfWork.Verify(u => u.CommitAsync(), Times.Once);
        }
    }
}

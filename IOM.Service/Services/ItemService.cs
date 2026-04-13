using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core;
using IOM.Core.Models;
using IOM.Core.Services;

namespace IOM.Service.Services
{
    public class ItemService : IItemService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ItemService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public async Task<Item> GetItemById(Guid id)
        {
            return await _unitOfWork.Items.GetByIdAsync(id);
        }
        public async Task<IEnumerable<Item>> GetItemsByProductId(Guid productId)
        {
            return await _unitOfWork.Items.GetByProductIdAsync(productId);
        }
        public async Task<Item> CreateItem(Item newItem)
        {
            newItem.CreatedDate = DateTime.UtcNow;
            // newInvoice.CreatedById = someuser

            await _unitOfWork.Items.AddAsync(newItem);
            await _unitOfWork.CommitAsync();
            return newItem;
        }
        public async Task UpdateItem(Item itemTobeUpdated, Item item)
        {
            itemTobeUpdated.ProductId = item.Id;
            if (itemTobeUpdated.InvoiceItem != null)
            {
                itemTobeUpdated.InvoiceItem = item.InvoiceItem;
            }
            itemTobeUpdated.Active = item.Active;
            itemTobeUpdated.UpdatedDate = DateTime.UtcNow;
            // itemTobeUpdated.UpdatedById = someuser

            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteItem(Item item)
        {
            _unitOfWork.Items.Remove(item);
            await _unitOfWork.CommitAsync();
        }

    }
}
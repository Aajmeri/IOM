using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using IOM.Core.Models;

namespace IOM.Core.Services
{
    public interface IItemService
    {
        Task<Item> GetItemById(Guid id);
        Task<IEnumerable<Item>> GetItemsByProductId(Guid productId);
        Task<Item> CreateItem(Item newItem);
        Task UpdateItem(Item itemToBeupdated, Item item);
        Task DeleteItem(Item item);
    }
}
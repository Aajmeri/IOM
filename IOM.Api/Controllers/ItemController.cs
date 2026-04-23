using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using IOM.Core.Models;
using IOM.Core.Services;

namespace IOM.Api.Controllers
{
    public class ItemController : Controller
    {
        private readonly IItemService _itemService;
        private readonly IProductService _productService;

        public ItemController(IItemService itemService, IProductService productService)
        {
            _itemService = itemService;
            _productService = productService;
        }

        // GET: Item
        public async Task<IActionResult> Index()
        {
            var items = await _itemService.GetItemsByProductId(Guid.Empty);
            return View(items);
        }

        // GET: Item/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var item = await _itemService.GetItemById(id.Value);
            if (item == null)
            {
                return NotFound();
            }

            return View(item);
        }

        // GET: Item/Create
        public async Task<IActionResult> Create()
        {
            ViewData["ProductId"] = new SelectList(await _productService.GetAllWithSupplierProduct(), "Id", "Name");
            return View();
        }

        // POST: Item/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ProductId")] Item item)
        {
            if (ModelState.IsValid)
            {
                item.Id = Guid.NewGuid();
                await _itemService.CreateItem(item);
                return RedirectToAction(nameof(Index));
            }
            ViewData["ProductId"] = new SelectList(await _productService.GetAllWithSupplierProduct(), "Id", "Name", item.ProductId);
            return View(item);
        }

        // GET: Item/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var item = await _itemService.GetItemById(id.Value);
            if (item == null)
            {
                return NotFound();
            }
            ViewData["ProductId"] = new SelectList(await _productService.GetAllWithSupplierProduct(), "Id", "Name", item.ProductId);
            return View(item);
        }

        // POST: Item/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,ProductId")] Item item)
        {
            if (id != item.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var existingItem = await _itemService.GetItemById(id);
                    await _itemService.UpdateItem(existingItem, item);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ItemExists(item.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["ProductId"] = new SelectList(await _productService.GetAllWithSupplierProduct(), "Id", "Name", item.ProductId);
            return View(item);
        }

        // GET: Item/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var item = await _itemService.GetItemById(id.Value);
            if (item == null)
            {
                return NotFound();
            }

            return View(item);
        }

        // POST: Item/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var item = await _itemService.GetItemById(id);
            await _itemService.DeleteItem(item);
            return RedirectToAction(nameof(Index));
        }

        private bool ItemExists(Guid id)
        {
            return _itemService.GetItemById(id) != null;
        }
    }
}
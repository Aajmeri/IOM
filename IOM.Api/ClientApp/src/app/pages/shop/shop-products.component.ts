import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-shop-products',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './shop-products.component.html'
})
export class ShopProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';
  search = '';

  quantities: Record<string, number> = {};
  addedProductId: string | null = null;

  private productService = inject(ProductService);
  basket = inject(BasketService);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: products => {
        this.products = products.filter(p => p.visibility !== false);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products.';
        this.loading = false;
      }
    });
  }

  get filteredProducts(): Product[] {
    const term = this.search.trim().toLowerCase();
    if (!term) return this.products;
    return this.products.filter(p =>
      p.name.toLowerCase().includes(term) || (p.description ?? '').toLowerCase().includes(term)
    );
  }

  quantityFor(product: Product): number {
    return this.quantities[product.id] ?? 1;
  }

  setQuantity(product: Product, value: number): void {
    this.quantities[product.id] = Math.max(1, Math.floor(value) || 1);
  }

  addToBasket(product: Product): void {
    const qty = this.quantityFor(product);
    this.basket.add({ id: product.id, name: product.name, price: product.price }, qty);
    this.addedProductId = product.id;
    setTimeout(() => {
      if (this.addedProductId === product.id) this.addedProductId = null;
    }, 1200);
  }
}

import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

declare const $: any;

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  loading = true;
  error = '';

  productService = inject(ProductService);
  auth = inject(AuthService);

  get canManage(): boolean { return this.auth.canManageProducts(); }
  get isClient(): boolean { return this.auth.currentUser()?.role === 'Client'; }

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.initDataTable();
  }

  load(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: products => {
        this.products = products;
        this.loading = false;
        setTimeout(() => this.initDataTable(), 0);
      },
      error: () => {
        this.error = 'Failed to load products.';
        this.loading = false;
      }
    });
  }

  delete(id: string): void {
    if (!confirm('Delete this product?')) return;
    this.productService.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('Failed to delete product.')
    });
  }

  private initDataTable(): void {
    if (typeof $ === 'undefined') return;
    const table = $('#productsTable');
    if (table.length && !$.fn.DataTable.isDataTable('#productsTable')) {
      table.DataTable({
        pagingType: 'full_numbers',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
        responsive: true,
        language: { search: '_INPUT_', searchPlaceholder: 'Search records' }
      });
    }
  }
}

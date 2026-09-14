import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupplierService, Supplier } from '../../services/supplier.service';

declare const $: any;

@Component({
  selector: 'app-suppliers-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './suppliers-list.component.html'
})
export class SuppliersListComponent implements OnInit, AfterViewInit {
  suppliers: Supplier[] = [];
  loading = true;
  error = '';

  private supplierService = inject(SupplierService);

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.initDataTable();
  }

  load(): void {
    this.loading = true;
    this.supplierService.getAll().subscribe({
      next: suppliers => {
        this.suppliers = suppliers;
        this.loading = false;
        setTimeout(() => this.initDataTable(), 0);
      },
      error: () => {
        this.error = 'Failed to load suppliers.';
        this.loading = false;
      }
    });
  }

  delete(id: string): void {
    if (!confirm('Delete this supplier?')) return;
    this.supplierService.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('Failed to delete supplier.')
    });
  }

  private initDataTable(): void {
    if (typeof $ === 'undefined') return;
    const table = $('#suppliersTable');
    if (table.length && !$.fn.DataTable.isDataTable('#suppliersTable')) {
      table.DataTable({
        pagingType: 'full_numbers',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
        responsive: true,
        language: { search: '_INPUT_', searchPlaceholder: 'Search records' }
      });
    }
  }
}

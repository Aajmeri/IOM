import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { InvoiceService, Invoice, UploadResult } from '../../services/invoice.service';
import { Supplier } from '../../services/supplier.service';
import { SupplierSearchComponent } from '../../components/supplier-search/supplier-search.component';

@Component({
  selector: 'app-shipping-orders',
  standalone: true,
  imports: [FormsModule, SupplierSearchComponent, CurrencyPipe, DatePipe],
  templateUrl: './shipping-orders.component.html'
})
export class ShippingOrdersComponent implements OnInit {
  invoices: Invoice[] = [];
  loading = true;
  error = '';

  selectedFile: File | null = null;
  supplierId = '';
  invoiceNumber = '';
  uploading = false;
  uploadError = '';
  uploadResult: UploadResult | null = null;

  expandedInvoiceId: string | null = null;

  private invoiceService = inject(InvoiceService);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.invoiceService.getAll().subscribe({
      next: invoices => {
        this.invoices = invoices;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load shipping orders.';
        this.loading = false;
      }
    });
  }

  onSupplierSelected(supplier: Supplier | null): void {
    this.supplierId = supplier?.id ?? '';
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files && input.files.length > 0 ? input.files[0] : null;
  }

  upload(): void {
    if (!this.selectedFile || !this.supplierId) {
      this.uploadError = 'Please choose a CSV file and select a supplier.';
      return;
    }
    this.uploadError = '';
    this.uploadResult = null;
    this.uploading = true;
    this.invoiceService.upload(this.selectedFile, this.supplierId, this.invoiceNumber || undefined).subscribe({
      next: result => {
        this.uploadResult = result;
        this.uploading = false;
        this.selectedFile = null;
        this.invoiceNumber = '';
        this.load();
      },
      error: err => {
        this.uploadError = err.error?.message ?? 'Failed to upload shipping order.';
        this.uploading = false;
      }
    });
  }

  toggleExpand(invoice: Invoice): void {
    this.expandedInvoiceId = this.expandedInvoiceId === invoice.id ? null : invoice.id;
  }

  delete(id: string): void {
    if (!confirm('Delete this shipping order?')) return;
    this.invoiceService.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('Failed to delete shipping order.')
    });
  }
}

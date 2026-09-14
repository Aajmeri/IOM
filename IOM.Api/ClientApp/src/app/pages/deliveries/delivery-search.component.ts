import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DeliveryService, Delivery, DeliveryStatus } from '../../services/delivery.service';
import { Supplier } from '../../services/supplier.service';
import { SupplierSearchComponent } from '../../components/supplier-search/supplier-search.component';

@Component({
  selector: 'app-delivery-search',
  standalone: true,
  imports: [FormsModule, SupplierSearchComponent, DatePipe],
  templateUrl: './delivery-search.component.html'
})
export class DeliverySearchComponent implements OnInit {
  filters: { from: string; to: string; supplierId: string; status: DeliveryStatus | ''; keyword: string } = {
    from: '', to: '', supplierId: '', status: '', keyword: ''
  };
  statuses: DeliveryStatus[] = ['Scheduled', 'Completed', 'Cancelled', 'Delayed'];

  results: Delivery[] = [];
  loading = false;
  error = '';
  searched = false;

  private deliveryService = inject(DeliveryService);

  ngOnInit(): void {
    this.search();
  }

  onSupplierSelected(supplier: Supplier | null): void {
    this.filters.supplierId = supplier?.id ?? '';
  }

  search(): void {
    this.loading = true;
    this.error = '';
    this.searched = true;
    this.deliveryService.search({
      from: this.filters.from || undefined,
      to: this.filters.to || undefined,
      supplierId: this.filters.supplierId || undefined,
      status: this.filters.status || undefined,
      keyword: this.filters.keyword || undefined
    }).subscribe({
      next: results => {
        this.results = results.sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to search deliveries.';
        this.loading = false;
      }
    });
  }

  isPast(delivery: Delivery): boolean {
    return new Date(delivery.scheduledDate).getTime() < Date.now();
  }

  statusBadge(status: DeliveryStatus): string {
    switch (status) {
      case 'Scheduled': return 'badge-primary';
      case 'Completed': return 'badge-success';
      case 'Cancelled': return 'badge-secondary';
      case 'Delayed': return 'badge-warning';
      default: return 'badge-light';
    }
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DeliveryService, Delivery, SaveDelivery } from '../../services/delivery.service';
import { Supplier } from '../../services/supplier.service';
import { SupplierSearchComponent } from '../../components/supplier-search/supplier-search.component';

@Component({
  selector: 'app-delivery-schedule',
  standalone: true,
  imports: [FormsModule, SupplierSearchComponent, DatePipe],
  templateUrl: './delivery-schedule.component.html'
})
export class DeliveryScheduleComponent implements OnInit {
  model: SaveDelivery = { supplierId: '', scheduledDate: '', status: 'Scheduled', invoiceId: null, notes: '' };
  saving = false;
  error = '';

  upcoming: Delivery[] = [];
  loading = true;
  loadError = '';

  editingId: string | null = null;
  editModel: { scheduledDate: string; notes: string | null } = { scheduledDate: '', notes: '' };
  savingEdit = false;

  private deliveryService = inject(DeliveryService);

  ngOnInit(): void {
    this.loadUpcoming();
  }

  loadUpcoming(): void {
    this.loading = true;
    const from = new Date().toISOString();
    this.deliveryService.search({ from, status: 'Scheduled' }).subscribe({
      next: deliveries => {
        this.upcoming = deliveries.sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
        this.loading = false;
      },
      error: () => {
        this.loadError = 'Failed to load upcoming deliveries.';
        this.loading = false;
      }
    });
  }

  onSupplierSelected(supplier: Supplier | null): void {
    this.model.supplierId = supplier?.id ?? '';
  }

  submit(): void {
    this.error = '';
    if (!this.model.supplierId) {
      this.error = 'Please select a supplier.';
      return;
    }
    if (!this.model.scheduledDate) {
      this.error = 'Please choose a scheduled date/time.';
      return;
    }
    this.saving = true;
    this.deliveryService.create(this.model).subscribe({
      next: () => {
        this.saving = false;
        this.model = { supplierId: '', scheduledDate: '', status: 'Scheduled', invoiceId: null, notes: '' };
        this.loadUpcoming();
      },
      error: err => {
        this.error = err.error?.message ?? 'Failed to schedule delivery.';
        this.saving = false;
      }
    });
  }

  startEdit(delivery: Delivery): void {
    this.editingId = delivery.id;
    this.editModel = { scheduledDate: delivery.scheduledDate, notes: delivery.notes };
  }

  cancelEdit(): void {
    this.editingId = null;
  }

  saveEdit(delivery: Delivery): void {
    this.savingEdit = true;
    const data: SaveDelivery = {
      supplierId: delivery.supplierId,
      scheduledDate: this.editModel.scheduledDate,
      status: delivery.status,
      invoiceId: delivery.invoiceId,
      notes: this.editModel.notes
    };
    this.deliveryService.update(delivery.id, data).subscribe({
      next: () => {
        this.savingEdit = false;
        this.editingId = null;
        this.loadUpcoming();
      },
      error: () => {
        this.savingEdit = false;
        alert('Failed to update delivery.');
      }
    });
  }

  remove(delivery: Delivery): void {
    if (!confirm('Cancel/remove this scheduled delivery?')) return;
    this.deliveryService.delete(delivery.id).subscribe({
      next: () => this.loadUpcoming(),
      error: () => alert('Failed to remove delivery.')
    });
  }
}

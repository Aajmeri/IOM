import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { OrderService, Order, OrderStatus, SaveOrder, SaveOrderItem } from '../../services/order.service';

interface EditableItem extends SaveOrderItem {
  productName: string;
  unitPrice: number;
}

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe, DatePipe, LowerCasePipe],
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  error = '';

  editItems: EditableItem[] = [];
  scheduledDate = '';
  notes: string | null = '';
  adminNotes = '';

  saving = false;
  deciding = false;
  resultMessage = '';

  private orderId = '';
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.load();
  }

  load(): void {
    this.loading = true;
    this.orderService.getById(this.orderId).subscribe({
      next: order => {
        this.order = order;
        this.editItems = order.items.map(i => ({
          productId: i.productId,
          productName: i.productName,
          unitPrice: i.unitPrice,
          quantity: i.quantity
        }));
        this.scheduledDate = order.scheduledDate;
        this.notes = order.notes;
        this.adminNotes = order.adminNotes ?? '';
        this.loading = false;
      },
      error: () => {
        this.error = 'Order not found.';
        this.loading = false;
      }
    });
  }

  get editTotal(): number {
    return this.editItems.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  }

  get isPending(): boolean {
    return this.order?.status === 'Pending';
  }

  removeItem(productId: string): void {
    this.editItems = this.editItems.filter(i => i.productId !== productId);
  }

  saveChanges(): void {
    if (!this.order) return;
    this.error = '';
    this.saving = true;
    const data: SaveOrder = {
      scheduledDate: this.scheduledDate,
      notes: this.notes,
      items: this.editItems.map(i => ({ productId: i.productId, quantity: i.quantity }))
    };
    this.orderService.update(this.order.id, data).subscribe({
      next: order => {
        this.order = order;
        this.saving = false;
      },
      error: err => {
        this.error = err.error?.message ?? 'Failed to save changes.';
        this.saving = false;
      }
    });
  }

  approve(): void {
    if (!this.order) return;
    this.error = '';
    this.deciding = true;
    this.orderService.approve(this.order.id, this.adminNotes.trim() || undefined).subscribe({
      next: order => this.onDecided(order),
      error: err => {
        this.error = err.error?.message ?? 'Failed to approve order.';
        this.deciding = false;
      }
    });
  }

  reject(): void {
    if (!this.order) return;
    if (!this.adminNotes.trim()) {
      this.error = 'Please provide a reason for rejecting this order.';
      return;
    }
    this.error = '';
    this.deciding = true;
    this.orderService.reject(this.order.id, this.adminNotes.trim()).subscribe({
      next: order => this.onDecided(order),
      error: err => {
        this.error = err.error?.message ?? 'Failed to reject order.';
        this.deciding = false;
      }
    });
  }

  private onDecided(order: Order): void {
    this.order = order;
    this.deciding = false;
    this.resultMessage = `Order ${order.number} is now ${order.status}.`;
    setTimeout(() => this.router.navigate(['/order-approvals']), 1500);
  }

  statusClass(status: OrderStatus): string {
    switch (status) {
      case 'Approved': return 'badge-success';
      case 'Rejected': return 'badge-danger';
      case 'Cancelled': return 'badge-secondary';
      default: return 'badge-warning';
    }
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService, Order, OrderStatus } from '../../services/order.service';

@Component({
  selector: 'app-order-approvals',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './order-approvals.component.html'
})
export class OrderApprovalsComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error = '';
  statusFilter: OrderStatus | '' = 'Pending';
  statuses: OrderStatus[] = ['Pending', 'Approved', 'Rejected', 'Cancelled'];

  private orderService = inject(OrderService);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.orderService.getAll(this.statusFilter).subscribe({
      next: orders => {
        this.orders = orders.sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load orders.';
        this.loading = false;
      }
    });
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

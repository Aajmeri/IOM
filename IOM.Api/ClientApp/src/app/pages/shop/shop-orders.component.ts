import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService, Order } from '../../services/order.service';

@Component({
  selector: 'app-shop-orders',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './shop-orders.component.html'
})
export class ShopOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error = '';
  placedConfirmation = false;
  payLaterConfirmation = false;
  cancellingId: string | null = null;
  expandedOrderId: string | null = null;

  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.placedConfirmation = this.route.snapshot.queryParams['placed'] === '1';
    this.payLaterConfirmation = this.route.snapshot.queryParams['payLater'] === '1';
    this.load();
  }

  load(): void {
    this.loading = true;
    this.orderService.getMine().subscribe({
      next: orders => {
        this.orders = orders.sort((a, b) => b.createdDate.localeCompare(a.createdDate));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load your orders.';
        this.loading = false;
      }
    });
  }

  /** Pay-later orders can be paid while they're still going ahead. */
  canPay(order: Order): boolean {
    return order.paymentStatus === 'Unpaid' && (order.status === 'Pending' || order.status === 'Approved');
  }

  toggleExpand(order: Order): void {
    this.expandedOrderId = this.expandedOrderId === order.id ? null : order.id;
  }

  cancel(order: Order): void {
    const refundNote = order.paymentStatus === 'Paid' ? ' Your payment will be refunded in full.' : '';
    if (!confirm(`Cancel order ${order.number}?${refundNote}`)) return;
    this.cancellingId = order.id;
    this.orderService.cancel(order.id).subscribe({
      next: () => {
        this.cancellingId = null;
        this.load();
      },
      error: () => {
        this.cancellingId = null;
        alert('Failed to cancel order.');
      }
    });
  }

  statusClass(status: Order['status']): string {
    switch (status) {
      case 'Approved': return 'badge-success';
      case 'Rejected': return 'badge-danger';
      case 'Cancelled': return 'badge-secondary';
      default: return 'badge-warning';
    }
  }
}

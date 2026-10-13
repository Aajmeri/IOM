import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService, Receipt } from '../../services/order.service';

@Component({
  selector: 'app-shop-receipt',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './shop-receipt.component.html',
  styleUrl: './shop-receipt.component.scss'
})
export class ShopReceiptComponent implements OnInit {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);

  receipt: Receipt | null = null;
  loading = true;
  error = '';

  /** Arrived straight from a successful checkout. */
  justPlaced = false;
  /** Arrived straight from paying for an existing pay-later order. */
  justPaid = false;
  /** Whether the automatic receipt email (checkout or pay-later payment) went out. */
  emailedOnCheckout = false;

  emailing = false;
  emailMessage = '';
  emailError = '';

  ngOnInit(): void {
    const query = this.route.snapshot.queryParamMap;
    this.justPlaced = query.get('placed') === '1';
    this.justPaid = query.get('paid') === '1';
    this.emailedOnCheckout = query.get('emailed') === '1';

    const id = this.route.snapshot.paramMap.get('id')!;
    this.orderService.getReceipt(id).subscribe({
      next: receipt => {
        this.receipt = receipt;
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message ?? 'Failed to load this receipt.';
        this.loading = false;
      }
    });
  }

  print(): void {
    window.print();
  }

  emailReceipt(): void {
    if (!this.receipt || this.emailing) return;
    this.emailing = true;
    this.emailMessage = '';
    this.emailError = '';
    this.orderService.emailReceipt(this.receipt.orderId).subscribe({
      next: result => {
        this.emailMessage = `A copy of this receipt was sent to ${result.emailedTo}.`;
        this.emailing = false;
      },
      error: err => {
        this.emailError = err.error?.message ?? 'The receipt email could not be sent.';
        this.emailing = false;
      }
    });
  }

  lineTotal(item: { unitPrice: number; quantity: number }): number {
    return item.unitPrice * item.quantity;
  }
}

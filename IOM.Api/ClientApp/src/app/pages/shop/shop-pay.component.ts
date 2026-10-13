import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { Order, OrderService } from '../../services/order.service';
import { CardForm } from './card-form';
import { CardFieldsComponent } from './card-fields.component';

/** Pays for an existing pay-later order. */
@Component({
  selector: 'app-shop-pay',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe, DatePipe, LowerCasePipe, CardFieldsComponent],
  templateUrl: './shop-pay.component.html'
})
export class ShopPayComponent extends CardForm implements OnInit {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  order: Order | null = null;
  loading = true;
  error = '';
  submitting = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.orderService.getById(id).subscribe({
      next: order => {
        this.order = order;
        this.loading = false;
      },
      error: () => {
        this.error = 'Order not found.';
        this.loading = false;
      }
    });
  }

  get alreadyPaid(): boolean {
    return this.order?.paymentStatus === 'Paid' || this.order?.paymentStatus === 'Refunded';
  }

  get payable(): boolean {
    return !!this.order && !this.alreadyPaid && (this.order.status === 'Pending' || this.order.status === 'Approved');
  }

  pay(): void {
    this.attempted = true;
    this.error = '';
    if (!this.order || !this.payable || !this.cardValid || this.submitting) return;

    this.submitting = true;
    this.orderService.pay(this.order.id, this.cardPayload()).subscribe({
      next: receipt => {
        this.submitting = false;
        this.router.navigate(['/shop/orders', receipt.orderId, 'receipt'], {
          queryParams: { paid: '1', emailed: receipt.emailedTo ? '1' : '0' }
        });
      },
      error: err => {
        // Never keep the CVC around after a failed attempt.
        this.cvc = '';
        this.error = this.apiErrorMessage(err, 'Payment failed. Please try again.');
        this.submitting = false;
      }
    });
  }
}

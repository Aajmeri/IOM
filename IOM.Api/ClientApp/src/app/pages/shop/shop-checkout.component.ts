import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BasketService } from '../../services/basket.service';
import { Checkout, OrderService } from '../../services/order.service';
import { CardForm } from './card-form';
import { CardFieldsComponent } from './card-fields.component';

@Component({
  selector: 'app-shop-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe, DatePipe, CardFieldsComponent],
  templateUrl: './shop-checkout.component.html'
})
export class ShopCheckoutComponent extends CardForm implements OnInit {
  basket = inject(BasketService);
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  slotStart: string | null = null;
  slotEnd: string | null = null;

  notes = '';
  /** Place the order now and pay for it later from My Orders. */
  payLater = false;

  submitting = false;
  error = '';

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    this.slotStart = params.get('start');
    this.slotEnd = params.get('end');
  }

  get basketEmpty(): boolean {
    return this.basket.basket().length === 0;
  }

  get formValid(): boolean {
    return this.payLater || this.cardValid;
  }

  pay(): void {
    this.attempted = true;
    this.error = '';
    if (!this.slotStart || this.basketEmpty || !this.formValid || this.submitting) return;

    if (this.payLater) {
      this.placeOrderPayLater();
      return;
    }

    const data: Checkout = {
      scheduledDate: this.slotStart,
      notes: this.notes.trim() || null,
      items: this.basket.basket().map(i => ({ productId: i.productId, quantity: i.quantity })),
      payment: this.cardPayload()
    };

    this.submitting = true;
    this.orderService.checkout(data).subscribe({
      next: receipt => {
        this.basket.clear();
        this.submitting = false;
        this.router.navigate(['/shop/orders', receipt.orderId, 'receipt'], {
          queryParams: { placed: '1', emailed: receipt.emailedTo ? '1' : '0' }
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

  private placeOrderPayLater(): void {
    this.submitting = true;
    this.orderService.placeOrderPayLater({
      scheduledDate: this.slotStart!,
      notes: this.notes.trim() || null,
      items: this.basket.basket().map(i => ({ productId: i.productId, quantity: i.quantity }))
    }).subscribe({
      next: () => {
        this.basket.clear();
        this.submitting = false;
        this.router.navigate(['/shop/orders'], { queryParams: { placed: '1', payLater: '1' } });
      },
      error: err => {
        this.error = this.apiErrorMessage(err, 'Failed to place your order. Please try again.');
        this.submitting = false;
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-shop-basket',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './shop-basket.component.html'
})
export class ShopBasketComponent {
  basket = inject(BasketService);
  private router = inject(Router);

  updateQuantity(productId: string, value: number): void {
    this.basket.updateQuantity(productId, Math.floor(value) || 0);
  }

  remove(productId: string): void {
    this.basket.remove(productId);
  }

  scheduleDelivery(): void {
    this.router.navigate(['/shop/schedule']);
  }
}

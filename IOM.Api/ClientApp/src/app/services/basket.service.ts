import { Injectable, computed, signal } from '@angular/core';
import { AuthService } from './auth.service';

export interface BasketItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

/**
 * Purely client-side basket, persisted to localStorage under a key
 * namespaced by the logged-in user's email so switching accounts on
 * the same browser doesn't leak a basket between users.
 */
@Injectable({ providedIn: 'root' })
export class BasketService {
  private readonly KEY_PREFIX = 'basket:';

  private items = signal<BasketItem[]>([]);

  readonly basket = this.items.asReadonly();
  readonly count = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  readonly total = computed(() => this.items().reduce((sum, i) => sum + i.quantity * i.price, 0));

  constructor(private auth: AuthService) {
    this.reset();
  }

  add(product: { id: string; name: string; price: number }, quantity: number): void {
    if (quantity <= 0) return;
    const current = this.items();
    const existing = current.find(i => i.productId === product.id);
    let next: BasketItem[];
    if (existing) {
      next = current.map(i =>
        i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
      );
    } else {
      next = [...current, { productId: product.id, name: product.name, price: product.price, quantity }];
    }
    this.save(next);
  }

  remove(productId: string): void {
    this.save(this.items().filter(i => i.productId !== productId));
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this.save(this.items().map(i => (i.productId === productId ? { ...i, quantity } : i)));
  }

  clear(): void {
    this.save([]);
  }

  /** Reloads the basket from localStorage for whoever is currently logged in. Call after login. */
  reset(): void {
    const raw = localStorage.getItem(this.storageKey());
    this.items.set(raw ? JSON.parse(raw) : []);
  }

  private save(items: BasketItem[]): void {
    this.items.set(items);
    localStorage.setItem(this.storageKey(), JSON.stringify(items));
  }

  private storageKey(): string {
    const userKey = this.auth.currentUser()?.email ?? 'anonymous';
    return `${this.KEY_PREFIX}${userKey}`;
  }
}

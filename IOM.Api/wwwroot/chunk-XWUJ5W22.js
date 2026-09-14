import {
  AuthService
} from "./chunk-JU3C6OAJ.js";
import {
  Injectable,
  __spreadProps,
  __spreadValues,
  computed,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2HB4LNL5.js";

// src/app/services/basket.service.ts
var BasketService = class _BasketService {
  auth;
  KEY_PREFIX = "basket:";
  items = signal([], ...ngDevMode ? [{ debugName: "items" }] : (
    /* istanbul ignore next */
    []
  ));
  basket = this.items.asReadonly();
  count = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0), ...ngDevMode ? [{ debugName: "count" }] : (
    /* istanbul ignore next */
    []
  ));
  total = computed(() => this.items().reduce((sum, i) => sum + i.quantity * i.price, 0), ...ngDevMode ? [{ debugName: "total" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(auth) {
    this.auth = auth;
    this.reset();
  }
  add(product, quantity) {
    if (quantity <= 0)
      return;
    const current = this.items();
    const existing = current.find((i) => i.productId === product.id);
    let next;
    if (existing) {
      next = current.map((i) => i.productId === product.id ? __spreadProps(__spreadValues({}, i), { quantity: i.quantity + quantity }) : i);
    } else {
      next = [...current, { productId: product.id, name: product.name, price: product.price, quantity }];
    }
    this.save(next);
  }
  remove(productId) {
    this.save(this.items().filter((i) => i.productId !== productId));
  }
  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this.save(this.items().map((i) => i.productId === productId ? __spreadProps(__spreadValues({}, i), { quantity }) : i));
  }
  clear() {
    this.save([]);
  }
  /** Reloads the basket from localStorage for whoever is currently logged in. Call after login. */
  reset() {
    const raw = localStorage.getItem(this.storageKey());
    this.items.set(raw ? JSON.parse(raw) : []);
  }
  save(items) {
    this.items.set(items);
    localStorage.setItem(this.storageKey(), JSON.stringify(items));
  }
  storageKey() {
    const userKey = this.auth.currentUser()?.email ?? "anonymous";
    return `${this.KEY_PREFIX}${userKey}`;
  }
  static \u0275fac = function BasketService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BasketService)(\u0275\u0275inject(AuthService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BasketService, factory: _BasketService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BasketService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: AuthService }], null);
})();

export {
  BasketService
};
//# sourceMappingURL=chunk-XWUJ5W22.js.map

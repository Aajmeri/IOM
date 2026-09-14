import {
  BasketService
} from "./chunk-XWUJ5W22.js";
import "./chunk-JU3C6OAJ.js";
import {
  ProductService
} from "./chunk-3DXSAL63.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-TZCII4RM.js";
import {
  RouterLink
} from "./chunk-RBSBLNYF.js";
import {
  Component,
  CurrencyPipe,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2HB4LNL5.js";

// src/app/pages/shop/shop-products.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ShopProductsComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.basket.count());
  }
}
function ShopProductsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "span", 14);
    \u0275\u0275elementEnd();
  }
}
function ShopProductsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function ShopProductsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "No products found.");
    \u0275\u0275elementEnd();
  }
}
function ShopProductsComponent_Conditional_16_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 24);
    \u0275\u0275text(1, " Added ");
  }
}
function ShopProductsComponent_Conditional_16_For_2_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 25);
    \u0275\u0275text(1, " Add to basket ");
  }
}
function ShopProductsComponent_Conditional_16_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "div", 17)(3, "h5", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 19);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 20)(11, "label", 21);
    \u0275\u0275text(12, "Qty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 22);
    \u0275\u0275listener("ngModelChange", function ShopProductsComponent_Conditional_16_For_2_Template_input_ngModelChange_13_listener($event) {
      const product_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setQuantity(product_r3, $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 23);
    \u0275\u0275listener("click", function ShopProductsComponent_Conditional_16_For_2_Template_button_click_14_listener() {
      const product_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.addToBasket(product_r3));
    });
    \u0275\u0275conditionalCreate(15, ShopProductsComponent_Conditional_16_For_2_Conditional_15_Template, 2, 0)(16, ShopProductsComponent_Conditional_16_For_2_Conditional_16_Template, 2, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const product_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(product_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r3.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 9, product_r3.price));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r0.quantityFor(product_r3));
    \u0275\u0275advance();
    \u0275\u0275classProp("btn-success", ctx_r0.addedProductId === product_r3.id)("btn-outline-primary", ctx_r0.addedProductId !== product_r3.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.addedProductId === product_r3.id ? 15 : 16);
  }
}
function ShopProductsComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275repeaterCreate(1, ShopProductsComponent_Conditional_16_For_2_Template, 17, 11, "div", 15, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.filteredProducts);
  }
}
var ShopProductsComponent = class _ShopProductsComponent {
  products = [];
  loading = true;
  error = "";
  search = "";
  quantities = {};
  addedProductId = null;
  productService = inject(ProductService);
  basket = inject(BasketService);
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products.filter((p) => p.visibility !== false);
        this.loading = false;
      },
      error: () => {
        this.error = "Failed to load products.";
        this.loading = false;
      }
    });
  }
  get filteredProducts() {
    const term = this.search.trim().toLowerCase();
    if (!term)
      return this.products;
    return this.products.filter((p) => p.name.toLowerCase().includes(term) || (p.description ?? "").toLowerCase().includes(term));
  }
  quantityFor(product) {
    return this.quantities[product.id] ?? 1;
  }
  setQuantity(product, value) {
    this.quantities[product.id] = Math.max(1, Math.floor(value) || 1);
  }
  addToBasket(product) {
    const qty = this.quantityFor(product);
    this.basket.add({ id: product.id, name: product.name, price: product.price }, qty);
    this.addedProductId = product.id;
    setTimeout(() => {
      if (this.addedProductId === product.id)
        this.addedProductId = null;
    }, 1200);
  }
  static \u0275fac = function ShopProductsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShopProductsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShopProductsComponent, selectors: [["app-shop-products"]], decls: 17, vars: 3, consts: [[1, "row"], [1, "col-12"], [1, "card"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "card-title"], ["routerLink", "/shop/basket", 1, "btn", "btn-primary", "btn-sm"], [1, "fas", "fa-shopping-basket", "mr-1"], [1, "badge", "badge-light", "ml-1"], [1, "card-body"], [1, "form-group"], ["type", "text", "placeholder", "Search products by name or description\u2026", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "text-center", "py-3"], [1, "alert", "alert-danger"], [1, "alert", "alert-secondary"], [1, "spinner-border", "text-primary"], [1, "col-md-4", "col-lg-3", "mb-4"], [1, "card", "h-100"], [1, "card-body", "d-flex", "flex-column"], [1, "card-text", "text-muted", "small", "flex-grow-1"], [1, "font-weight-bold"], [1, "form-inline", "mb-2"], [1, "mr-2", "mb-0"], ["type", "number", "min", "1", 1, "form-control", "form-control-sm", 2, "width", "70px", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn-sm", 3, "click"], [1, "fas", "fa-check", "mr-1"], [1, "fas", "fa-cart-plus", "mr-1"]], template: function ShopProductsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4);
      \u0275\u0275text(5, "Shop");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "a", 5);
      \u0275\u0275element(7, "i", 6);
      \u0275\u0275text(8, " Basket ");
      \u0275\u0275conditionalCreate(9, ShopProductsComponent_Conditional_9_Template, 2, 1, "span", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 8)(11, "div", 9)(12, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function ShopProductsComponent_Template_input_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.search, $event) || (ctx.search = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(13, ShopProductsComponent_Conditional_13_Template, 2, 0, "div", 11)(14, ShopProductsComponent_Conditional_14_Template, 2, 1, "div", 12)(15, ShopProductsComponent_Conditional_15_Template, 2, 0, "div", 13)(16, ShopProductsComponent_Conditional_16_Template, 3, 0, "div", 0);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.basket.count() > 0 ? 9 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.search);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 13 : ctx.error ? 14 : ctx.filteredProducts.length === 0 ? 15 : 16);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, RouterLink, CurrencyPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShopProductsComponent, [{
    type: Component,
    args: [{ selector: "app-shop-products", standalone: true, imports: [FormsModule, RouterLink, CurrencyPipe], template: '<div class="row">\n  <div class="col-12">\n    <div class="card">\n      <div class="card-header d-flex justify-content-between align-items-center">\n        <h3 class="card-title">Shop</h3>\n        <a routerLink="/shop/basket" class="btn btn-primary btn-sm">\n          <i class="fas fa-shopping-basket mr-1"></i> Basket\n          @if (basket.count() > 0) {\n            <span class="badge badge-light ml-1">{{ basket.count() }}</span>\n          }\n        </a>\n      </div>\n      <div class="card-body">\n        <div class="form-group">\n          <input type="text" class="form-control" [(ngModel)]="search" placeholder="Search products by name or description\u2026">\n        </div>\n\n        @if (loading) {\n          <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>\n        } @else if (error) {\n          <div class="alert alert-danger">{{ error }}</div>\n        } @else if (filteredProducts.length === 0) {\n          <div class="alert alert-secondary">No products found.</div>\n        } @else {\n          <div class="row">\n            @for (product of filteredProducts; track product.id) {\n              <div class="col-md-4 col-lg-3 mb-4">\n                <div class="card h-100">\n                  <div class="card-body d-flex flex-column">\n                    <h5 class="card-title">{{ product.name }}</h5>\n                    <p class="card-text text-muted small flex-grow-1">{{ product.description }}</p>\n                    <p class="font-weight-bold">{{ product.price | currency }}</p>\n                    <div class="form-inline mb-2">\n                      <label class="mr-2 mb-0">Qty</label>\n                      <input type="number" class="form-control form-control-sm" style="width: 70px;"\n                             min="1" [ngModel]="quantityFor(product)"\n                             (ngModelChange)="setQuantity(product, $event)">\n                    </div>\n                    <button type="button" class="btn btn-sm"\n                            [class.btn-success]="addedProductId === product.id"\n                            [class.btn-outline-primary]="addedProductId !== product.id"\n                            (click)="addToBasket(product)">\n                      @if (addedProductId === product.id) {\n                        <i class="fas fa-check mr-1"></i> Added\n                      } @else {\n                        <i class="fas fa-cart-plus mr-1"></i> Add to basket\n                      }\n                    </button>\n                  </div>\n                </div>\n              </div>\n            }\n          </div>\n        }\n      </div>\n    </div>\n  </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShopProductsComponent, { className: "ShopProductsComponent", filePath: "app/pages/shop/shop-products.component.ts", lineNumber: 14 });
})();
export {
  ShopProductsComponent
};
//# sourceMappingURL=chunk-RGWO5TGE.js.map

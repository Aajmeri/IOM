import {
  BasketService
} from "./chunk-XWUJ5W22.js";
import "./chunk-JU3C6OAJ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-TZCII4RM.js";
import {
  Router,
  RouterLink
} from "./chunk-RBSBLNYF.js";
import {
  Component,
  CurrencyPipe,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵtextInterpolate
} from "./chunk-2HB4LNL5.js";

// src/app/pages/shop/shop-basket.component.ts
var _forTrack0 = ($index, $item) => $item.productId;
function ShopBasketComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, " Your basket is empty. ");
    \u0275\u0275elementStart(2, "a", 9);
    \u0275\u0275text(3, "Browse products");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " to get started. ");
    \u0275\u0275elementEnd();
  }
}
function ShopBasketComponent_Conditional_11_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "input", 15);
    \u0275\u0275listener("ngModelChange", function ShopBasketComponent_Conditional_11_For_14_Template_input_ngModelChange_7_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateQuantity(item_r3.productId, $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "button", 16);
    \u0275\u0275listener("click", function ShopBasketComponent_Conditional_11_For_14_Template_button_click_12_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.remove(item_r3.productId));
    });
    \u0275\u0275element(13, "i", 17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 4, item_r3.price));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", item_r3.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 6, item_r3.price * item_r3.quantity));
  }
}
function ShopBasketComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "table", 10)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Product");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Unit Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 11);
    \u0275\u0275text(8, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Line Total");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275repeaterCreate(13, ShopBasketComponent_Conditional_11_For_14_Template, 14, 8, "tr", null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "tfoot")(16, "tr")(17, "th", 12);
    \u0275\u0275text(18, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th");
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "th");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "button", 13);
    \u0275\u0275listener("click", function ShopBasketComponent_Conditional_11_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.scheduleDelivery());
    });
    \u0275\u0275element(24, "i", 14);
    \u0275\u0275text(25, " Schedule Delivery ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r3.basket.basket());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(21, 1, ctx_r3.basket.total()));
  }
}
var ShopBasketComponent = class _ShopBasketComponent {
  basket = inject(BasketService);
  router = inject(Router);
  updateQuantity(productId, value) {
    this.basket.updateQuantity(productId, Math.floor(value) || 0);
  }
  remove(productId) {
    this.basket.remove(productId);
  }
  scheduleDelivery() {
    this.router.navigate(["/shop/schedule"]);
  }
  static \u0275fac = function ShopBasketComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShopBasketComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShopBasketComponent, selectors: [["app-shop-basket"]], decls: 12, vars: 1, consts: [[1, "row"], [1, "col-12"], [1, "card"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "card-title"], ["routerLink", "/shop", 1, "btn", "btn-secondary", "btn-sm"], [1, "fas", "fa-arrow-left", "mr-1"], [1, "card-body"], [1, "alert", "alert-secondary"], ["routerLink", "/shop"], [1, "table", "table-bordered", "table-striped"], [2, "width", "140px"], ["colspan", "3", 1, "text-right"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "fas", "fa-calendar-alt", "mr-1"], ["type", "number", "min", "1", 1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn-danger", "btn-xs", 3, "click"], [1, "fas", "fa-trash"]], template: function ShopBasketComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4);
      \u0275\u0275text(5, "Your Basket");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "a", 5);
      \u0275\u0275element(7, "i", 6);
      \u0275\u0275text(8, " Continue Shopping ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275conditionalCreate(10, ShopBasketComponent_Conditional_10_Template, 5, 0, "div", 8)(11, ShopBasketComponent_Conditional_11_Template, 26, 3);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.basket.basket().length === 0 ? 10 : 11);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, RouterLink, CurrencyPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShopBasketComponent, [{
    type: Component,
    args: [{ selector: "app-shop-basket", standalone: true, imports: [FormsModule, RouterLink, CurrencyPipe], template: '<div class="row">\n  <div class="col-12">\n    <div class="card">\n      <div class="card-header d-flex justify-content-between align-items-center">\n        <h3 class="card-title">Your Basket</h3>\n        <a routerLink="/shop" class="btn btn-secondary btn-sm">\n          <i class="fas fa-arrow-left mr-1"></i> Continue Shopping\n        </a>\n      </div>\n      <div class="card-body">\n        @if (basket.basket().length === 0) {\n          <div class="alert alert-secondary">\n            Your basket is empty. <a routerLink="/shop">Browse products</a> to get started.\n          </div>\n        } @else {\n          <table class="table table-bordered table-striped">\n            <thead>\n              <tr>\n                <th>Product</th>\n                <th>Unit Price</th>\n                <th style="width: 140px;">Quantity</th>\n                <th>Line Total</th>\n                <th></th>\n              </tr>\n            </thead>\n            <tbody>\n              @for (item of basket.basket(); track item.productId) {\n                <tr>\n                  <td>{{ item.name }}</td>\n                  <td>{{ item.price | currency }}</td>\n                  <td>\n                    <input type="number" class="form-control form-control-sm" min="1"\n                           [ngModel]="item.quantity"\n                           (ngModelChange)="updateQuantity(item.productId, $event)">\n                  </td>\n                  <td>{{ item.price * item.quantity | currency }}</td>\n                  <td>\n                    <button type="button" class="btn btn-danger btn-xs" (click)="remove(item.productId)">\n                      <i class="fas fa-trash"></i>\n                    </button>\n                  </td>\n                </tr>\n              }\n            </tbody>\n            <tfoot>\n              <tr>\n                <th colspan="3" class="text-right">Total</th>\n                <th>{{ basket.total() | currency }}</th>\n                <th></th>\n              </tr>\n            </tfoot>\n          </table>\n          <button type="button" class="btn btn-primary" (click)="scheduleDelivery()">\n            <i class="fas fa-calendar-alt mr-1"></i> Schedule Delivery\n          </button>\n        }\n      </div>\n    </div>\n  </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShopBasketComponent, { className: "ShopBasketComponent", filePath: "app/pages/shop/shop-basket.component.ts", lineNumber: 13 });
})();
export {
  ShopBasketComponent
};
//# sourceMappingURL=chunk-ELSN2EME.js.map

import {
  OrderService
} from "./chunk-UHJK5ZV3.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-RBSBLNYF.js";
import {
  Component,
  CurrencyPipe,
  DatePipe,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-2HB4LNL5.js";

// src/app/pages/shop/shop-orders.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.productId;
function ShopOrdersComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "i", 13);
    \u0275\u0275text(2, " Your order has been submitted and is pending approval. ");
    \u0275\u0275elementEnd();
  }
}
function ShopOrdersComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "span", 14);
    \u0275\u0275elementEnd();
  }
}
function ShopOrdersComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function ShopOrdersComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1, " You haven't placed any orders yet. ");
    \u0275\u0275elementStart(2, "a", 15);
    \u0275\u0275text(3, "Start shopping");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, ". ");
    \u0275\u0275elementEnd();
  }
}
function ShopOrdersComponent_Conditional_14_For_14_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function ShopOrdersComponent_Conditional_14_For_14_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const order_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cancel(order_r3));
    });
    \u0275\u0275text(1, " Cancel ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.cancellingId === order_r3.id);
  }
}
function ShopOrdersComponent_Conditional_14_For_14_Conditional_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Notes:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", order_r3.notes);
  }
}
function ShopOrdersComponent_Conditional_14_For_14_Conditional_16_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Admin Notes:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", order_r3.adminNotes);
  }
}
function ShopOrdersComponent_Conditional_14_For_14_Conditional_16_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.productName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 4, item_r5.unitPrice));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 6, item_r5.unitPrice * item_r5.quantity));
  }
}
function ShopOrdersComponent_Conditional_14_For_14_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 20);
    \u0275\u0275conditionalCreate(2, ShopOrdersComponent_Conditional_14_For_14_Conditional_16_Conditional_2_Template, 4, 1, "p");
    \u0275\u0275conditionalCreate(3, ShopOrdersComponent_Conditional_14_For_14_Conditional_16_Conditional_3_Template, 4, 1, "p");
    \u0275\u0275elementStart(4, "table", 21)(5, "thead")(6, "tr")(7, "th");
    \u0275\u0275text(8, "Product");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Qty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Unit Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Line Total");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, ShopOrdersComponent_Conditional_14_For_14_Conditional_16_For_17_Template, 11, 8, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const order_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(order_r3.notes ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(order_r3.adminNotes ? 3 : -1);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(order_r3.items);
  }
}
function ShopOrdersComponent_Conditional_14_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span", 16);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td")(13, "button", 17);
    \u0275\u0275listener("click", function ShopOrdersComponent_Conditional_14_For_14_Template_button_click_13_listener() {
      const order_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleExpand(order_r3));
    });
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, ShopOrdersComponent_Conditional_14_For_14_Conditional_15_Template, 2, 1, "button", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(16, ShopOrdersComponent_Conditional_14_For_14_Conditional_16_Template, 18, 2, "tr");
  }
  if (rf & 2) {
    const order_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r3.number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 9, order_r3.scheduledDate, "medium"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r0.statusClass(order_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(order_r3.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 12, order_r3.total));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.expandedOrderId === order_r3.id ? "Hide" : "Details", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(order_r3.status === "Pending" ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.expandedOrderId === order_r3.id ? 16 : -1);
  }
}
function ShopOrdersComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 12)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Order #");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Scheduled Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275repeaterCreate(13, ShopOrdersComponent_Conditional_14_For_14_Template, 17, 14, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r0.orders);
  }
}
var ShopOrdersComponent = class _ShopOrdersComponent {
  orders = [];
  loading = true;
  error = "";
  placedConfirmation = false;
  cancellingId = null;
  expandedOrderId = null;
  orderService = inject(OrderService);
  route = inject(ActivatedRoute);
  ngOnInit() {
    this.placedConfirmation = this.route.snapshot.queryParams["placed"] === "1";
    this.load();
  }
  load() {
    this.loading = true;
    this.orderService.getMine().subscribe({
      next: (orders) => {
        this.orders = orders.sort((a, b) => b.createdDate.localeCompare(a.createdDate));
        this.loading = false;
      },
      error: () => {
        this.error = "Failed to load your orders.";
        this.loading = false;
      }
    });
  }
  toggleExpand(order) {
    this.expandedOrderId = this.expandedOrderId === order.id ? null : order.id;
  }
  cancel(order) {
    if (!confirm(`Cancel order ${order.number}?`))
      return;
    this.cancellingId = order.id;
    this.orderService.cancel(order.id).subscribe({
      next: () => {
        this.cancellingId = null;
        this.load();
      },
      error: () => {
        this.cancellingId = null;
        alert("Failed to cancel order.");
      }
    });
  }
  statusClass(status) {
    switch (status) {
      case "Approved":
        return "badge-success";
      case "Rejected":
        return "badge-danger";
      case "Cancelled":
        return "badge-secondary";
      default:
        return "badge-warning";
    }
  }
  static \u0275fac = function ShopOrdersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShopOrdersComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShopOrdersComponent, selectors: [["app-shop-orders"]], decls: 15, vars: 2, consts: [[1, "row"], [1, "col-12"], [1, "card"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "card-title"], ["routerLink", "/shop", 1, "btn", "btn-primary", "btn-sm"], [1, "fas", "fa-store", "mr-1"], [1, "card-body"], [1, "alert", "alert-success"], [1, "text-center", "py-3"], [1, "alert", "alert-danger"], [1, "alert", "alert-secondary"], [1, "table", "table-bordered", "table-striped"], [1, "fas", "fa-check-circle", "mr-1"], [1, "spinner-border", "text-primary"], ["routerLink", "/shop"], [1, "badge"], ["type", "button", 1, "btn", "btn-secondary", "btn-xs", 3, "click"], ["type", "button", 1, "btn", "btn-danger", "btn-xs", "ml-1", 3, "disabled"], ["type", "button", 1, "btn", "btn-danger", "btn-xs", "ml-1", 3, "click", "disabled"], ["colspan", "5"], [1, "table", "table-sm", "mb-0"]], template: function ShopOrdersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4);
      \u0275\u0275text(5, "My Orders");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "a", 5);
      \u0275\u0275element(7, "i", 6);
      \u0275\u0275text(8, " Continue Shopping ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275conditionalCreate(10, ShopOrdersComponent_Conditional_10_Template, 3, 0, "div", 8);
      \u0275\u0275conditionalCreate(11, ShopOrdersComponent_Conditional_11_Template, 2, 0, "div", 9)(12, ShopOrdersComponent_Conditional_12_Template, 2, 1, "div", 10)(13, ShopOrdersComponent_Conditional_13_Template, 5, 0, "div", 11)(14, ShopOrdersComponent_Conditional_14_Template, 15, 0, "table", 12);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.placedConfirmation ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 11 : ctx.error ? 12 : ctx.orders.length === 0 ? 13 : 14);
    }
  }, dependencies: [RouterLink, CurrencyPipe, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShopOrdersComponent, [{
    type: Component,
    args: [{ selector: "app-shop-orders", standalone: true, imports: [RouterLink, CurrencyPipe, DatePipe], template: `<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h3 class="card-title">My Orders</h3>
        <a routerLink="/shop" class="btn btn-primary btn-sm">
          <i class="fas fa-store mr-1"></i> Continue Shopping
        </a>
      </div>
      <div class="card-body">
        @if (placedConfirmation) {
          <div class="alert alert-success">
            <i class="fas fa-check-circle mr-1"></i> Your order has been submitted and is pending approval.
          </div>
        }

        @if (loading) {
          <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>
        } @else if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        } @else if (orders.length === 0) {
          <div class="alert alert-secondary">
            You haven't placed any orders yet. <a routerLink="/shop">Start shopping</a>.
          </div>
        } @else {
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Scheduled Date</th>
                <th>Status</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              @for (order of orders; track order.id) {
                <tr>
                  <td>{{ order.number }}</td>
                  <td>{{ order.scheduledDate | date:'medium' }}</td>
                  <td><span class="badge" [class]="statusClass(order.status)">{{ order.status }}</span></td>
                  <td>{{ order.total | currency }}</td>
                  <td>
                    <button type="button" class="btn btn-secondary btn-xs" (click)="toggleExpand(order)">
                      {{ expandedOrderId === order.id ? 'Hide' : 'Details' }}
                    </button>
                    @if (order.status === 'Pending') {
                      <button type="button" class="btn btn-danger btn-xs ml-1"
                              [disabled]="cancellingId === order.id"
                              (click)="cancel(order)">
                        Cancel
                      </button>
                    }
                  </td>
                </tr>
                @if (expandedOrderId === order.id) {
                  <tr>
                    <td colspan="5">
                      @if (order.notes) {
                        <p><strong>Notes:</strong> {{ order.notes }}</p>
                      }
                      @if (order.adminNotes) {
                        <p><strong>Admin Notes:</strong> {{ order.adminNotes }}</p>
                      }
                      <table class="table table-sm mb-0">
                        <thead>
                          <tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Line Total</th></tr>
                        </thead>
                        <tbody>
                          @for (item of order.items; track item.productId) {
                            <tr>
                              <td>{{ item.productName }}</td>
                              <td>{{ item.quantity }}</td>
                              <td>{{ item.unitPrice | currency }}</td>
                              <td>{{ item.unitPrice * item.quantity | currency }}</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShopOrdersComponent, { className: "ShopOrdersComponent", filePath: "app/pages/shop/shop-orders.component.ts", lineNumber: 12 });
})();
export {
  ShopOrdersComponent
};
//# sourceMappingURL=chunk-SLMRQOVH.js.map

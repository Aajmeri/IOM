import {
  OrderService
} from "./chunk-UHJK5ZV3.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-TZCII4RM.js";
import {
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2HB4LNL5.js";

// src/app/pages/order-approvals/order-approvals.component.ts
var _c0 = (a0) => ["/order-approvals", a0];
var _forTrack0 = ($index, $item) => $item.id;
function OrderApprovalsComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r1 = ctx.$implicit;
    \u0275\u0275property("value", status_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(status_r1);
  }
}
function OrderApprovalsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "span", 15);
    \u0275\u0275elementEnd();
  }
}
function OrderApprovalsComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function OrderApprovalsComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "No orders found for this filter.");
    \u0275\u0275elementEnd();
  }
}
function OrderApprovalsComponent_Conditional_18_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span", 16);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "a", 17);
    \u0275\u0275element(16, "i", 18);
    \u0275\u0275text(17, " View ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const order_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r3.number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r3.clientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 8, order_r3.scheduledDate, "medium"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.statusClass(order_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(order_r3.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 11, order_r3.total));
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c0, order_r3.id));
  }
}
function OrderApprovalsComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 14)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Order #");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Client");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Scheduled Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, OrderApprovalsComponent_Conditional_18_For_16_Template, 18, 15, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r1.orders);
  }
}
var OrderApprovalsComponent = class _OrderApprovalsComponent {
  orders = [];
  loading = true;
  error = "";
  statusFilter = "Pending";
  statuses = ["Pending", "Approved", "Rejected", "Cancelled"];
  orderService = inject(OrderService);
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.orderService.getAll(this.statusFilter).subscribe({
      next: (orders) => {
        this.orders = orders.sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
        this.loading = false;
      },
      error: () => {
        this.error = "Failed to load orders.";
        this.loading = false;
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
  static \u0275fac = function OrderApprovalsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderApprovalsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderApprovalsComponent, selectors: [["app-order-approvals"]], decls: 19, vars: 2, consts: [[1, "row"], [1, "col-12"], [1, "card"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "card-title"], [1, "form-inline"], [1, "mr-2", "mb-0"], [1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "card-body"], [1, "text-center", "py-3"], [1, "alert", "alert-danger"], [1, "alert", "alert-secondary"], [1, "table", "table-bordered", "table-striped"], [1, "spinner-border", "text-primary"], [1, "badge"], [1, "btn", "btn-primary", "btn-xs", 3, "routerLink"], [1, "fas", "fa-eye"]], template: function OrderApprovalsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4);
      \u0275\u0275text(5, "Order Approvals");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5)(7, "label", 6);
      \u0275\u0275text(8, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "select", 7);
      \u0275\u0275twoWayListener("ngModelChange", function OrderApprovalsComponent_Template_select_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function OrderApprovalsComponent_Template_select_ngModelChange_9_listener() {
        return ctx.load();
      });
      \u0275\u0275elementStart(10, "option", 8);
      \u0275\u0275text(11, "All");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(12, OrderApprovalsComponent_For_13_Template, 2, 2, "option", 9, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "div", 10);
      \u0275\u0275conditionalCreate(15, OrderApprovalsComponent_Conditional_15_Template, 2, 0, "div", 11)(16, OrderApprovalsComponent_Conditional_16_Template, 2, 1, "div", 12)(17, OrderApprovalsComponent_Conditional_17_Template, 2, 0, "div", 13)(18, OrderApprovalsComponent_Conditional_18_Template, 17, 0, "table", 14);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.statuses);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.loading ? 15 : ctx.error ? 16 : ctx.orders.length === 0 ? 17 : 18);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, RouterLink, CurrencyPipe, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderApprovalsComponent, [{
    type: Component,
    args: [{ selector: "app-order-approvals", standalone: true, imports: [FormsModule, RouterLink, CurrencyPipe, DatePipe], template: `<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h3 class="card-title">Order Approvals</h3>
        <div class="form-inline">
          <label class="mr-2 mb-0">Status</label>
          <select class="form-control form-control-sm" [(ngModel)]="statusFilter" (ngModelChange)="load()">
            <option value="">All</option>
            @for (status of statuses; track status) {
              <option [value]="status">{{ status }}</option>
            }
          </select>
        </div>
      </div>
      <div class="card-body">
        @if (loading) {
          <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>
        } @else if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        } @else if (orders.length === 0) {
          <div class="alert alert-secondary">No orders found for this filter.</div>
        } @else {
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Client</th>
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
                  <td>{{ order.clientName }}</td>
                  <td>{{ order.scheduledDate | date:'medium' }}</td>
                  <td><span class="badge" [class]="statusClass(order.status)">{{ order.status }}</span></td>
                  <td>{{ order.total | currency }}</td>
                  <td>
                    <a [routerLink]="['/order-approvals', order.id]" class="btn btn-primary btn-xs">
                      <i class="fas fa-eye"></i> View
                    </a>
                  </td>
                </tr>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderApprovalsComponent, { className: "OrderApprovalsComponent", filePath: "app/pages/order-approvals/order-approvals.component.ts", lineNumber: 13 });
})();
export {
  OrderApprovalsComponent
};
//# sourceMappingURL=chunk-RNZQRXIR.js.map

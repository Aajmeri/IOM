import {
  OrderService
} from "./chunk-UHJK5ZV3.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-TZCII4RM.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-RBSBLNYF.js";
import {
  Component,
  CurrencyPipe,
  DatePipe,
  LowerCasePipe,
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
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2HB4LNL5.js";

// src/app/pages/order-approvals/order-detail.component.ts
var _forTrack0 = ($index, $item) => $item.productId;
function OrderDetailComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "span", 2);
    \u0275\u0275elementEnd();
  }
}
function OrderDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function OrderDetailComponent_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.resultMessage);
  }
}
function OrderDetailComponent_Conditional_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function OrderDetailComponent_Conditional_2_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th");
  }
}
function OrderDetailComponent_Conditional_2_For_50_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "button", 26);
    \u0275\u0275listener("click", function OrderDetailComponent_Conditional_2_For_50_Conditional_11_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.removeItem(item_r4.productId));
    });
    \u0275\u0275element(2, "i", 27);
    \u0275\u0275elementEnd()();
  }
}
function OrderDetailComponent_Conditional_2_For_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function OrderDetailComponent_Conditional_2_For_50_Template_input_ngModelChange_4_listener($event) {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      \u0275\u0275twoWayBindingSet(item_r4.quantity, $event) || (item_r4.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, OrderDetailComponent_Conditional_2_For_50_Conditional_11_Template, 3, 0, "td");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.productName);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r4.quantity);
    \u0275\u0275property("name", "qty-" + item_r4.productId)("disabled", !ctx_r0.isPending);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 7, item_r4.unitPrice));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 9, item_r4.unitPrice * item_r4.quantity));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isPending ? 11 : -1);
  }
}
function OrderDetailComponent_Conditional_2_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th");
  }
}
function OrderDetailComponent_Conditional_2_Conditional_59_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 29);
  }
}
function OrderDetailComponent_Conditional_2_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function OrderDetailComponent_Conditional_2_Conditional_59_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.saveChanges());
    });
    \u0275\u0275conditionalCreate(1, OrderDetailComponent_Conditional_2_Conditional_59_Conditional_1_Template, 1, 0, "span", 29);
    \u0275\u0275text(2, " Save Changes ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.saving);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.saving ? 1 : -1);
  }
}
function OrderDetailComponent_Conditional_2_Conditional_66_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2, "Admin Notes:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.order.adminNotes);
  }
}
function OrderDetailComponent_Conditional_2_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "lowercase");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, OrderDetailComponent_Conditional_2_Conditional_66_Conditional_3_Template, 4, 1, "p");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("This order has already been ", \u0275\u0275pipeBind1(2, 2, ctx_r0.order.status), " and can no longer be changed.");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.order.adminNotes ? 3 : -1);
  }
}
function OrderDetailComponent_Conditional_2_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "label");
    \u0275\u0275text(2, "Admin Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "textarea", 31);
    \u0275\u0275twoWayListener("ngModelChange", function OrderDetailComponent_Conditional_2_Conditional_67_Template_textarea_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.adminNotes, $event) || (ctx_r0.adminNotes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 32);
    \u0275\u0275listener("click", function OrderDetailComponent_Conditional_2_Conditional_67_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.approve());
    });
    \u0275\u0275element(5, "i", 33);
    \u0275\u0275text(6, " Approve ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 34);
    \u0275\u0275listener("click", function OrderDetailComponent_Conditional_2_Conditional_67_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.reject());
    });
    \u0275\u0275element(8, "i", 35);
    \u0275\u0275text(9, " Reject ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.adminNotes);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.deciding);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.deciding);
  }
}
function OrderDetailComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "a", 5);
    \u0275\u0275element(3, "i", 6);
    \u0275\u0275text(4, " Back to Order Approvals ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(5, OrderDetailComponent_Conditional_2_Conditional_5_Template, 2, 1, "div", 7);
    \u0275\u0275elementStart(6, "div", 3)(7, "div", 8)(8, "div", 9)(9, "div", 10)(10, "h3", 11);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 12);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 13);
    \u0275\u0275conditionalCreate(15, OrderDetailComponent_Conditional_2_Conditional_15_Template, 2, 1, "div", 1);
    \u0275\u0275elementStart(16, "dl", 3)(17, "dt", 14);
    \u0275\u0275text(18, "Client");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "dd", 15);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dt", 14);
    \u0275\u0275text(22, "Placed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "dd", 15);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 16)(27, "label");
    \u0275\u0275text(28, "Scheduled Date/Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function OrderDetailComponent_Conditional_2_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.scheduledDate, $event) || (ctx_r0.scheduledDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 16)(31, "label");
    \u0275\u0275text(32, "Client Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "textarea", 18);
    \u0275\u0275twoWayListener("ngModelChange", function OrderDetailComponent_Conditional_2_Template_textarea_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.notes, $event) || (ctx_r0.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "h5");
    \u0275\u0275text(35, "Items");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "table", 19)(37, "thead")(38, "tr")(39, "th");
    \u0275\u0275text(40, "Product");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "th", 20);
    \u0275\u0275text(42, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "th");
    \u0275\u0275text(44, "Unit Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "th");
    \u0275\u0275text(46, "Line Total");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(47, OrderDetailComponent_Conditional_2_Conditional_47_Template, 1, 0, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "tbody");
    \u0275\u0275repeaterCreate(49, OrderDetailComponent_Conditional_2_For_50_Template, 12, 11, "tr", null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "tfoot")(52, "tr")(53, "th", 21);
    \u0275\u0275text(54, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "th");
    \u0275\u0275text(56);
    \u0275\u0275pipe(57, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(58, OrderDetailComponent_Conditional_2_Conditional_58_Template, 1, 0, "th");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(59, OrderDetailComponent_Conditional_2_Conditional_59_Template, 3, 2, "button", 22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(60, "div", 23)(61, "div", 9)(62, "div", 24)(63, "h3", 11);
    \u0275\u0275text(64, "Decision");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 13);
    \u0275\u0275conditionalCreate(66, OrderDetailComponent_Conditional_2_Conditional_66_Template, 4, 4)(67, OrderDetailComponent_Conditional_2_Conditional_67_Template, 10, 3);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.resultMessage ? 5 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Order ", ctx_r0.order.number);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.statusClass(ctx_r0.order.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.order.status);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.error ? 15 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.order.clientName);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 17, ctx_r0.order.createdDate, "medium"));
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.scheduledDate);
    \u0275\u0275property("disabled", !ctx_r0.isPending);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.notes);
    \u0275\u0275property("disabled", !ctx_r0.isPending);
    \u0275\u0275advance(14);
    \u0275\u0275conditional(ctx_r0.isPending ? 47 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.editItems);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(57, 20, ctx_r0.editTotal));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isPending ? 58 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isPending ? 59 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(!ctx_r0.isPending ? 66 : 67);
  }
}
var OrderDetailComponent = class _OrderDetailComponent {
  order = null;
  loading = true;
  error = "";
  editItems = [];
  scheduledDate = "";
  notes = "";
  adminNotes = "";
  saving = false;
  deciding = false;
  resultMessage = "";
  orderId = "";
  route = inject(ActivatedRoute);
  router = inject(Router);
  orderService = inject(OrderService);
  ngOnInit() {
    this.orderId = this.route.snapshot.params["id"];
    this.load();
  }
  load() {
    this.loading = true;
    this.orderService.getById(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.editItems = order.items.map((i) => ({
          productId: i.productId,
          productName: i.productName,
          unitPrice: i.unitPrice,
          quantity: i.quantity
        }));
        this.scheduledDate = order.scheduledDate;
        this.notes = order.notes;
        this.adminNotes = order.adminNotes ?? "";
        this.loading = false;
      },
      error: () => {
        this.error = "Order not found.";
        this.loading = false;
      }
    });
  }
  get editTotal() {
    return this.editItems.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  }
  get isPending() {
    return this.order?.status === "Pending";
  }
  removeItem(productId) {
    this.editItems = this.editItems.filter((i) => i.productId !== productId);
  }
  saveChanges() {
    if (!this.order)
      return;
    this.error = "";
    this.saving = true;
    const data = {
      scheduledDate: this.scheduledDate,
      notes: this.notes,
      items: this.editItems.map((i) => ({ productId: i.productId, quantity: i.quantity }))
    };
    this.orderService.update(this.order.id, data).subscribe({
      next: (order) => {
        this.order = order;
        this.saving = false;
      },
      error: (err) => {
        this.error = err.error?.message ?? "Failed to save changes.";
        this.saving = false;
      }
    });
  }
  approve() {
    if (!this.order)
      return;
    this.error = "";
    this.deciding = true;
    this.orderService.approve(this.order.id, this.adminNotes.trim() || void 0).subscribe({
      next: (order) => this.onDecided(order),
      error: (err) => {
        this.error = err.error?.message ?? "Failed to approve order.";
        this.deciding = false;
      }
    });
  }
  reject() {
    if (!this.order)
      return;
    if (!this.adminNotes.trim()) {
      this.error = "Please provide a reason for rejecting this order.";
      return;
    }
    this.error = "";
    this.deciding = true;
    this.orderService.reject(this.order.id, this.adminNotes.trim()).subscribe({
      next: (order) => this.onDecided(order),
      error: (err) => {
        this.error = err.error?.message ?? "Failed to reject order.";
        this.deciding = false;
      }
    });
  }
  onDecided(order) {
    this.order = order;
    this.deciding = false;
    this.resultMessage = `Order ${order.number} is now ${order.status}.`;
    setTimeout(() => this.router.navigate(["/order-approvals"]), 1500);
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
  static \u0275fac = function OrderDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderDetailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderDetailComponent, selectors: [["app-order-detail"]], decls: 3, vars: 1, consts: [[1, "text-center", "py-3"], [1, "alert", "alert-danger"], [1, "spinner-border", "text-primary"], [1, "row"], [1, "col-12", "mb-2"], ["routerLink", "/order-approvals", 1, "btn", "btn-secondary", "btn-sm"], [1, "fas", "fa-arrow-left", "mr-1"], [1, "alert", "alert-success"], [1, "col-md-8"], [1, "card"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "card-title"], [1, "badge"], [1, "card-body"], [1, "col-sm-3"], [1, "col-sm-9"], [1, "form-group"], ["type", "datetime-local", "name", "scheduledDate", 1, "form-control", 3, "ngModelChange", "ngModel", "disabled"], ["rows", "2", "name", "notes", 1, "form-control", 3, "ngModelChange", "ngModel", "disabled"], [1, "table", "table-bordered", "table-sm"], [2, "width", "120px"], ["colspan", "3", 1, "text-right"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled"], [1, "col-md-4"], [1, "card-header"], ["type", "number", "min", "1", 1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel", "name", "disabled"], ["type", "button", 1, "btn", "btn-danger", "btn-xs", 3, "click"], [1, "fas", "fa-trash"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [1, "spinner-border", "spinner-border-sm", "mr-1"], [1, "text-muted"], ["rows", "3", "name", "adminNotes", "placeholder", "Optional for approval, required to reject\u2026", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn-success", "btn-block", 3, "click", "disabled"], [1, "fas", "fa-check", "mr-1"], ["type", "button", 1, "btn", "btn-danger", "btn-block", 3, "click", "disabled"], [1, "fas", "fa-times", "mr-1"]], template: function OrderDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, OrderDetailComponent_Conditional_0_Template, 2, 0, "div", 0)(1, OrderDetailComponent_Conditional_1_Template, 2, 1, "div", 1)(2, OrderDetailComponent_Conditional_2_Template, 68, 22);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.loading ? 0 : ctx.error && !ctx.order ? 1 : ctx.order ? 2 : -1);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, RouterLink, CurrencyPipe, DatePipe, LowerCasePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderDetailComponent, [{
    type: Component,
    args: [{ selector: "app-order-detail", standalone: true, imports: [FormsModule, RouterLink, CurrencyPipe, DatePipe, LowerCasePipe], template: `@if (loading) {
  <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>
} @else if (error && !order) {
  <div class="alert alert-danger">{{ error }}</div>
} @else if (order) {
  <div class="row">
    <div class="col-12 mb-2">
      <a routerLink="/order-approvals" class="btn btn-secondary btn-sm">
        <i class="fas fa-arrow-left mr-1"></i> Back to Order Approvals
      </a>
    </div>
  </div>

  @if (resultMessage) {
    <div class="alert alert-success">{{ resultMessage }}</div>
  }

  <div class="row">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h3 class="card-title">Order {{ order.number }}</h3>
          <span class="badge" [class]="statusClass(order.status)">{{ order.status }}</span>
        </div>
        <div class="card-body">
          @if (error) {
            <div class="alert alert-danger">{{ error }}</div>
          }
          <dl class="row">
            <dt class="col-sm-3">Client</dt>
            <dd class="col-sm-9">{{ order.clientName }}</dd>
            <dt class="col-sm-3">Placed</dt>
            <dd class="col-sm-9">{{ order.createdDate | date:'medium' }}</dd>
          </dl>

          <div class="form-group">
            <label>Scheduled Date/Time</label>
            <input type="datetime-local" class="form-control" [(ngModel)]="scheduledDate"
                   name="scheduledDate" [disabled]="!isPending">
          </div>

          <div class="form-group">
            <label>Client Notes</label>
            <textarea class="form-control" rows="2" [(ngModel)]="notes" name="notes" [disabled]="!isPending"></textarea>
          </div>

          <h5>Items</h5>
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Product</th>
                <th style="width: 120px;">Quantity</th>
                <th>Unit Price</th>
                <th>Line Total</th>
                @if (isPending) { <th></th> }
              </tr>
            </thead>
            <tbody>
              @for (item of editItems; track item.productId) {
                <tr>
                  <td>{{ item.productName }}</td>
                  <td>
                    <input type="number" class="form-control form-control-sm" min="1"
                           [(ngModel)]="item.quantity" [name]="'qty-' + item.productId"
                           [disabled]="!isPending">
                  </td>
                  <td>{{ item.unitPrice | currency }}</td>
                  <td>{{ item.unitPrice * item.quantity | currency }}</td>
                  @if (isPending) {
                    <td>
                      <button type="button" class="btn btn-danger btn-xs" (click)="removeItem(item.productId)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  }
                </tr>
              }
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3" class="text-right">Total</th>
                <th>{{ editTotal | currency }}</th>
                @if (isPending) { <th></th> }
              </tr>
            </tfoot>
          </table>

          @if (isPending) {
            <button type="button" class="btn btn-primary" [disabled]="saving" (click)="saveChanges()">
              @if (saving) { <span class="spinner-border spinner-border-sm mr-1"></span> }
              Save Changes
            </button>
          }
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Decision</h3>
        </div>
        <div class="card-body">
          @if (!isPending) {
            <p class="text-muted">This order has already been {{ order.status | lowercase }} and can no longer be changed.</p>
            @if (order.adminNotes) {
              <p><strong>Admin Notes:</strong> {{ order.adminNotes }}</p>
            }
          } @else {
            <div class="form-group">
              <label>Admin Notes</label>
              <textarea class="form-control" rows="3" [(ngModel)]="adminNotes" name="adminNotes"
                        placeholder="Optional for approval, required to reject\u2026"></textarea>
            </div>
            <button type="button" class="btn btn-success btn-block" [disabled]="deciding" (click)="approve()">
              <i class="fas fa-check mr-1"></i> Approve
            </button>
            <button type="button" class="btn btn-danger btn-block" [disabled]="deciding" (click)="reject()">
              <i class="fas fa-times mr-1"></i> Reject
            </button>
          }
        </div>
      </div>
    </div>
  </div>
}
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderDetailComponent, { className: "OrderDetailComponent", filePath: "app/pages/order-approvals/order-detail.component.ts", lineNumber: 18 });
})();
export {
  OrderDetailComponent
};
//# sourceMappingURL=chunk-OFVQEZ4N.js.map

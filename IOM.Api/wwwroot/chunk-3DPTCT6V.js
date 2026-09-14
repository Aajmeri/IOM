import {
  FullCalendarComponent,
  FullCalendarModule,
  index,
  index2
} from "./chunk-RVO36FWX.js";
import {
  OrderService
} from "./chunk-UHJK5ZV3.js";
import {
  BasketService
} from "./chunk-XWUJ5W22.js";
import "./chunk-JU3C6OAJ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-TZCII4RM.js";
import {
  Router,
  RouterLink
} from "./chunk-RBSBLNYF.js";
import {
  Component,
  CurrencyPipe,
  DatePipe,
  HttpClient,
  HttpParams,
  Injectable,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
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
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2HB4LNL5.js";

// src/app/services/availability.service.ts
var AvailabilityService = class _AvailabilityService {
  http;
  base = "/api/availability";
  constructor(http) {
    this.http = http;
  }
  getRange(start, end) {
    const params = new HttpParams().set("start", start).set("end", end);
    return this.http.get(this.base, { params });
  }
  static \u0275fac = function AvailabilityService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AvailabilityService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AvailabilityService, factory: _AvailabilityService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvailabilityService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/pages/shop/shop-schedule.component.ts
var _forTrack0 = ($index, $item) => $item.start;
function ShopScheduleComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.loadError);
  }
}
function ShopScheduleComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Pick an available day ");
  }
}
function ShopScheduleComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" Available times \u2014 ", \u0275\u0275pipeBind2(1, 1, ctx_r0.selectedDate, "mediumDate"), " ");
  }
}
function ShopScheduleComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Confirm Order ");
  }
}
function ShopScheduleComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function ShopScheduleComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1, "Click a green day on the calendar to see open delivery times.");
    \u0275\u0275elementEnd();
  }
}
function ShopScheduleComponent_Conditional_27_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function ShopScheduleComponent_Conditional_27_For_2_Template_button_click_0_listener() {
      const slot_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.pickSlot(slot_r3));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const slot_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(2, 2, slot_r3.start, "shortTime"), " \u2013 ", \u0275\u0275pipeBind2(3, 5, slot_r3.end, "shortTime"), " ");
  }
}
function ShopScheduleComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275repeaterCreate(1, ShopScheduleComponent_Conditional_27_For_2_Template, 4, 8, "button", 17, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.selectedSlots);
  }
}
function ShopScheduleComponent_Conditional_28_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 24);
  }
}
function ShopScheduleComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p")(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "br");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementStart(8, "button", 19);
    \u0275\u0275listener("click", function ShopScheduleComponent_Conditional_28_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.changeSlot());
    });
    \u0275\u0275text(9, "change");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 20)(11, "label");
    \u0275\u0275text(12, "Order Notes (optional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "textarea", 21);
    \u0275\u0275twoWayListener("ngModelChange", function ShopScheduleComponent_Conditional_28_Template_textarea_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.notes, $event) || (ctx_r0.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p", 22);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 23);
    \u0275\u0275listener("click", function ShopScheduleComponent_Conditional_28_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitOrder());
    });
    \u0275\u0275conditionalCreate(18, ShopScheduleComponent_Conditional_28_Conditional_18_Template, 1, 0, "span", 24);
    \u0275\u0275text(19, " Submit Order ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 7, ctx_r0.selectedDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(6, 10, ctx_r0.selectedSlot.start, "shortTime"), " \u2013 ", \u0275\u0275pipeBind2(7, 13, ctx_r0.selectedSlot.end, "shortTime"), " ");
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.notes);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Total: ", \u0275\u0275pipeBind1(16, 16, ctx_r0.basket.total()));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.submitting);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.submitting ? 18 : -1);
  }
}
var ShopScheduleComponent = class _ShopScheduleComponent {
  availabilityService = inject(AvailabilityService);
  orderService = inject(OrderService);
  router = inject(Router);
  basket = inject(BasketService);
  daysByDate = /* @__PURE__ */ new Map();
  selectedDate = null;
  selectedSlots = [];
  selectedSlot = null;
  notes = "";
  submitting = false;
  error = "";
  loadError = "";
  calendarOptions = {
    plugins: [index, index2],
    initialView: "dayGridMonth",
    height: "auto",
    headerToolbar: { left: "prev,next today", center: "title", right: "dayGridMonth" },
    events: (info, successCallback, failureCallback) => {
      const start = info.startStr.substring(0, 10);
      const end = info.endStr.substring(0, 10);
      this.availabilityService.getRange(start, end).subscribe({
        next: (days) => {
          this.loadError = "";
          const events = [];
          for (const day of days) {
            this.daysByDate.set(day.date, day);
            const hasAvailable = day.slots.some((s) => s.available);
            events.push({
              start: day.date,
              display: "background",
              color: hasAvailable ? "#28a745" : "#dc3545"
            });
          }
          successCallback(events);
        },
        error: (err) => {
          this.loadError = "Failed to load delivery availability.";
          failureCallback(err);
        }
      });
    },
    dateClick: (arg) => this.onDateClick(arg.dateStr)
  };
  ngOnInit() {
    if (this.basket.basket().length === 0) {
      this.router.navigate(["/shop/basket"]);
    }
  }
  onDateClick(dateStr) {
    this.error = "";
    const day = this.daysByDate.get(dateStr);
    const openSlots = day ? day.slots.filter((s) => s.available) : [];
    if (openSlots.length === 0) {
      this.selectedDate = null;
      this.selectedSlots = [];
      this.selectedSlot = null;
      return;
    }
    this.selectedDate = dateStr;
    this.selectedSlots = openSlots;
    this.selectedSlot = null;
  }
  pickSlot(slot) {
    this.selectedSlot = slot;
  }
  changeSlot() {
    this.selectedSlot = null;
  }
  submitOrder() {
    if (!this.selectedSlot)
      return;
    this.error = "";
    this.submitting = true;
    const data = {
      scheduledDate: this.selectedSlot.start,
      notes: this.notes.trim() || null,
      items: this.basket.basket().map((i) => ({ productId: i.productId, quantity: i.quantity }))
    };
    this.orderService.create(data).subscribe({
      next: () => {
        this.basket.clear();
        this.submitting = false;
        this.router.navigate(["/shop/orders"], { queryParams: { placed: "1" } });
      },
      error: (err) => {
        this.error = err.error?.message ?? "Failed to submit order.";
        this.submitting = false;
      }
    });
  }
  static \u0275fac = function ShopScheduleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShopScheduleComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShopScheduleComponent, selectors: [["app-shop-schedule"]], decls: 29, vars: 5, consts: [[1, "row"], [1, "col-md-7"], [1, "card"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "card-title"], ["routerLink", "/shop/basket", 1, "btn", "btn-secondary", "btn-sm"], [1, "fas", "fa-arrow-left", "mr-1"], [1, "card-body"], [1, "alert", "alert-danger"], [1, "mb-2", "small"], [1, "badge", 2, "background", "#28a745", "color", "#fff"], [1, "badge", 2, "background", "#dc3545", "color", "#fff"], [3, "options"], [1, "col-md-5"], [1, "card-header"], [1, "text-muted"], [1, "d-flex", "flex-wrap", "gap-2"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", "mr-2", "mb-2"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", "mr-2", "mb-2", 3, "click"], ["type", "button", 1, "btn", "btn-link", "btn-sm", "p-0", "ml-2", 3, "click"], [1, "form-group"], ["rows", "3", "name", "notes", "placeholder", "Any special instructions for this delivery\u2026", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "font-weight-bold"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [1, "spinner-border", "spinner-border-sm", "mr-1"]], template: function ShopScheduleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4);
      \u0275\u0275text(5, "Choose a Delivery Day");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "a", 5);
      \u0275\u0275element(7, "i", 6);
      \u0275\u0275text(8, " Back to Basket ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275conditionalCreate(10, ShopScheduleComponent_Conditional_10_Template, 2, 1, "div", 8);
      \u0275\u0275elementStart(11, "div", 9)(12, "span", 10);
      \u0275\u0275text(13, "Open");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 11);
      \u0275\u0275text(15, "Fully booked");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(16, "full-calendar", 12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 13)(18, "div", 2)(19, "div", 14)(20, "h3", 4);
      \u0275\u0275conditionalCreate(21, ShopScheduleComponent_Conditional_21_Template, 1, 0)(22, ShopScheduleComponent_Conditional_22_Template, 2, 4)(23, ShopScheduleComponent_Conditional_23_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 7);
      \u0275\u0275conditionalCreate(25, ShopScheduleComponent_Conditional_25_Template, 2, 1, "div", 8);
      \u0275\u0275conditionalCreate(26, ShopScheduleComponent_Conditional_26_Template, 2, 0, "p", 15)(27, ShopScheduleComponent_Conditional_27_Template, 3, 0, "div", 16)(28, ShopScheduleComponent_Conditional_28_Template, 20, 18);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.loadError ? 10 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275property("options", ctx.calendarOptions);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(!ctx.selectedDate ? 21 : !ctx.selectedSlot ? 22 : 23);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.error ? 25 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.selectedDate ? 26 : !ctx.selectedSlot ? 27 : 28);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink, FullCalendarModule, FullCalendarComponent, DatePipe, CurrencyPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShopScheduleComponent, [{
    type: Component,
    args: [{ selector: "app-shop-schedule", standalone: true, imports: [FormsModule, RouterLink, DatePipe, CurrencyPipe, FullCalendarModule], template: `<div class="row">
  <div class="col-md-7">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h3 class="card-title">Choose a Delivery Day</h3>
        <a routerLink="/shop/basket" class="btn btn-secondary btn-sm">
          <i class="fas fa-arrow-left mr-1"></i> Back to Basket
        </a>
      </div>
      <div class="card-body">
        @if (loadError) {
          <div class="alert alert-danger">{{ loadError }}</div>
        }
        <div class="mb-2 small">
          <span class="badge" style="background:#28a745;color:#fff;">Open</span>
          <span class="badge" style="background:#dc3545;color:#fff;">Fully booked</span>
        </div>
        <full-calendar [options]="calendarOptions"></full-calendar>
      </div>
    </div>
  </div>

  <div class="col-md-5">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          @if (!selectedDate) {
            Pick an available day
          } @else if (!selectedSlot) {
            Available times \u2014 {{ selectedDate | date:'mediumDate' }}
          } @else {
            Confirm Order
          }
        </h3>
      </div>
      <div class="card-body">
        @if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        }

        @if (!selectedDate) {
          <p class="text-muted">Click a green day on the calendar to see open delivery times.</p>
        } @else if (!selectedSlot) {
          <div class="d-flex flex-wrap gap-2">
            @for (slot of selectedSlots; track slot.start) {
              <button type="button" class="btn btn-outline-primary btn-sm mr-2 mb-2" (click)="pickSlot(slot)">
                {{ slot.start | date:'shortTime' }} \u2013 {{ slot.end | date:'shortTime' }}
              </button>
            }
          </div>
        } @else {
          <p>
            <strong>{{ selectedDate | date:'mediumDate' }}</strong><br>
            {{ selectedSlot.start | date:'shortTime' }} \u2013 {{ selectedSlot.end | date:'shortTime' }}
            <button type="button" class="btn btn-link btn-sm p-0 ml-2" (click)="changeSlot()">change</button>
          </p>
          <div class="form-group">
            <label>Order Notes (optional)</label>
            <textarea class="form-control" rows="3" [(ngModel)]="notes" name="notes"
                      placeholder="Any special instructions for this delivery\u2026"></textarea>
          </div>
          <p class="font-weight-bold">Total: {{ basket.total() | currency }}</p>
          <button type="button" class="btn btn-primary" [disabled]="submitting" (click)="submitOrder()">
            @if (submitting) { <span class="spinner-border spinner-border-sm mr-1"></span> }
            Submit Order
          </button>
        }
      </div>
    </div>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShopScheduleComponent, { className: "ShopScheduleComponent", filePath: "app/pages/shop/shop-schedule.component.ts", lineNumber: 19 });
})();
export {
  ShopScheduleComponent
};
//# sourceMappingURL=chunk-3DPTCT6V.js.map

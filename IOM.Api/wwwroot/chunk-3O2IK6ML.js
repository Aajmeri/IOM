import {
  FullCalendarComponent,
  FullCalendarModule,
  index,
  index2
} from "./chunk-RVO36FWX.js";
import {
  DeliveryService
} from "./chunk-BFQARSLJ.js";
import {
  SupplierSearchComponent
} from "./chunk-URSQEXCE.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-TZCII4RM.js";
import "./chunk-FIKR27S7.js";
import {
  Component,
  DatePipe,
  ViewChild,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-2HB4LNL5.js";

// src/app/pages/deliveries/delivery-search.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DeliverySearchComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
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
function DeliverySearchComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function DeliverySearchComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275element(1, "span", 21);
    \u0275\u0275elementEnd();
  }
}
function DeliverySearchComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, "No deliveries match your search.");
    \u0275\u0275elementEnd();
  }
}
function DeliverySearchComponent_Conditional_36_For_15_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "Past");
    \u0275\u0275elementEnd();
  }
}
function DeliverySearchComponent_Conditional_36_For_15_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1, "Upcoming");
    \u0275\u0275elementEnd();
  }
}
function DeliverySearchComponent_Conditional_36_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span", 22);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275conditionalCreate(10, DeliverySearchComponent_Conditional_36_For_15_Conditional_10_Template, 2, 0, "span", 23)(11, DeliverySearchComponent_Conditional_36_For_15_Conditional_11_Template, 2, 0, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const delivery_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(delivery_r3.supplierName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 7, delivery_r3.scheduledDate, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.statusBadge(delivery_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(delivery_r3.status);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isPast(delivery_r3) ? 10 : 11);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(delivery_r3.notes || "\u2014");
  }
}
function DeliverySearchComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 20)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Supplier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Scheduled");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Timing");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Notes");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275repeaterCreate(14, DeliverySearchComponent_Conditional_36_For_15_Template, 14, 10, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r1.results);
  }
}
var DeliverySearchComponent = class _DeliverySearchComponent {
  filters = {
    from: "",
    to: "",
    supplierId: "",
    status: "",
    keyword: ""
  };
  statuses = ["Scheduled", "Completed", "Cancelled", "Delayed"];
  results = [];
  loading = false;
  error = "";
  searched = false;
  deliveryService = inject(DeliveryService);
  ngOnInit() {
    this.search();
  }
  onSupplierSelected(supplier) {
    this.filters.supplierId = supplier?.id ?? "";
  }
  search() {
    this.loading = true;
    this.error = "";
    this.searched = true;
    this.deliveryService.search({
      from: this.filters.from || void 0,
      to: this.filters.to || void 0,
      supplierId: this.filters.supplierId || void 0,
      status: this.filters.status || void 0,
      keyword: this.filters.keyword || void 0
    }).subscribe({
      next: (results) => {
        this.results = results.sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
        this.loading = false;
      },
      error: () => {
        this.error = "Failed to search deliveries.";
        this.loading = false;
      }
    });
  }
  isPast(delivery) {
    return new Date(delivery.scheduledDate).getTime() < Date.now();
  }
  statusBadge(status) {
    switch (status) {
      case "Scheduled":
        return "badge-primary";
      case "Completed":
        return "badge-success";
      case "Cancelled":
        return "badge-secondary";
      case "Delayed":
        return "badge-warning";
      default:
        return "badge-light";
    }
  }
  static \u0275fac = function DeliverySearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeliverySearchComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeliverySearchComponent, selectors: [["app-delivery-search"]], decls: 37, vars: 7, consts: [[1, "card"], [1, "card-header"], [1, "card-title"], [1, "card-body"], [1, "form-row", "align-items-end"], [1, "form-group", "col-md-2"], ["type", "date", "name", "from", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "date", "name", "to", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-group", "col-md-3"], ["placeholder", "Any supplier\u2026", 3, "selected"], ["name", "status", 1, "form-control", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], ["type", "text", "name", "keyword", "placeholder", "Notes\u2026", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-group", "col-md-1"], ["type", "button", 1, "btn", "btn-primary", "btn-block", 3, "click", "disabled"], [1, "fas", "fa-search"], [1, "alert", "alert-danger"], [1, "text-center", "py-3"], [1, "text-muted", "mb-0"], [1, "table", "table-sm", "table-bordered", "table-striped"], [1, "spinner-border", "text-primary"], [1, "badge"], [1, "badge", "badge-light"], [1, "badge", "badge-info"]], template: function DeliverySearchComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
      \u0275\u0275text(3, "Search Deliveries");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "label");
      \u0275\u0275text(8, "From");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function DeliverySearchComponent_Template_input_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filters.from, $event) || (ctx.filters.from = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 5)(11, "label");
      \u0275\u0275text(12, "To");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function DeliverySearchComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filters.to, $event) || (ctx.filters.to = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 8)(15, "label");
      \u0275\u0275text(16, "Supplier");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "app-supplier-search", 9);
      \u0275\u0275listener("selected", function DeliverySearchComponent_Template_app_supplier_search_selected_17_listener($event) {
        return ctx.onSupplierSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 5)(19, "label");
      \u0275\u0275text(20, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "select", 10);
      \u0275\u0275twoWayListener("ngModelChange", function DeliverySearchComponent_Template_select_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filters.status, $event) || (ctx.filters.status = $event);
        return $event;
      });
      \u0275\u0275elementStart(22, "option", 11);
      \u0275\u0275text(23, "Any");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(24, DeliverySearchComponent_For_25_Template, 2, 2, "option", 12, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 5)(27, "label");
      \u0275\u0275text(28, "Keyword");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function DeliverySearchComponent_Template_input_ngModelChange_29_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.filters.keyword, $event) || (ctx.filters.keyword = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 14)(31, "button", 15);
      \u0275\u0275listener("click", function DeliverySearchComponent_Template_button_click_31_listener() {
        return ctx.search();
      });
      \u0275\u0275element(32, "i", 16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(33, DeliverySearchComponent_Conditional_33_Template, 2, 1, "div", 17);
      \u0275\u0275conditionalCreate(34, DeliverySearchComponent_Conditional_34_Template, 2, 0, "div", 18)(35, DeliverySearchComponent_Conditional_35_Template, 2, 0, "p", 19)(36, DeliverySearchComponent_Conditional_36_Template, 16, 0, "table", 20);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.filters.from);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.filters.to);
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.filters.status);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.statuses);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.filters.keyword);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.error ? 33 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 34 : ctx.searched && ctx.results.length === 0 ? 35 : ctx.results.length > 0 ? 36 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, SupplierSearchComponent, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeliverySearchComponent, [{
    type: Component,
    args: [{ selector: "app-delivery-search", standalone: true, imports: [FormsModule, SupplierSearchComponent, DatePipe], template: `<div class="card">
  <div class="card-header">
    <h3 class="card-title">Search Deliveries</h3>
  </div>
  <div class="card-body">
    <div class="form-row align-items-end">
      <div class="form-group col-md-2">
        <label>From</label>
        <input type="date" class="form-control" [(ngModel)]="filters.from" name="from">
      </div>
      <div class="form-group col-md-2">
        <label>To</label>
        <input type="date" class="form-control" [(ngModel)]="filters.to" name="to">
      </div>
      <div class="form-group col-md-3">
        <label>Supplier</label>
        <app-supplier-search placeholder="Any supplier\u2026" (selected)="onSupplierSelected($event)"></app-supplier-search>
      </div>
      <div class="form-group col-md-2">
        <label>Status</label>
        <select class="form-control" [(ngModel)]="filters.status" name="status">
          <option value="">Any</option>
          @for (status of statuses; track status) {
            <option [value]="status">{{ status }}</option>
          }
        </select>
      </div>
      <div class="form-group col-md-2">
        <label>Keyword</label>
        <input type="text" class="form-control" [(ngModel)]="filters.keyword" name="keyword" placeholder="Notes\u2026">
      </div>
      <div class="form-group col-md-1">
        <button type="button" class="btn btn-primary btn-block" [disabled]="loading" (click)="search()">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>

    @if (error) {
      <div class="alert alert-danger">{{ error }}</div>
    }

    @if (loading) {
      <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>
    } @else if (searched && results.length === 0) {
      <p class="text-muted mb-0">No deliveries match your search.</p>
    } @else if (results.length > 0) {
      <table class="table table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Scheduled</th>
            <th>Status</th>
            <th>Timing</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          @for (delivery of results; track delivery.id) {
            <tr>
              <td>{{ delivery.supplierName }}</td>
              <td>{{ delivery.scheduledDate | date: 'short' }}</td>
              <td><span class="badge" [class]="statusBadge(delivery.status)">{{ delivery.status }}</span></td>
              <td>
                @if (isPast(delivery)) {
                  <span class="badge badge-light">Past</span>
                } @else {
                  <span class="badge badge-info">Upcoming</span>
                }
              </td>
              <td>{{ delivery.notes || '\u2014' }}</td>
            </tr>
          }
        </tbody>
      </table>
    }
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeliverySearchComponent, { className: "DeliverySearchComponent", filePath: "app/pages/deliveries/delivery-search.component.ts", lineNumber: 14 });
})();

// src/app/pages/deliveries/delivery-calendar.component.ts
var _c0 = ["calendar"];
function DeliveryCalendarComponent_Conditional_16_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function DeliveryCalendarComponent_Conditional_16_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r3 = ctx.$implicit;
    \u0275\u0275property("value", status_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(status_r3);
  }
}
function DeliveryCalendarComponent_Conditional_16_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 24);
  }
}
function DeliveryCalendarComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275listener("click", function DeliveryCalendarComponent_Conditional_16_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementStart(1, "div", 13);
    \u0275\u0275listener("click", function DeliveryCalendarComponent_Conditional_16_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 14)(3, "h3", 3);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 15);
    \u0275\u0275listener("click", function DeliveryCalendarComponent_Conditional_16_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "\xD7");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 4);
    \u0275\u0275conditionalCreate(9, DeliveryCalendarComponent_Conditional_16_Conditional_9_Template, 2, 1, "div", 16);
    \u0275\u0275elementStart(10, "div", 17)(11, "label");
    \u0275\u0275text(12, "Scheduled Date/Time");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function DeliveryCalendarComponent_Conditional_16_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editModel.scheduledDate, $event) || (ctx_r1.editModel.scheduledDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 17)(15, "label");
    \u0275\u0275text(16, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DeliveryCalendarComponent_Conditional_16_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editModel.status, $event) || (ctx_r1.editModel.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(18, DeliveryCalendarComponent_Conditional_16_For_19_Template, 2, 2, "option", 20, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 17)(21, "label");
    \u0275\u0275text(22, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "textarea", 21);
    \u0275\u0275twoWayListener("ngModelChange", function DeliveryCalendarComponent_Conditional_16_Template_textarea_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.editModel.notes, $event) || (ctx_r1.editModel.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 22)(25, "button", 23);
    \u0275\u0275listener("click", function DeliveryCalendarComponent_Conditional_16_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveDelivery());
    });
    \u0275\u0275conditionalCreate(26, DeliveryCalendarComponent_Conditional_16_Conditional_26_Template, 1, 0, "span", 24);
    \u0275\u0275text(27, " Save ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 25);
    \u0275\u0275listener("click", function DeliveryCalendarComponent_Conditional_16_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteDelivery());
    });
    \u0275\u0275text(29, "Delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 26);
    \u0275\u0275listener("click", function DeliveryCalendarComponent_Conditional_16_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(31, "Close");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedDelivery.supplierName);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.error ? 9 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editModel.scheduledDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editModel.status);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.statuses);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editModel.notes);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving ? 26 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving);
  }
}
var STATUS_COLORS = {
  Scheduled: "#007bff",
  Completed: "#28a745",
  Cancelled: "#6c757d",
  Delayed: "#fd7e14"
};
var DeliveryCalendarComponent = class _DeliveryCalendarComponent {
  deliveryService = inject(DeliveryService);
  calendarRef;
  selectedDelivery = null;
  editModel = {
    scheduledDate: "",
    status: "Scheduled",
    notes: ""
  };
  saving = false;
  error = "";
  statuses = ["Scheduled", "Completed", "Cancelled", "Delayed"];
  calendarOptions = {
    plugins: [index, index2],
    initialView: "dayGridMonth",
    height: "auto",
    headerToolbar: { left: "prev,next today", center: "title", right: "dayGridMonth" },
    events: (info, successCallback, failureCallback) => {
      this.deliveryService.calendar(info.startStr, info.endStr).subscribe({
        next: (deliveries) => successCallback(deliveries.map((d) => this.toEvent(d))),
        error: (err) => failureCallback(err)
      });
    },
    eventClick: (arg) => this.onEventClick(arg)
  };
  toEvent(delivery) {
    return {
      id: delivery.id,
      title: delivery.supplierName,
      start: delivery.scheduledDate,
      color: STATUS_COLORS[delivery.status],
      extendedProps: { delivery }
    };
  }
  onEventClick(arg) {
    const delivery = arg.event.extendedProps["delivery"];
    this.selectedDelivery = delivery;
    this.editModel = {
      scheduledDate: delivery.scheduledDate,
      status: delivery.status,
      notes: delivery.notes
    };
    this.error = "";
  }
  closeModal() {
    this.selectedDelivery = null;
  }
  saveDelivery() {
    if (!this.selectedDelivery)
      return;
    this.saving = true;
    this.error = "";
    const data = {
      supplierId: this.selectedDelivery.supplierId,
      scheduledDate: this.editModel.scheduledDate,
      status: this.editModel.status,
      invoiceId: this.selectedDelivery.invoiceId,
      notes: this.editModel.notes
    };
    this.deliveryService.update(this.selectedDelivery.id, data).subscribe({
      next: () => {
        this.saving = false;
        this.selectedDelivery = null;
        this.calendarRef?.getApi().refetchEvents();
      },
      error: (err) => {
        this.error = err.error?.message ?? "Failed to update delivery.";
        this.saving = false;
      }
    });
  }
  deleteDelivery() {
    if (!this.selectedDelivery)
      return;
    if (!confirm("Delete this delivery?"))
      return;
    this.saving = true;
    this.deliveryService.delete(this.selectedDelivery.id).subscribe({
      next: () => {
        this.saving = false;
        this.selectedDelivery = null;
        this.calendarRef?.getApi().refetchEvents();
      },
      error: () => {
        this.saving = false;
        alert("Failed to delete delivery.");
      }
    });
  }
  static \u0275fac = function DeliveryCalendarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeliveryCalendarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeliveryCalendarComponent, selectors: [["app-delivery-calendar"]], viewQuery: function DeliveryCalendarComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.calendarRef = _t.first);
    }
  }, decls: 17, vars: 2, consts: [["calendar", ""], [1, "card"], [1, "card-header"], [1, "card-title"], [1, "card-body"], [1, "mb-2", "small"], [1, "badge", 2, "background", "#007bff", "color", "#fff"], [1, "badge", 2, "background", "#28a745", "color", "#fff"], [1, "badge", 2, "background", "#6c757d", "color", "#fff"], [1, "badge", 2, "background", "#fd7e14", "color", "#fff"], [3, "options"], [1, "position-fixed", "d-flex", "align-items-center", "justify-content-center", 2, "top", "0", "left", "0", "right", "0", "bottom", "0", "background", "rgba(0,0,0,0.5)", "z-index", "1100"], [1, "position-fixed", "d-flex", "align-items-center", "justify-content-center", 2, "top", "0", "left", "0", "right", "0", "bottom", "0", "background", "rgba(0,0,0,0.5)", "z-index", "1100", 3, "click"], [1, "card", 2, "width", "420px", "max-width", "92vw", 3, "click"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], ["type", "button", 1, "close", 3, "click"], [1, "alert", "alert-danger"], [1, "form-group"], ["type", "datetime-local", "name", "modalScheduledDate", 1, "form-control", 3, "ngModelChange", "ngModel"], ["name", "modalStatus", 1, "form-control", 3, "ngModelChange", "ngModel"], [3, "value"], ["name", "modalNotes", "rows", "3", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "d-flex", "gap-2"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [1, "spinner-border", "spinner-border-sm", "mr-1"], ["type", "button", 1, "btn", "btn-danger", "ml-2", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-secondary", "ml-2", 3, "click"]], template: function DeliveryCalendarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h3", 3);
      \u0275\u0275text(3, "Delivery Calendar");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "span", 6);
      \u0275\u0275text(7, "Scheduled");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 7);
      \u0275\u0275text(9, "Completed");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 8);
      \u0275\u0275text(11, "Cancelled");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span", 9);
      \u0275\u0275text(13, "Delayed");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(14, "full-calendar", 10, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(16, DeliveryCalendarComponent_Conditional_16_Template, 32, 8, "div", 11);
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275property("options", ctx.calendarOptions);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selectedDelivery ? 16 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, FullCalendarModule, FullCalendarComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeliveryCalendarComponent, [{
    type: Component,
    args: [{ selector: "app-delivery-calendar", standalone: true, imports: [FormsModule, FullCalendarModule], template: '<div class="card">\n  <div class="card-header">\n    <h3 class="card-title">Delivery Calendar</h3>\n  </div>\n  <div class="card-body">\n    <div class="mb-2 small">\n      <span class="badge" style="background:#007bff;color:#fff;">Scheduled</span>\n      <span class="badge" style="background:#28a745;color:#fff;">Completed</span>\n      <span class="badge" style="background:#6c757d;color:#fff;">Cancelled</span>\n      <span class="badge" style="background:#fd7e14;color:#fff;">Delayed</span>\n    </div>\n    <full-calendar #calendar [options]="calendarOptions"></full-calendar>\n  </div>\n</div>\n\n@if (selectedDelivery) {\n  <div class="position-fixed d-flex align-items-center justify-content-center"\n       style="top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:1100;"\n       (click)="closeModal()">\n    <div class="card" style="width: 420px; max-width: 92vw;" (click)="$event.stopPropagation()">\n      <div class="card-header d-flex justify-content-between align-items-center">\n        <h3 class="card-title">{{ selectedDelivery.supplierName }}</h3>\n        <button type="button" class="close" (click)="closeModal()"><span>&times;</span></button>\n      </div>\n      <div class="card-body">\n        @if (error) {\n          <div class="alert alert-danger">{{ error }}</div>\n        }\n        <div class="form-group">\n          <label>Scheduled Date/Time</label>\n          <input type="datetime-local" class="form-control" [(ngModel)]="editModel.scheduledDate" name="modalScheduledDate">\n        </div>\n        <div class="form-group">\n          <label>Status</label>\n          <select class="form-control" [(ngModel)]="editModel.status" name="modalStatus">\n            @for (status of statuses; track status) {\n              <option [value]="status">{{ status }}</option>\n            }\n          </select>\n        </div>\n        <div class="form-group">\n          <label>Notes</label>\n          <textarea class="form-control" [(ngModel)]="editModel.notes" name="modalNotes" rows="3"></textarea>\n        </div>\n        <div class="d-flex gap-2">\n          <button type="button" class="btn btn-primary" [disabled]="saving" (click)="saveDelivery()">\n            @if (saving) { <span class="spinner-border spinner-border-sm mr-1"></span> }\n            Save\n          </button>\n          <button type="button" class="btn btn-danger ml-2" [disabled]="saving" (click)="deleteDelivery()">Delete</button>\n          <button type="button" class="btn btn-secondary ml-2" (click)="closeModal()">Close</button>\n        </div>\n      </div>\n    </div>\n  </div>\n}\n' }]
  }], null, { calendarRef: [{
    type: ViewChild,
    args: ["calendar"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeliveryCalendarComponent, { className: "DeliveryCalendarComponent", filePath: "app/pages/deliveries/delivery-calendar.component.ts", lineNumber: 22 });
})();

// src/app/pages/deliveries/deliveries.component.ts
function DeliveriesComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-delivery-search");
  }
}
function DeliveriesComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-delivery-calendar");
  }
}
var DeliveriesComponent = class _DeliveriesComponent {
  view = "search";
  static \u0275fac = function DeliveriesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeliveriesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeliveriesComponent, selectors: [["app-deliveries"]], decls: 10, vars: 9, consts: [[1, "mb-3"], ["role", "group", 1, "btn-group"], ["type", "button", 1, "btn", 3, "click"], [1, "fas", "fa-search", "mr-1"], [1, "fas", "fa-calendar", "mr-1"]], template: function DeliveriesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function DeliveriesComponent_Template_button_click_2_listener() {
        return ctx.view = "search";
      });
      \u0275\u0275element(3, "i", 3);
      \u0275\u0275text(4, " Search ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 2);
      \u0275\u0275listener("click", function DeliveriesComponent_Template_button_click_5_listener() {
        return ctx.view = "calendar";
      });
      \u0275\u0275element(6, "i", 4);
      \u0275\u0275text(7, " Calendar ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(8, DeliveriesComponent_Conditional_8_Template, 1, 0, "app-delivery-search")(9, DeliveriesComponent_Conditional_9_Template, 1, 0, "app-delivery-calendar");
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275classProp("btn-primary", ctx.view === "search")("btn-outline-primary", ctx.view !== "search");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("btn-primary", ctx.view === "calendar")("btn-outline-primary", ctx.view !== "calendar");
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.view === "search" ? 8 : 9);
    }
  }, dependencies: [DeliverySearchComponent, DeliveryCalendarComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeliveriesComponent, [{
    type: Component,
    args: [{ selector: "app-deliveries", standalone: true, imports: [DeliverySearchComponent, DeliveryCalendarComponent], template: `<div class="mb-3">
  <div class="btn-group" role="group">
    <button type="button" class="btn" [class.btn-primary]="view === 'search'" [class.btn-outline-primary]="view !== 'search'" (click)="view = 'search'">
      <i class="fas fa-search mr-1"></i> Search
    </button>
    <button type="button" class="btn" [class.btn-primary]="view === 'calendar'" [class.btn-outline-primary]="view !== 'calendar'" (click)="view = 'calendar'">
      <i class="fas fa-calendar mr-1"></i> Calendar
    </button>
  </div>
</div>

@if (view === 'search') {
  <app-delivery-search></app-delivery-search>
} @else {
  <app-delivery-calendar></app-delivery-calendar>
}
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeliveriesComponent, { className: "DeliveriesComponent", filePath: "app/pages/deliveries/deliveries.component.ts", lineNumber: 11 });
})();
export {
  DeliveriesComponent
};
//# sourceMappingURL=chunk-3O2IK6ML.js.map

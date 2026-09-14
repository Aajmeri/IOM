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
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-TZCII4RM.js";
import "./chunk-FIKR27S7.js";
import {
  Component,
  DatePipe,
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

// src/app/pages/deliveries/delivery-schedule.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DeliveryScheduleComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function DeliveryScheduleComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 15);
  }
}
function DeliveryScheduleComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "span", 20);
    \u0275\u0275elementEnd();
  }
}
function DeliveryScheduleComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.loadError);
  }
}
function DeliveryScheduleComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, "No upcoming deliveries scheduled.");
    \u0275\u0275elementEnd();
  }
}
function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_4_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.editModel.scheduledDate, $event) || (ctx_r1.editModel.scheduledDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editModel.scheduledDate);
  }
}
function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const delivery_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, delivery_r4.scheduledDate, "short"), " ");
  }
}
function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_7_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.editModel.notes, $event) || (ctx_r1.editModel.notes = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editModel.notes);
  }
}
function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const delivery_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", delivery_r4.notes || "\u2014", " ");
  }
}
function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const delivery_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveEdit(delivery_r4));
    });
    \u0275\u0275element(1, "i", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 27);
    \u0275\u0275listener("click", function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_10_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelEdit());
    });
    \u0275\u0275element(3, "i", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.savingEdit);
  }
}
function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const delivery_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startEdit(delivery_r4));
    });
    \u0275\u0275element(1, "i", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 31);
    \u0275\u0275listener("click", function DeliveryScheduleComponent_Conditional_38_For_13_Conditional_11_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r7);
      const delivery_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.remove(delivery_r4));
    });
    \u0275\u0275element(3, "i", 32);
    \u0275\u0275elementEnd();
  }
}
function DeliveryScheduleComponent_Conditional_38_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275conditionalCreate(4, DeliveryScheduleComponent_Conditional_38_For_13_Conditional_4_Template, 1, 1, "input", 21)(5, DeliveryScheduleComponent_Conditional_38_For_13_Conditional_5_Template, 2, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275conditionalCreate(7, DeliveryScheduleComponent_Conditional_38_For_13_Conditional_7_Template, 1, 1, "input", 22)(8, DeliveryScheduleComponent_Conditional_38_For_13_Conditional_8_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275conditionalCreate(10, DeliveryScheduleComponent_Conditional_38_For_13_Conditional_10_Template, 4, 1)(11, DeliveryScheduleComponent_Conditional_38_For_13_Conditional_11_Template, 4, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const delivery_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(delivery_r4.supplierName);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.editingId === delivery_r4.id ? 4 : 5);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.editingId === delivery_r4.id ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.editingId === delivery_r4.id ? 10 : 11);
  }
}
function DeliveryScheduleComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 19)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Supplier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Scheduled");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Notes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275repeaterCreate(12, DeliveryScheduleComponent_Conditional_38_For_13_Template, 12, 4, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275repeater(ctx_r1.upcoming);
  }
}
var DeliveryScheduleComponent = class _DeliveryScheduleComponent {
  model = { supplierId: "", scheduledDate: "", status: "Scheduled", invoiceId: null, notes: "" };
  saving = false;
  error = "";
  upcoming = [];
  loading = true;
  loadError = "";
  editingId = null;
  editModel = { scheduledDate: "", notes: "" };
  savingEdit = false;
  deliveryService = inject(DeliveryService);
  ngOnInit() {
    this.loadUpcoming();
  }
  loadUpcoming() {
    this.loading = true;
    const from = (/* @__PURE__ */ new Date()).toISOString();
    this.deliveryService.search({ from, status: "Scheduled" }).subscribe({
      next: (deliveries) => {
        this.upcoming = deliveries.sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
        this.loading = false;
      },
      error: () => {
        this.loadError = "Failed to load upcoming deliveries.";
        this.loading = false;
      }
    });
  }
  onSupplierSelected(supplier) {
    this.model.supplierId = supplier?.id ?? "";
  }
  submit() {
    this.error = "";
    if (!this.model.supplierId) {
      this.error = "Please select a supplier.";
      return;
    }
    if (!this.model.scheduledDate) {
      this.error = "Please choose a scheduled date/time.";
      return;
    }
    this.saving = true;
    this.deliveryService.create(this.model).subscribe({
      next: () => {
        this.saving = false;
        this.model = { supplierId: "", scheduledDate: "", status: "Scheduled", invoiceId: null, notes: "" };
        this.loadUpcoming();
      },
      error: (err) => {
        this.error = err.error?.message ?? "Failed to schedule delivery.";
        this.saving = false;
      }
    });
  }
  startEdit(delivery) {
    this.editingId = delivery.id;
    this.editModel = { scheduledDate: delivery.scheduledDate, notes: delivery.notes };
  }
  cancelEdit() {
    this.editingId = null;
  }
  saveEdit(delivery) {
    this.savingEdit = true;
    const data = {
      supplierId: delivery.supplierId,
      scheduledDate: this.editModel.scheduledDate,
      status: delivery.status,
      invoiceId: delivery.invoiceId,
      notes: this.editModel.notes
    };
    this.deliveryService.update(delivery.id, data).subscribe({
      next: () => {
        this.savingEdit = false;
        this.editingId = null;
        this.loadUpcoming();
      },
      error: () => {
        this.savingEdit = false;
        alert("Failed to update delivery.");
      }
    });
  }
  remove(delivery) {
    if (!confirm("Cancel/remove this scheduled delivery?"))
      return;
    this.deliveryService.delete(delivery.id).subscribe({
      next: () => this.loadUpcoming(),
      error: () => alert("Failed to remove delivery.")
    });
  }
  static \u0275fac = function DeliveryScheduleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeliveryScheduleComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeliveryScheduleComponent, selectors: [["app-delivery-schedule"]], decls: 39, vars: 7, consts: [["f", "ngForm"], [1, "row"], [1, "col-md-5"], [1, "card"], [1, "card-header"], [1, "card-title"], [1, "card-body"], [1, "alert", "alert-danger"], [3, "ngSubmit"], [1, "form-group"], [1, "text-danger"], ["placeholder", "Search supplier by name\u2026", 3, "selected", "required"], ["type", "datetime-local", "name", "scheduledDate", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["name", "notes", "rows", "3", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "mr-1"], [1, "col-md-7"], [1, "text-center", "py-3"], [1, "text-muted", "mb-0"], [1, "table", "table-sm", "table-bordered", "table-striped"], [1, "spinner-border", "text-primary"], ["type", "datetime-local", "name", "editScheduledDate", 1, "form-control", "form-control-sm", 3, "ngModel"], ["type", "text", "name", "editNotes", 1, "form-control", "form-control-sm", 3, "ngModel"], ["type", "datetime-local", "name", "editScheduledDate", 1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "editNotes", 1, "form-control", "form-control-sm", 3, "ngModelChange", "ngModel"], [1, "btn", "btn-success", "btn-xs", 3, "click", "disabled"], [1, "fas", "fa-check"], [1, "btn", "btn-secondary", "btn-xs", "ml-1", 3, "click"], [1, "fas", "fa-times"], [1, "btn", "btn-warning", "btn-xs", 3, "click"], [1, "fas", "fa-edit"], [1, "btn", "btn-danger", "btn-xs", "ml-1", 3, "click"], [1, "fas", "fa-trash"]], template: function DeliveryScheduleComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h3", 5);
      \u0275\u0275text(5, "Schedule Shipping");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 6);
      \u0275\u0275conditionalCreate(7, DeliveryScheduleComponent_Conditional_7_Template, 2, 1, "div", 7);
      \u0275\u0275elementStart(8, "form", 8, 0);
      \u0275\u0275listener("ngSubmit", function DeliveryScheduleComponent_Template_form_ngSubmit_8_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(10, "div", 9)(11, "label");
      \u0275\u0275text(12, "Supplier ");
      \u0275\u0275elementStart(13, "span", 10);
      \u0275\u0275text(14, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "app-supplier-search", 11);
      \u0275\u0275listener("selected", function DeliveryScheduleComponent_Template_app_supplier_search_selected_15_listener($event) {
        return ctx.onSupplierSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 9)(17, "label");
      \u0275\u0275text(18, "Scheduled Date/Time ");
      \u0275\u0275elementStart(19, "span", 10);
      \u0275\u0275text(20, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function DeliveryScheduleComponent_Template_input_ngModelChange_21_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.model.scheduledDate, $event) || (ctx.model.scheduledDate = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 9)(23, "label");
      \u0275\u0275text(24, "Notes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "textarea", 13);
      \u0275\u0275twoWayListener("ngModelChange", function DeliveryScheduleComponent_Template_textarea_ngModelChange_25_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.model.notes, $event) || (ctx.model.notes = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "button", 14);
      \u0275\u0275conditionalCreate(27, DeliveryScheduleComponent_Conditional_27_Template, 1, 0, "span", 15);
      \u0275\u0275text(28, " Schedule Delivery ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(29, "div", 16)(30, "div", 3)(31, "div", 4)(32, "h3", 5);
      \u0275\u0275text(33, "Upcoming Scheduled Deliveries");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 6);
      \u0275\u0275conditionalCreate(35, DeliveryScheduleComponent_Conditional_35_Template, 2, 0, "div", 17)(36, DeliveryScheduleComponent_Conditional_36_Template, 2, 1, "div", 7)(37, DeliveryScheduleComponent_Conditional_37_Template, 2, 0, "p", 18)(38, DeliveryScheduleComponent_Conditional_38_Template, 14, 0, "table", 19);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.error ? 7 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275property("required", true);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.scheduledDate);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.model.notes);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.saving || !ctx.model.supplierId);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.saving ? 27 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.loading ? 35 : ctx.loadError ? 36 : ctx.upcoming.length === 0 ? 37 : 38);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, SupplierSearchComponent, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeliveryScheduleComponent, [{
    type: Component,
    args: [{ selector: "app-delivery-schedule", standalone: true, imports: [FormsModule, SupplierSearchComponent, DatePipe], template: `<div class="row">
  <div class="col-md-5">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Schedule Shipping</h3>
      </div>
      <div class="card-body">
        @if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        }
        <form (ngSubmit)="submit()" #f="ngForm">
          <div class="form-group">
            <label>Supplier <span class="text-danger">*</span></label>
            <app-supplier-search
              placeholder="Search supplier by name\u2026"
              [required]="true"
              (selected)="onSupplierSelected($event)">
            </app-supplier-search>
          </div>
          <div class="form-group">
            <label>Scheduled Date/Time <span class="text-danger">*</span></label>
            <input type="datetime-local" class="form-control" [(ngModel)]="model.scheduledDate" name="scheduledDate" required>
          </div>
          <div class="form-group">
            <label>Notes</label>
            <textarea class="form-control" [(ngModel)]="model.notes" name="notes" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="saving || !model.supplierId">
            @if (saving) { <span class="spinner-border spinner-border-sm mr-1"></span> }
            Schedule Delivery
          </button>
        </form>
      </div>
    </div>
  </div>

  <div class="col-md-7">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Upcoming Scheduled Deliveries</h3>
      </div>
      <div class="card-body">
        @if (loading) {
          <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>
        } @else if (loadError) {
          <div class="alert alert-danger">{{ loadError }}</div>
        } @else if (upcoming.length === 0) {
          <p class="text-muted mb-0">No upcoming deliveries scheduled.</p>
        } @else {
          <table class="table table-sm table-bordered table-striped">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Scheduled</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (delivery of upcoming; track delivery.id) {
                <tr>
                  <td>{{ delivery.supplierName }}</td>
                  <td>
                    @if (editingId === delivery.id) {
                      <input type="datetime-local" class="form-control form-control-sm" [(ngModel)]="editModel.scheduledDate" name="editScheduledDate">
                    } @else {
                      {{ delivery.scheduledDate | date: 'short' }}
                    }
                  </td>
                  <td>
                    @if (editingId === delivery.id) {
                      <input type="text" class="form-control form-control-sm" [(ngModel)]="editModel.notes" name="editNotes">
                    } @else {
                      {{ delivery.notes || '\u2014' }}
                    }
                  </td>
                  <td>
                    @if (editingId === delivery.id) {
                      <button class="btn btn-success btn-xs" [disabled]="savingEdit" (click)="saveEdit(delivery)">
                        <i class="fas fa-check"></i>
                      </button>
                      <button class="btn btn-secondary btn-xs ml-1" (click)="cancelEdit()">
                        <i class="fas fa-times"></i>
                      </button>
                    } @else {
                      <button class="btn btn-warning btn-xs" (click)="startEdit(delivery)">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn-danger btn-xs ml-1" (click)="remove(delivery)">
                        <i class="fas fa-trash"></i>
                      </button>
                    }
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeliveryScheduleComponent, { className: "DeliveryScheduleComponent", filePath: "app/pages/deliveries/delivery-schedule.component.ts", lineNumber: 14 });
})();
export {
  DeliveryScheduleComponent
};
//# sourceMappingURL=chunk-TCX22QOF.js.map

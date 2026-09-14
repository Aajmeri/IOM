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
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-RBSBLNYF.js";
import {
  SupplierService
} from "./chunk-FIKR27S7.js";
import {
  Component,
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
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2HB4LNL5.js";

// src/app/pages/suppliers/supplier-form.component.ts
function SupplierFormComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "span", 8);
    \u0275\u0275elementEnd();
  }
}
function SupplierFormComponent_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function SupplierFormComponent_Conditional_8_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 15);
  }
}
function SupplierFormComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, SupplierFormComponent_Conditional_8_Conditional_0_Template, 2, 1, "div", 9);
    \u0275\u0275elementStart(1, "form", 10, 0);
    \u0275\u0275listener("ngSubmit", function SupplierFormComponent_Conditional_8_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275elementStart(3, "div", 11)(4, "label");
    \u0275\u0275text(5, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function SupplierFormComponent_Conditional_8_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.model.name, $event) || (ctx_r1.model.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 13)(8, "button", 14);
    \u0275\u0275conditionalCreate(9, SupplierFormComponent_Conditional_8_Conditional_9_Template, 1, 0, "span", 15);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 16);
    \u0275\u0275text(12, "Cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const f_r3 = \u0275\u0275reference(2);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.error ? 0 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.model.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving || f_r3.invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEdit ? "Update" : "Create", " ");
  }
}
var SupplierFormComponent = class _SupplierFormComponent {
  isEdit = false;
  supplierId = "";
  model = { name: "" };
  error = "";
  loading = false;
  saving = false;
  route = inject(ActivatedRoute);
  router = inject(Router);
  supplierService = inject(SupplierService);
  ngOnInit() {
    this.supplierId = this.route.snapshot.params["id"];
    this.isEdit = !!this.supplierId;
    if (this.isEdit) {
      this.loading = true;
      this.supplierService.getById(this.supplierId).subscribe({
        next: (s) => {
          this.model = { name: s.name };
          this.loading = false;
        },
        error: () => {
          this.error = "Supplier not found.";
          this.loading = false;
        }
      });
    }
  }
  submit() {
    this.error = "";
    this.saving = true;
    const onSuccess = () => this.router.navigate(["/suppliers"]);
    const onError = (err) => {
      this.error = err.error?.message ?? "Failed to save supplier.";
      this.saving = false;
    };
    if (this.isEdit) {
      this.supplierService.update(this.supplierId, this.model).subscribe({ next: onSuccess, error: onError });
    } else {
      this.supplierService.create(this.model).subscribe({ next: onSuccess, error: onError });
    }
  }
  static \u0275fac = function SupplierFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupplierFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SupplierFormComponent, selectors: [["app-supplier-form"]], decls: 9, vars: 2, consts: [["f", "ngForm"], [1, "row", "justify-content-center"], [1, "col-md-6"], [1, "card"], [1, "card-header"], [1, "card-title"], [1, "card-body"], [1, "text-center", "py-3"], [1, "spinner-border", "text-primary"], [1, "alert", "alert-danger"], [3, "ngSubmit"], [1, "form-group"], ["type", "text", "name", "name", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "d-flex", "gap-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "mr-1"], ["routerLink", "/suppliers", 1, "btn", "btn-secondary", "ml-2"]], template: function SupplierFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h3", 5);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 6);
      \u0275\u0275conditionalCreate(7, SupplierFormComponent_Conditional_7_Template, 2, 0, "div", 7)(8, SupplierFormComponent_Conditional_8_Template, 13, 5);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.isEdit ? "Edit Supplier" : "New Supplier");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading ? 7 : 8);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SupplierFormComponent, [{
    type: Component,
    args: [{ selector: "app-supplier-form", standalone: true, imports: [FormsModule, RouterLink], template: `<div class="row justify-content-center">
  <div class="col-md-6">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">{{ isEdit ? 'Edit Supplier' : 'New Supplier' }}</h3>
      </div>
      <div class="card-body">
        @if (loading) {
          <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>
        } @else {
          @if (error) {
            <div class="alert alert-danger">{{ error }}</div>
          }
          <form (ngSubmit)="submit()" #f="ngForm">
            <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" [(ngModel)]="model.name" name="name" required>
            </div>
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary" [disabled]="saving || f.invalid">
                @if (saving) { <span class="spinner-border spinner-border-sm mr-1"></span> }
                {{ isEdit ? 'Update' : 'Create' }}
              </button>
              <a routerLink="/suppliers" class="btn btn-secondary ml-2">Cancel</a>
            </div>
          </form>
        }
      </div>
    </div>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SupplierFormComponent, { className: "SupplierFormComponent", filePath: "app/pages/suppliers/supplier-form.component.ts", lineNumber: 12 });
})();
export {
  SupplierFormComponent
};
//# sourceMappingURL=chunk-MLGVIN4F.js.map

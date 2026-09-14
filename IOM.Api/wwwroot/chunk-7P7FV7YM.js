import {
  SupplierSearchComponent
} from "./chunk-URSQEXCE.js";
import {
  ProductService
} from "./chunk-3DXSAL63.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-TZCII4RM.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-RBSBLNYF.js";
import "./chunk-FIKR27S7.js";
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2HB4LNL5.js";

// src/app/pages/products/product-form.component.ts
function ProductFormComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "span", 8);
    \u0275\u0275elementEnd();
  }
}
function ProductFormComponent_Conditional_8_Conditional_0_Template(rf, ctx) {
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
function ProductFormComponent_Conditional_8_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 26);
  }
}
function ProductFormComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, ProductFormComponent_Conditional_8_Conditional_0_Template, 2, 1, "div", 9);
    \u0275\u0275elementStart(1, "form", 10, 0);
    \u0275\u0275listener("ngSubmit", function ProductFormComponent_Conditional_8_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275elementStart(3, "div", 11)(4, "label");
    \u0275\u0275text(5, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function ProductFormComponent_Conditional_8_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.model.name, $event) || (ctx_r1.model.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 11)(8, "label");
    \u0275\u0275text(9, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "textarea", 13);
    \u0275\u0275twoWayListener("ngModelChange", function ProductFormComponent_Conditional_8_Template_textarea_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.model.description, $event) || (ctx_r1.model.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 14)(12, "div", 15)(13, "label");
    \u0275\u0275text(14, "Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function ProductFormComponent_Conditional_8_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.model.price, $event) || (ctx_r1.model.price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 15)(17, "label");
    \u0275\u0275text(18, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function ProductFormComponent_Conditional_8_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.model.quantity, $event) || (ctx_r1.model.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 14)(21, "div", 15)(22, "label");
    \u0275\u0275text(23, "Barcode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function ProductFormComponent_Conditional_8_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.model.barcode, $event) || (ctx_r1.model.barcode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 15)(26, "label");
    \u0275\u0275text(27, "Supplier ");
    \u0275\u0275elementStart(28, "span", 19);
    \u0275\u0275text(29, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "app-supplier-search", 20);
    \u0275\u0275listener("selected", function ProductFormComponent_Conditional_8_Template_app_supplier_search_selected_30_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSupplierSelected($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 11)(32, "div", 21)(33, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function ProductFormComponent_Conditional_8_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.model.visibility, $event) || (ctx_r1.model.visibility = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "label", 23);
    \u0275\u0275text(35, "Visible");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 24)(37, "button", 25);
    \u0275\u0275conditionalCreate(38, ProductFormComponent_Conditional_8_Conditional_38_Template, 1, 0, "span", 26);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "a", 27);
    \u0275\u0275text(41, "Cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.error ? 0 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.model.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.model.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.model.price);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.model.quantity);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.model.barcode);
    \u0275\u0275advance(6);
    \u0275\u0275property("initialSupplierId", ctx_r1.initialSupplierId)("initialSupplierName", ctx_r1.initialSupplierName)("required", true);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.model.visibility);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving || !ctx_r1.model.supplierId);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEdit ? "Update" : "Create", " ");
  }
}
var ProductFormComponent = class _ProductFormComponent {
  isEdit = false;
  productId = "";
  model = { name: "", description: "", price: 0, quantity: 0, visibility: true, barcode: null, supplierId: "" };
  initialSupplierId = null;
  initialSupplierName = null;
  error = "";
  loading = false;
  saving = false;
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  ngOnInit() {
    this.productId = this.route.snapshot.params["id"];
    this.isEdit = !!this.productId;
    if (this.isEdit) {
      this.loading = true;
      this.productService.getById(this.productId).subscribe({
        next: (p) => {
          this.model = {
            name: p.name,
            description: p.description,
            price: p.price,
            quantity: p.quantity,
            visibility: p.visibility ?? true,
            barcode: p.barcode ?? null,
            supplierId: p.supplierId ?? ""
          };
          this.initialSupplierId = p.supplierId ?? null;
          this.initialSupplierName = p.supplierName ?? null;
          this.loading = false;
        },
        error: () => {
          this.error = "Product not found.";
          this.loading = false;
        }
      });
    }
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
    this.saving = true;
    const onSuccess = () => this.router.navigate(["/products"]);
    const onError = (err) => {
      this.error = err.error?.message ?? "Failed to save product.";
      this.saving = false;
    };
    if (this.isEdit) {
      this.productService.update(this.productId, this.model).subscribe({ next: onSuccess, error: onError });
    } else {
      this.productService.create(this.model).subscribe({ next: onSuccess, error: onError });
    }
  }
  static \u0275fac = function ProductFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductFormComponent, selectors: [["app-product-form"]], decls: 9, vars: 2, consts: [["f", "ngForm"], [1, "row", "justify-content-center"], [1, "col-md-8"], [1, "card"], [1, "card-header"], [1, "card-title"], [1, "card-body"], [1, "text-center", "py-3"], [1, "spinner-border", "text-primary"], [1, "alert", "alert-danger"], [3, "ngSubmit"], [1, "form-group"], ["type", "text", "name", "name", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["name", "description", "rows", "3", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "form-row"], [1, "form-group", "col-md-6"], ["type", "number", "name", "price", "required", "", "min", "0", "step", "0.01", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "quantity", "required", "", "min", "0", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "barcode", "placeholder", "Optional", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "text-danger"], ["placeholder", "Search supplier by name\u2026", 3, "selected", "initialSupplierId", "initialSupplierName", "required"], [1, "custom-control", "custom-switch"], ["type", "checkbox", "id", "visibility", "name", "visibility", 1, "custom-control-input", 3, "ngModelChange", "ngModel"], ["for", "visibility", 1, "custom-control-label"], [1, "d-flex", "gap-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "mr-1"], ["routerLink", "/products", 1, "btn", "btn-secondary", "ml-2"]], template: function ProductFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h3", 5);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 6);
      \u0275\u0275conditionalCreate(7, ProductFormComponent_Conditional_7_Template, 2, 0, "div", 7)(8, ProductFormComponent_Conditional_8_Template, 42, 13);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.isEdit ? "Edit Product" : "New Product");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading ? 7 : 8);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, NgModel, NgForm, RouterLink, SupplierSearchComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductFormComponent, [{
    type: Component,
    args: [{ selector: "app-product-form", standalone: true, imports: [FormsModule, RouterLink, SupplierSearchComponent], template: `<div class="row justify-content-center">
  <div class="col-md-8">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">{{ isEdit ? 'Edit Product' : 'New Product' }}</h3>
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
            <div class="form-group">
              <label>Description</label>
              <textarea class="form-control" [(ngModel)]="model.description" name="description" rows="3"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Price</label>
                <input type="number" class="form-control" [(ngModel)]="model.price" name="price" required min="0" step="0.01">
              </div>
              <div class="form-group col-md-6">
                <label>Quantity</label>
                <input type="number" class="form-control" [(ngModel)]="model.quantity" name="quantity" required min="0">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Barcode</label>
                <input type="text" class="form-control" [(ngModel)]="model.barcode" name="barcode" placeholder="Optional">
              </div>
              <div class="form-group col-md-6">
                <label>Supplier <span class="text-danger">*</span></label>
                <app-supplier-search
                  [initialSupplierId]="initialSupplierId"
                  [initialSupplierName]="initialSupplierName"
                  placeholder="Search supplier by name\u2026"
                  [required]="true"
                  (selected)="onSupplierSelected($event)">
                </app-supplier-search>
              </div>
            </div>
            <div class="form-group">
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="visibility"
                       [(ngModel)]="model.visibility" name="visibility">
                <label class="custom-control-label" for="visibility">Visible</label>
              </div>
            </div>
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary" [disabled]="saving || !model.supplierId">
                @if (saving) { <span class="spinner-border spinner-border-sm mr-1"></span> }
                {{ isEdit ? 'Update' : 'Create' }}
              </button>
              <a routerLink="/products" class="btn btn-secondary ml-2">Cancel</a>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductFormComponent, { className: "ProductFormComponent", filePath: "app/pages/products/product-form.component.ts", lineNumber: 14 });
})();
export {
  ProductFormComponent
};
//# sourceMappingURL=chunk-7P7FV7YM.js.map

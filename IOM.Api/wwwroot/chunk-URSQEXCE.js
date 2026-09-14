import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  RequiredValidator
} from "./chunk-TZCII4RM.js";
import {
  SupplierService
} from "./chunk-FIKR27S7.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Subject,
  debounceTime,
  distinctUntilChanged,
  inject,
  setClassMetadata,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2HB4LNL5.js";

// src/app/components/supplier-search/supplier-search.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SupplierSearchComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 2);
    \u0275\u0275text(1, "Searching\u2026");
    \u0275\u0275elementEnd();
  }
}
function SupplierSearchComponent_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("mousedown", function SupplierSearchComponent_Conditional_3_For_2_Template_button_mousedown_0_listener($event) {
      const supplier_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.choose(supplier_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const supplier_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", supplier_r2.name, " ");
  }
}
function SupplierSearchComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275repeaterCreate(1, SupplierSearchComponent_Conditional_3_For_2_Template, 2, 1, "button", 5, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.results);
  }
}
function SupplierSearchComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "span", 7);
    \u0275\u0275text(2, "No suppliers found");
    \u0275\u0275elementEnd()();
  }
}
var SupplierSearchComponent = class _SupplierSearchComponent {
  initialSupplierId = null;
  initialSupplierName = null;
  placeholder = "Search suppliers\u2026";
  required = false;
  disabled = false;
  selected = new EventEmitter();
  query = "";
  results = [];
  showDropdown = false;
  searching = false;
  selectedSupplier = null;
  supplierService = inject(SupplierService);
  queryChanges = new Subject();
  sub;
  ngOnInit() {
    this.applyInitial();
    this.sub = this.queryChanges.pipe(debounceTime(300), distinctUntilChanged(), switchMap((q) => {
      if (!q || q.trim().length === 0) {
        this.searching = false;
        return [];
      }
      this.searching = true;
      return this.supplierService.search(q, 20);
    })).subscribe({
      next: (results) => {
        this.results = results;
        this.searching = false;
        this.showDropdown = true;
      },
      error: () => {
        this.results = [];
        this.searching = false;
      }
    });
  }
  ngOnChanges(changes) {
    if (changes["initialSupplierId"] || changes["initialSupplierName"]) {
      this.applyInitial();
    }
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  onInput() {
    this.selectedSupplier = null;
    this.selected.emit(null);
    this.queryChanges.next(this.query);
  }
  onFocus() {
    if (this.results.length > 0) {
      this.showDropdown = true;
    }
  }
  onBlur() {
    setTimeout(() => this.showDropdown = false, 200);
  }
  choose(supplier) {
    this.selectedSupplier = supplier;
    this.query = supplier.name;
    this.results = [];
    this.showDropdown = false;
    this.selected.emit(supplier);
  }
  applyInitial() {
    if (this.initialSupplierId && this.initialSupplierName) {
      this.selectedSupplier = { id: this.initialSupplierId, name: this.initialSupplierName, active: true };
      this.query = this.initialSupplierName;
    }
  }
  static \u0275fac = function SupplierSearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupplierSearchComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SupplierSearchComponent, selectors: [["app-supplier-search"]], inputs: { initialSupplierId: "initialSupplierId", initialSupplierName: "initialSupplierName", placeholder: "placeholder", required: "required", disabled: "disabled" }, outputs: { selected: "selected" }, features: [\u0275\u0275NgOnChangesFeature], decls: 5, vars: 7, consts: [[1, "supplier-search", "position-relative"], ["type", "text", "name", "supplierSearch", "autocomplete", "off", 1, "form-control", 3, "ngModelChange", "input", "focus", "blur", "ngModel", "placeholder", "required", "disabled"], [1, "form-text", "text-muted"], [1, "list-group", "position-absolute", "w-100", "shadow-sm", 2, "z-index", "1050", "max-height", "220px", "overflow-y", "auto"], [1, "list-group", "position-absolute", "w-100", "shadow-sm", 2, "z-index", "1050"], ["type", "button", 1, "list-group-item", "list-group-item-action"], ["type", "button", 1, "list-group-item", "list-group-item-action", 3, "mousedown"], [1, "list-group-item", "text-muted"]], template: function SupplierSearchComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "input", 1);
      \u0275\u0275twoWayListener("ngModelChange", function SupplierSearchComponent_Template_input_ngModelChange_1_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.query, $event) || (ctx.query = $event);
        return $event;
      });
      \u0275\u0275listener("input", function SupplierSearchComponent_Template_input_input_1_listener() {
        return ctx.onInput();
      })("focus", function SupplierSearchComponent_Template_input_focus_1_listener() {
        return ctx.onFocus();
      })("blur", function SupplierSearchComponent_Template_input_blur_1_listener() {
        return ctx.onBlur();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(2, SupplierSearchComponent_Conditional_2_Template, 2, 0, "small", 2);
      \u0275\u0275conditionalCreate(3, SupplierSearchComponent_Conditional_3_Template, 3, 0, "div", 3);
      \u0275\u0275conditionalCreate(4, SupplierSearchComponent_Conditional_4_Template, 3, 0, "div", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.query);
      \u0275\u0275property("placeholder", ctx.placeholder)("required", ctx.required)("disabled", ctx.disabled);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.searching ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDropdown && ctx.results.length > 0 ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDropdown && !ctx.searching && ctx.results.length === 0 && ctx.query.trim().length > 0 ? 4 : -1);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, RequiredValidator, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SupplierSearchComponent, [{
    type: Component,
    args: [{ selector: "app-supplier-search", standalone: true, imports: [FormsModule], template: '<div class="supplier-search position-relative">\n  <input\n    type="text"\n    class="form-control"\n    [(ngModel)]="query"\n    name="supplierSearch"\n    [placeholder]="placeholder"\n    [required]="required"\n    [disabled]="disabled"\n    (input)="onInput()"\n    (focus)="onFocus()"\n    (blur)="onBlur()"\n    autocomplete="off">\n  @if (searching) {\n    <small class="form-text text-muted">Searching\u2026</small>\n  }\n  @if (showDropdown && results.length > 0) {\n    <div class="list-group position-absolute w-100 shadow-sm" style="z-index: 1050; max-height: 220px; overflow-y: auto;">\n      @for (supplier of results; track supplier.id) {\n        <button\n          type="button"\n          class="list-group-item list-group-item-action"\n          (mousedown)="$event.preventDefault(); choose(supplier)">\n          {{ supplier.name }}\n        </button>\n      }\n    </div>\n  }\n  @if (showDropdown && !searching && results.length === 0 && query.trim().length > 0) {\n    <div class="list-group position-absolute w-100 shadow-sm" style="z-index: 1050;">\n      <span class="list-group-item text-muted">No suppliers found</span>\n    </div>\n  }\n</div>\n' }]
  }], null, { initialSupplierId: [{
    type: Input
  }], initialSupplierName: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], required: [{
    type: Input
  }], disabled: [{
    type: Input
  }], selected: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SupplierSearchComponent, { className: "SupplierSearchComponent", filePath: "app/components/supplier-search/supplier-search.component.ts", lineNumber: 13 });
})();

export {
  SupplierSearchComponent
};
//# sourceMappingURL=chunk-URSQEXCE.js.map

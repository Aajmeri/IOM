import {
  SupplierSearchComponent
} from "./chunk-URSQEXCE.js";
import {
  ProductService
} from "./chunk-3DXSAL63.js";
import {
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
import "./chunk-FIKR27S7.js";
import {
  Component,
  DatePipe,
  HostListener,
  HttpClient,
  Injectable,
  ViewChild,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-2HB4LNL5.js";

// src/app/services/item.service.ts
var ItemService = class _ItemService {
  http;
  base = "/api/items";
  constructor(http) {
    this.http = http;
  }
  getByProduct(productId) {
    return this.http.get(`${this.base}/by-product/${productId}`);
  }
  getById(id) {
    return this.http.get(`${this.base}/${id}`);
  }
  create(data) {
    return this.http.post(this.base, data);
  }
  update(id, data) {
    return this.http.put(`${this.base}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${this.base}/${id}`);
  }
  static \u0275fac = function ItemService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ItemService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ItemService, factory: _ItemService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ItemService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/pages/scan-in/scan-in.component.ts
var _c0 = ["scanInput"];
var _forTrack0 = ($index, $item) => $item.time;
function ScanInComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 19);
    \u0275\u0275listener("click", function ScanInComponent_Conditional_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.warning = "");
    });
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\xD7");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.warning, " ");
  }
}
function ScanInComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.error);
  }
}
function ScanInComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 14);
    \u0275\u0275element(1, "span", 20);
    \u0275\u0275text(2, "Looking up\u2026");
    \u0275\u0275elementEnd();
  }
}
function ScanInComponent_Conditional_16_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 20);
  }
}
function ScanInComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "h5", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 23);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "form", 24, 1);
    \u0275\u0275listener("ngSubmit", function ScanInComponent_Conditional_16_Template_form_ngSubmit_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveItem());
    });
    \u0275\u0275elementStart(7, "div", 25)(8, "div", 26)(9, "label");
    \u0275\u0275text(10, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function ScanInComponent_Conditional_16_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.itemModel.quantity, $event) || (ctx_r2.itemModel.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 26)(13, "label");
    \u0275\u0275text(14, "Expiration Date (optional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function ScanInComponent_Conditional_16_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.itemModel.expirationDate, $event) || (ctx_r2.itemModel.expirationDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 29)(17, "button", 30);
    \u0275\u0275conditionalCreate(18, ScanInComponent_Conditional_16_Conditional_18_Template, 1, 0, "span", 20);
    \u0275\u0275text(19, " Receive Item ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 31);
    \u0275\u0275listener("click", function ScanInComponent_Conditional_16_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancel());
    });
    \u0275\u0275text(21, "Cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const itemForm_r5 = \u0275\u0275reference(6);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.foundProduct.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Barcode: ", ctx_r2.lastScannedBarcode);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.itemModel.quantity);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.itemModel.expirationDate);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.savingItem || itemForm_r5.invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.savingItem ? 18 : -1);
  }
}
function ScanInComponent_Conditional_17_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 20);
  }
}
function ScanInComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1, " Product not found for barcode ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " \u2014 create it? ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 24, 2);
    \u0275\u0275listener("ngSubmit", function ScanInComponent_Conditional_17_Template_form_ngSubmit_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.createProduct());
    });
    \u0275\u0275elementStart(7, "div", 12)(8, "label");
    \u0275\u0275text(9, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function ScanInComponent_Conditional_17_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newProduct.name, $event) || (ctx_r2.newProduct.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 12)(12, "label");
    \u0275\u0275text(13, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "textarea", 34);
    \u0275\u0275twoWayListener("ngModelChange", function ScanInComponent_Conditional_17_Template_textarea_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newProduct.description, $event) || (ctx_r2.newProduct.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 25)(16, "div", 26)(17, "label");
    \u0275\u0275text(18, "Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 35);
    \u0275\u0275twoWayListener("ngModelChange", function ScanInComponent_Conditional_17_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newProduct.price, $event) || (ctx_r2.newProduct.price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 26)(21, "label");
    \u0275\u0275text(22, "Supplier ");
    \u0275\u0275elementStart(23, "span", 36);
    \u0275\u0275text(24, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "app-supplier-search", 37);
    \u0275\u0275listener("selected", function ScanInComponent_Conditional_17_Template_app_supplier_search_selected_25_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSupplierSelected($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 29)(27, "button", 30);
    \u0275\u0275conditionalCreate(28, ScanInComponent_Conditional_17_Conditional_28_Template, 1, 0, "span", 20);
    \u0275\u0275text(29, " Create Product & Continue ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 31);
    \u0275\u0275listener("click", function ScanInComponent_Conditional_17_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancel());
    });
    \u0275\u0275text(31, "Cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const newProductForm_r7 = \u0275\u0275reference(6);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.lastScannedBarcode);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newProduct.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newProduct.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newProduct.price);
    \u0275\u0275advance(6);
    \u0275\u0275property("required", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.creatingProduct || newProductForm_r7.invalid || !ctx_r2.newProduct.supplierId);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.creatingProduct ? 28 : -1);
  }
}
function ScanInComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "No items scanned yet.");
    \u0275\u0275elementEnd();
  }
}
function ScanInComponent_Conditional_25_For_11_Template(rf, ctx) {
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
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r8.productName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r8.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 3, entry_r8.time, "shortTime"));
  }
}
function ScanInComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 18)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Product");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Qty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Time");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275repeaterCreate(10, ScanInComponent_Conditional_25_For_11_Template, 8, 6, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r2.sessionLog);
  }
}
var ScanInComponent = class _ScanInComponent {
  state = "scan";
  scanValue = "";
  lastScannedBarcode = "";
  looking = false;
  error = "";
  warning = "";
  foundProduct = null;
  // Quick-create (product not found) model
  newProduct = { name: "", description: "", price: 0, quantity: 0, visibility: true, barcode: null, supplierId: "" };
  creatingProduct = false;
  // Item receiving model
  itemModel = { quantity: 1, expirationDate: null };
  savingItem = false;
  sessionLog = [];
  scanInputRef;
  productService = inject(ProductService);
  itemService = inject(ItemService);
  // Rudimentary hardware-scanner detection: scanners emit characters much faster than a human types.
  keyBuffer = "";
  lastKeyTime = 0;
  ngOnInit() {
    this.focusScanInput();
  }
  onDocumentKeydown(event) {
    if (this.state === "scan" && event.target === this.scanInputRef?.nativeElement) {
      return;
    }
    const now = Date.now();
    const elapsed = now - this.lastKeyTime;
    this.lastKeyTime = now;
    if (elapsed > 75) {
      this.keyBuffer = "";
    }
    if (event.key === "Enter") {
      const looksLikeScan = this.keyBuffer.length >= 3;
      this.keyBuffer = "";
      if (looksLikeScan && this.state !== "scan") {
        event.preventDefault();
        event.stopPropagation();
        this.warning = "A barcode was scanned but the current entry must be finished or cancelled first.";
      }
    } else if (event.key.length === 1) {
      this.keyBuffer += event.key;
    }
  }
  onScanSubmit() {
    const code = this.scanValue.trim();
    if (!code || this.state !== "scan") {
      return;
    }
    this.warning = "";
    this.error = "";
    this.looking = true;
    this.lastScannedBarcode = code;
    this.productService.getByBarcode(code).subscribe({
      next: (product) => {
        this.foundProduct = product;
        this.itemModel = { quantity: 1, expirationDate: null };
        this.state = "found";
        this.looking = false;
      },
      error: (err) => {
        this.looking = false;
        if (err.status === 404) {
          this.newProduct = { name: "", description: "", price: 0, quantity: 0, visibility: true, barcode: code, supplierId: "" };
          this.state = "notfound";
        } else {
          this.error = "Failed to look up barcode. Please try again.";
        }
      }
    });
  }
  onSupplierSelected(supplier) {
    this.newProduct.supplierId = supplier?.id ?? "";
  }
  createProduct() {
    this.error = "";
    if (!this.newProduct.supplierId) {
      this.error = "Please select a supplier.";
      return;
    }
    this.creatingProduct = true;
    this.productService.create(this.newProduct).subscribe({
      next: (product) => {
        this.foundProduct = product;
        this.itemModel = { quantity: 1, expirationDate: null };
        this.state = "found";
        this.creatingProduct = false;
      },
      error: (err) => {
        this.error = err.error?.message ?? "Failed to create product.";
        this.creatingProduct = false;
      }
    });
  }
  saveItem() {
    if (!this.foundProduct)
      return;
    this.error = "";
    this.savingItem = true;
    const data = {
      productId: this.foundProduct.id,
      quantity: this.itemModel.quantity,
      expirationDate: this.itemModel.expirationDate || null
    };
    this.itemService.create(data).subscribe({
      next: () => {
        this.sessionLog.unshift({
          productName: this.foundProduct.name,
          quantity: this.itemModel.quantity,
          time: /* @__PURE__ */ new Date()
        });
        this.savingItem = false;
        this.resetToScan();
      },
      error: (err) => {
        this.error = err.error?.message ?? "Failed to record item.";
        this.savingItem = false;
      }
    });
  }
  cancel() {
    this.resetToScan();
  }
  resetToScan() {
    this.state = "scan";
    this.scanValue = "";
    this.foundProduct = null;
    this.error = "";
    this.warning = "";
    this.focusScanInput();
  }
  focusScanInput() {
    setTimeout(() => this.scanInputRef?.nativeElement.focus(), 0);
  }
  static \u0275fac = function ScanInComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScanInComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScanInComponent, selectors: [["app-scan-in"]], viewQuery: function ScanInComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.scanInputRef = _t.first);
    }
  }, hostBindings: function ScanInComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function ScanInComponent_keydown_HostBindingHandler($event) {
        return ctx.onDocumentKeydown($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 26, vars: 9, consts: [["scanInput", ""], ["itemForm", "ngForm"], ["newProductForm", "ngForm"], [1, "row"], [1, "col-md-7"], [1, "card"], [1, "card-header"], [1, "card-title"], [1, "fas", "fa-barcode", "mr-2"], [1, "card-body"], [1, "alert", "alert-warning", "alert-dismissible"], [1, "alert", "alert-danger"], [1, "form-group"], ["type", "text", "name", "scanValue", "placeholder", "Focus here and scan a barcode\u2026", "autocomplete", "off", 1, "form-control", "form-control-lg", 3, "ngModelChange", "keyup.enter", "ngModel", "disabled", "readonly"], [1, "form-text", "text-muted"], [1, "col-md-5"], [1, "card-body", "p-0", 2, "max-height", "480px", "overflow-y", "auto"], [1, "text-muted", "p-3", "mb-0"], [1, "table", "table-sm", "table-striped", "mb-0"], ["type", "button", 1, "close", 3, "click"], [1, "spinner-border", "spinner-border-sm", "mr-1"], [1, "border", "rounded", "p-3", "mb-3", "bg-light"], [1, "mb-1"], [1, "text-muted", "small"], [3, "ngSubmit"], [1, "form-row"], [1, "form-group", "col-md-6"], ["type", "number", "name", "quantity", "min", "1", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "date", "name", "expirationDate", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "d-flex", "gap-2"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-secondary", "ml-2", 3, "click"], [1, "alert", "alert-info"], ["type", "text", "name", "name", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["name", "description", "rows", "2", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "price", "min", "0", "step", "0.01", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "text-danger"], ["placeholder", "Search supplier by name\u2026", 3, "selected", "required"]], template: function ScanInComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div", 5)(3, "div", 6)(4, "h3", 7);
      \u0275\u0275element(5, "i", 8);
      \u0275\u0275text(6, "Scan In");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 9);
      \u0275\u0275conditionalCreate(8, ScanInComponent_Conditional_8_Template, 5, 1, "div", 10);
      \u0275\u0275conditionalCreate(9, ScanInComponent_Conditional_9_Template, 2, 1, "div", 11);
      \u0275\u0275elementStart(10, "div", 12)(11, "label");
      \u0275\u0275text(12, "Scan Barcode");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "input", 13, 0);
      \u0275\u0275twoWayListener("ngModelChange", function ScanInComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.scanValue, $event) || (ctx.scanValue = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("keyup.enter", function ScanInComponent_Template_input_keyup_enter_13_listener() {
        return ctx.onScanSubmit();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(15, ScanInComponent_Conditional_15_Template, 3, 0, "small", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, ScanInComponent_Conditional_16_Template, 22, 6);
      \u0275\u0275conditionalCreate(17, ScanInComponent_Conditional_17_Template, 32, 7);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "div", 15)(19, "div", 5)(20, "div", 6)(21, "h3", 7);
      \u0275\u0275text(22, "Scanned This Session");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 16);
      \u0275\u0275conditionalCreate(24, ScanInComponent_Conditional_24_Template, 2, 0, "p", 17)(25, ScanInComponent_Conditional_25_Template, 12, 0, "table", 18);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.warning ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error ? 9 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.scanValue);
      \u0275\u0275property("disabled", ctx.state !== "scan" || ctx.looking)("readonly", ctx.state !== "scan");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.looking ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.state === "found" && ctx.foundProduct ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.state === "notfound" ? 17 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.sessionLog.length === 0 ? 24 : 25);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinValidator, NgModel, NgForm, SupplierSearchComponent, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScanInComponent, [{
    type: Component,
    args: [{ selector: "app-scan-in", standalone: true, imports: [FormsModule, SupplierSearchComponent, DatePipe], template: `<div class="row">
  <div class="col-md-7">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-barcode mr-2"></i>Scan In</h3>
      </div>
      <div class="card-body">
        @if (warning) {
          <div class="alert alert-warning alert-dismissible">
            {{ warning }}
            <button type="button" class="close" (click)="warning = ''"><span>&times;</span></button>
          </div>
        }
        @if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        }

        <div class="form-group">
          <label>Scan Barcode</label>
          <input
            #scanInput
            type="text"
            class="form-control form-control-lg"
            [(ngModel)]="scanValue"
            name="scanValue"
            [disabled]="state !== 'scan' || looking"
            [readonly]="state !== 'scan'"
            (keyup.enter)="onScanSubmit()"
            placeholder="Focus here and scan a barcode\u2026"
            autocomplete="off">
          @if (looking) {
            <small class="form-text text-muted"><span class="spinner-border spinner-border-sm mr-1"></span>Looking up\u2026</small>
          }
        </div>

        @if (state === 'found' && foundProduct) {
          <div class="border rounded p-3 mb-3 bg-light">
            <h5 class="mb-1">{{ foundProduct.name }}</h5>
            <div class="text-muted small">Barcode: {{ lastScannedBarcode }}</div>
          </div>
          <form (ngSubmit)="saveItem()" #itemForm="ngForm">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Quantity</label>
                <input type="number" class="form-control" [(ngModel)]="itemModel.quantity" name="quantity" min="1" required>
              </div>
              <div class="form-group col-md-6">
                <label>Expiration Date (optional)</label>
                <input type="date" class="form-control" [(ngModel)]="itemModel.expirationDate" name="expirationDate">
              </div>
            </div>
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary" [disabled]="savingItem || itemForm.invalid">
                @if (savingItem) { <span class="spinner-border spinner-border-sm mr-1"></span> }
                Receive Item
              </button>
              <button type="button" class="btn btn-secondary ml-2" (click)="cancel()">Cancel</button>
            </div>
          </form>
        }

        @if (state === 'notfound') {
          <div class="alert alert-info">
            Product not found for barcode <strong>{{ lastScannedBarcode }}</strong> \u2014 create it?
          </div>
          <form (ngSubmit)="createProduct()" #newProductForm="ngForm">
            <div class="form-group">
              <label>Name</label>
              <input type="text" class="form-control" [(ngModel)]="newProduct.name" name="name" required>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea class="form-control" [(ngModel)]="newProduct.description" name="description" rows="2"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Price</label>
                <input type="number" class="form-control" [(ngModel)]="newProduct.price" name="price" min="0" step="0.01">
              </div>
              <div class="form-group col-md-6">
                <label>Supplier <span class="text-danger">*</span></label>
                <app-supplier-search
                  placeholder="Search supplier by name\u2026"
                  [required]="true"
                  (selected)="onSupplierSelected($event)">
                </app-supplier-search>
              </div>
            </div>
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary" [disabled]="creatingProduct || newProductForm.invalid || !newProduct.supplierId">
                @if (creatingProduct) { <span class="spinner-border spinner-border-sm mr-1"></span> }
                Create Product &amp; Continue
              </button>
              <button type="button" class="btn btn-secondary ml-2" (click)="cancel()">Cancel</button>
            </div>
          </form>
        }
      </div>
    </div>
  </div>

  <div class="col-md-5">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Scanned This Session</h3>
      </div>
      <div class="card-body p-0" style="max-height: 480px; overflow-y: auto;">
        @if (sessionLog.length === 0) {
          <p class="text-muted p-3 mb-0">No items scanned yet.</p>
        } @else {
          <table class="table table-sm table-striped mb-0">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              @for (entry of sessionLog; track entry.time) {
                <tr>
                  <td>{{ entry.productName }}</td>
                  <td>{{ entry.quantity }}</td>
                  <td>{{ entry.time | date: 'shortTime' }}</td>
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
  }], null, { scanInputRef: [{
    type: ViewChild,
    args: ["scanInput"]
  }], onDocumentKeydown: [{
    type: HostListener,
    args: ["document:keydown", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScanInComponent, { className: "ScanInComponent", filePath: "app/pages/scan-in/scan-in.component.ts", lineNumber: 24 });
})();
export {
  ScanInComponent
};
//# sourceMappingURL=chunk-NLO5L6AU.js.map

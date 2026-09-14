import {
  SupplierSearchComponent
} from "./chunk-URSQEXCE.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-TZCII4RM.js";
import "./chunk-FIKR27S7.js";
import {
  Component,
  CurrencyPipe,
  DatePipe,
  HttpClient,
  Injectable,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2HB4LNL5.js";

// src/app/services/invoice.service.ts
var InvoiceService = class _InvoiceService {
  http;
  base = "/api/invoices";
  constructor(http) {
    this.http = http;
  }
  getAll() {
    return this.http.get(this.base);
  }
  getById(id) {
    return this.http.get(`${this.base}/${id}`);
  }
  upload(file, supplierId, invoiceNumber) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("supplierId", supplierId);
    if (invoiceNumber) {
      formData.append("invoiceNumber", invoiceNumber);
    }
    return this.http.post(`${this.base}/upload`, formData);
  }
  delete(id) {
    return this.http.delete(`${this.base}/${id}`);
  }
  static \u0275fac = function InvoiceService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InvoiceService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InvoiceService, factory: _InvoiceService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InvoiceService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/pages/shipping-orders/shipping-orders.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.itemId;
function ShippingOrdersComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.uploadError);
  }
}
function ShippingOrdersComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
}
function ShippingOrdersComponent_Conditional_35_Conditional_7_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rowError_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(rowError_r2);
  }
}
function ShippingOrdersComponent_Conditional_35_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "strong");
    \u0275\u0275text(2, "Row errors:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul", 21);
    \u0275\u0275repeaterCreate(4, ShippingOrdersComponent_Conditional_35_Conditional_7_For_5_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.uploadResult.rowErrors);
  }
}
function ShippingOrdersComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, ShippingOrdersComponent_Conditional_35_Conditional_7_Template, 6, 0, "div", 20);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Products created: ", ctx_r0.uploadResult.productsCreated);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Products matched: ", ctx_r0.uploadResult.productsMatched);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Items created: ", ctx_r0.uploadResult.itemsCreated);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.uploadResult.rowErrors.length > 0 ? 7 : -1);
  }
}
function ShippingOrdersComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "span", 22);
    \u0275\u0275elementEnd();
  }
}
function ShippingOrdersComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function ShippingOrdersComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "No shipping orders yet.");
    \u0275\u0275elementEnd();
  }
}
function ShippingOrdersComponent_Conditional_45_For_17_Conditional_19_For_13_Template(rf, ctx) {
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
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.productName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.expirationDate ? \u0275\u0275pipeBind2(7, 3, item_r5.expirationDate, "shortDate") : "\u2014");
  }
}
function ShippingOrdersComponent_Conditional_45_For_17_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 27)(2, "table", 28)(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "Product");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Expiration");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275repeaterCreate(12, ShippingOrdersComponent_Conditional_45_For_17_Conditional_19_For_13_Template, 8, 6, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const invoice_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(12);
    \u0275\u0275repeater(invoice_r4.items);
  }
}
function ShippingOrdersComponent_Conditional_45_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "button", 23);
    \u0275\u0275listener("click", function ShippingOrdersComponent_Conditional_45_For_17_Template_button_click_14_listener() {
      const invoice_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.toggleExpand(invoice_r4));
    });
    \u0275\u0275element(15, "i", 24);
    \u0275\u0275text(16, " View ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 25);
    \u0275\u0275listener("click", function ShippingOrdersComponent_Conditional_45_For_17_Template_button_click_17_listener() {
      const invoice_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.delete(invoice_r4.id));
    });
    \u0275\u0275element(18, "i", 26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(19, ShippingOrdersComponent_Conditional_45_For_17_Conditional_19_Template, 14, 0, "tr");
  }
  if (rf & 2) {
    const invoice_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(invoice_r4.number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(invoice_r4.supplierName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(invoice_r4.items.length);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 10, invoice_r4.total));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 12, invoice_r4.createdDate, "shortDate"));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("fa-chevron-down", ctx_r0.expandedInvoiceId !== invoice_r4.id)("fa-chevron-up", ctx_r0.expandedInvoiceId === invoice_r4.id);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.expandedInvoiceId === invoice_r4.id ? 19 : -1);
  }
}
function ShippingOrdersComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 18)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Supplier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Items");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Created");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, ShippingOrdersComponent_Conditional_45_For_17_Template, 20, 15, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r0.invoices);
  }
}
var ShippingOrdersComponent = class _ShippingOrdersComponent {
  invoices = [];
  loading = true;
  error = "";
  selectedFile = null;
  supplierId = "";
  invoiceNumber = "";
  uploading = false;
  uploadError = "";
  uploadResult = null;
  expandedInvoiceId = null;
  invoiceService = inject(InvoiceService);
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.invoiceService.getAll().subscribe({
      next: (invoices) => {
        this.invoices = invoices;
        this.loading = false;
      },
      error: () => {
        this.error = "Failed to load shipping orders.";
        this.loading = false;
      }
    });
  }
  onSupplierSelected(supplier) {
    this.supplierId = supplier?.id ?? "";
  }
  onFileChange(event) {
    const input = event.target;
    this.selectedFile = input.files && input.files.length > 0 ? input.files[0] : null;
  }
  upload() {
    if (!this.selectedFile || !this.supplierId) {
      this.uploadError = "Please choose a CSV file and select a supplier.";
      return;
    }
    this.uploadError = "";
    this.uploadResult = null;
    this.uploading = true;
    this.invoiceService.upload(this.selectedFile, this.supplierId, this.invoiceNumber || void 0).subscribe({
      next: (result) => {
        this.uploadResult = result;
        this.uploading = false;
        this.selectedFile = null;
        this.invoiceNumber = "";
        this.load();
      },
      error: (err) => {
        this.uploadError = err.error?.message ?? "Failed to upload shipping order.";
        this.uploading = false;
      }
    });
  }
  toggleExpand(invoice) {
    this.expandedInvoiceId = this.expandedInvoiceId === invoice.id ? null : invoice.id;
  }
  delete(id) {
    if (!confirm("Delete this shipping order?"))
      return;
    this.invoiceService.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert("Failed to delete shipping order.")
    });
  }
  static \u0275fac = function ShippingOrdersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShippingOrdersComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShippingOrdersComponent, selectors: [["app-shipping-orders"]], decls: 46, vars: 7, consts: [[1, "row"], [1, "col-md-5"], [1, "card"], [1, "card-header"], [1, "card-title"], [1, "card-body"], [1, "text-muted", "small"], [1, "alert", "alert-danger"], [1, "form-group"], [1, "text-danger"], ["placeholder", "Search supplier by name\u2026", 3, "selected", "required"], ["type", "text", "name", "invoiceNumber", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "file", "accept", ".csv", 1, "form-control-file", 3, "change"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [1, "spinner-border", "spinner-border-sm", "mr-1"], [1, "col-md-7"], [1, "text-center", "py-3"], [1, "text-muted", "mb-0"], [1, "table", "table-bordered", "table-striped"], [1, "alert", "alert-success", "mt-3", "mb-0"], [1, "alert", "alert-warning", "mt-2", "mb-0"], [1, "mb-0"], [1, "spinner-border", "text-primary"], [1, "btn", "btn-secondary", "btn-xs", 3, "click"], [1, "fas"], [1, "btn", "btn-danger", "btn-xs", "ml-1", 3, "click"], [1, "fas", "fa-trash"], ["colspan", "6", 1, "bg-light"], [1, "table", "table-sm", "mb-0"]], template: function ShippingOrdersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4);
      \u0275\u0275text(5, "Upload Shipping Order");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "p", 6);
      \u0275\u0275text(8, " CSV columns: ");
      \u0275\u0275elementStart(9, "code");
      \u0275\u0275text(10, "Barcode,ProductName,Quantity,ExpirationDate,Price");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, ". Barcode is required on every row. ProductName is required only when the barcode doesn't match an existing product. Quantity must be a positive whole number. ExpirationDate is optional (format ");
      \u0275\u0275elementStart(12, "code");
      \u0275\u0275text(13, "yyyy-MM-dd");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, "). Price is optional and only used when creating a new product. ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(15, ShippingOrdersComponent_Conditional_15_Template, 2, 1, "div", 7);
      \u0275\u0275elementStart(16, "div", 8)(17, "label");
      \u0275\u0275text(18, "Supplier ");
      \u0275\u0275elementStart(19, "span", 9);
      \u0275\u0275text(20, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "app-supplier-search", 10);
      \u0275\u0275listener("selected", function ShippingOrdersComponent_Template_app_supplier_search_selected_21_listener($event) {
        return ctx.onSupplierSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 8)(23, "label");
      \u0275\u0275text(24, "Invoice Number (optional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function ShippingOrdersComponent_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.invoiceNumber, $event) || (ctx.invoiceNumber = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 8)(27, "label");
      \u0275\u0275text(28, "CSV File ");
      \u0275\u0275elementStart(29, "span", 9);
      \u0275\u0275text(30, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "input", 12);
      \u0275\u0275listener("change", function ShippingOrdersComponent_Template_input_change_31_listener($event) {
        return ctx.onFileChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "button", 13);
      \u0275\u0275listener("click", function ShippingOrdersComponent_Template_button_click_32_listener() {
        return ctx.upload();
      });
      \u0275\u0275conditionalCreate(33, ShippingOrdersComponent_Conditional_33_Template, 1, 0, "span", 14);
      \u0275\u0275text(34, " Upload ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(35, ShippingOrdersComponent_Conditional_35_Template, 8, 4);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "div", 15)(37, "div", 2)(38, "div", 3)(39, "h3", 4);
      \u0275\u0275text(40, "Shipping Orders");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "div", 5);
      \u0275\u0275conditionalCreate(42, ShippingOrdersComponent_Conditional_42_Template, 2, 0, "div", 16)(43, ShippingOrdersComponent_Conditional_43_Template, 2, 1, "div", 7)(44, ShippingOrdersComponent_Conditional_44_Template, 2, 0, "p", 17)(45, ShippingOrdersComponent_Conditional_45_Template, 18, 0, "table", 18);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(15);
      \u0275\u0275conditional(ctx.uploadError ? 15 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275property("required", true);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.invoiceNumber);
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", ctx.uploading || !ctx.selectedFile || !ctx.supplierId);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.uploading ? 33 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.uploadResult ? 35 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.loading ? 42 : ctx.error ? 43 : ctx.invoices.length === 0 ? 44 : 45);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, SupplierSearchComponent, CurrencyPipe, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShippingOrdersComponent, [{
    type: Component,
    args: [{ selector: "app-shipping-orders", standalone: true, imports: [FormsModule, SupplierSearchComponent, CurrencyPipe, DatePipe], template: `<div class="row">
  <div class="col-md-5">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Upload Shipping Order</h3>
      </div>
      <div class="card-body">
        <p class="text-muted small">
          CSV columns: <code>Barcode,ProductName,Quantity,ExpirationDate,Price</code>.
          Barcode is required on every row. ProductName is required only when the barcode doesn't
          match an existing product. Quantity must be a positive whole number.
          ExpirationDate is optional (format <code>yyyy-MM-dd</code>). Price is optional and only
          used when creating a new product.
        </p>

        @if (uploadError) {
          <div class="alert alert-danger">{{ uploadError }}</div>
        }

        <div class="form-group">
          <label>Supplier <span class="text-danger">*</span></label>
          <app-supplier-search
            placeholder="Search supplier by name\u2026"
            [required]="true"
            (selected)="onSupplierSelected($event)">
          </app-supplier-search>
        </div>

        <div class="form-group">
          <label>Invoice Number (optional)</label>
          <input type="text" class="form-control" [(ngModel)]="invoiceNumber" name="invoiceNumber">
        </div>

        <div class="form-group">
          <label>CSV File <span class="text-danger">*</span></label>
          <input type="file" class="form-control-file" accept=".csv" (change)="onFileChange($event)">
        </div>

        <button type="button" class="btn btn-primary" [disabled]="uploading || !selectedFile || !supplierId" (click)="upload()">
          @if (uploading) { <span class="spinner-border spinner-border-sm mr-1"></span> }
          Upload
        </button>

        @if (uploadResult) {
          <div class="alert alert-success mt-3 mb-0">
            <div>Products created: {{ uploadResult.productsCreated }}</div>
            <div>Products matched: {{ uploadResult.productsMatched }}</div>
            <div>Items created: {{ uploadResult.itemsCreated }}</div>
          </div>
          @if (uploadResult.rowErrors.length > 0) {
            <div class="alert alert-warning mt-2 mb-0">
              <strong>Row errors:</strong>
              <ul class="mb-0">
                @for (rowError of uploadResult.rowErrors; track rowError) {
                  <li>{{ rowError }}</li>
                }
              </ul>
            </div>
          }
        }
      </div>
    </div>
  </div>

  <div class="col-md-7">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Shipping Orders</h3>
      </div>
      <div class="card-body">
        @if (loading) {
          <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>
        } @else if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        } @else if (invoices.length === 0) {
          <p class="text-muted mb-0">No shipping orders yet.</p>
        } @else {
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Number</th>
                <th>Supplier</th>
                <th>Items</th>
                <th>Total</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (invoice of invoices; track invoice.id) {
                <tr>
                  <td>{{ invoice.number }}</td>
                  <td>{{ invoice.supplierName }}</td>
                  <td>{{ invoice.items.length }}</td>
                  <td>{{ invoice.total | currency }}</td>
                  <td>{{ invoice.createdDate | date: 'shortDate' }}</td>
                  <td>
                    <button class="btn btn-secondary btn-xs" (click)="toggleExpand(invoice)">
                      <i class="fas" [class.fa-chevron-down]="expandedInvoiceId !== invoice.id" [class.fa-chevron-up]="expandedInvoiceId === invoice.id"></i>
                      View
                    </button>
                    <button class="btn btn-danger btn-xs ml-1" (click)="delete(invoice.id)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
                @if (expandedInvoiceId === invoice.id) {
                  <tr>
                    <td colspan="6" class="bg-light">
                      <table class="table table-sm mb-0">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Expiration</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (item of invoice.items; track item.itemId) {
                            <tr>
                              <td>{{ item.productName }}</td>
                              <td>{{ item.quantity }}</td>
                              <td>{{ item.expirationDate ? (item.expirationDate | date: 'shortDate') : '\u2014' }}</td>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShippingOrdersComponent, { className: "ShippingOrdersComponent", filePath: "app/pages/shipping-orders/shipping-orders.component.ts", lineNumber: 14 });
})();
export {
  ShippingOrdersComponent
};
//# sourceMappingURL=chunk-DATABDO2.js.map

import {
  AuthService
} from "./chunk-JU3C6OAJ.js";
import {
  ProductService
} from "./chunk-3DXSAL63.js";
import {
  RouterLink
} from "./chunk-RBSBLNYF.js";
import {
  Component,
  CurrencyPipe,
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
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-2HB4LNL5.js";

// src/app/pages/products/products-list.component.ts
var _c0 = (a0) => ["/products/edit", a0];
var _forTrack0 = ($index, $item) => $item.id;
function ProductsListComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 5);
    \u0275\u0275element(1, "i", 10);
    \u0275\u0275text(2, " New Product ");
    \u0275\u0275elementEnd();
  }
}
function ProductsListComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "span", 11);
    \u0275\u0275elementEnd();
  }
}
function ProductsListComponent_Conditional_9_Template(rf, ctx) {
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
function ProductsListComponent_Conditional_10_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th");
    \u0275\u0275text(1, "Quantity");
    \u0275\u0275elementEnd();
  }
}
function ProductsListComponent_Conditional_10_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th");
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function ProductsListComponent_Conditional_10_For_19_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(product_r2.quantity);
  }
}
function ProductsListComponent_Conditional_10_For_19_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1, "Yes");
    \u0275\u0275elementEnd();
  }
}
function ProductsListComponent_Conditional_10_For_19_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1, "No");
    \u0275\u0275elementEnd();
  }
}
function ProductsListComponent_Conditional_10_For_19_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "a", 14);
    \u0275\u0275element(2, "i", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 16);
    \u0275\u0275listener("click", function ProductsListComponent_Conditional_10_For_19_Conditional_16_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const product_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.delete(product_r2.id));
    });
    \u0275\u0275element(4, "i", 17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const product_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c0, product_r2.id));
  }
}
function ProductsListComponent_Conditional_10_For_19_Template(rf, ctx) {
  if (rf & 1) {
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
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, ProductsListComponent_Conditional_10_For_19_Conditional_12_Template, 2, 1, "td");
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275conditionalCreate(14, ProductsListComponent_Conditional_10_For_19_Conditional_14_Template, 2, 0, "span", 12)(15, ProductsListComponent_Conditional_10_For_19_Conditional_15_Template, 2, 0, "span", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, ProductsListComponent_Conditional_10_For_19_Conditional_16_Template, 5, 3, "td");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r2.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r2.barcode || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r2.supplierName || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 8, product_r2.price));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r0.isClient ? 12 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(product_r2.visibility ? 14 : 15);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.canManage ? 16 : -1);
  }
}
function ProductsListComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 9)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Barcode");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Supplier");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Price");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, ProductsListComponent_Conditional_10_Conditional_13_Template, 2, 0, "th");
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Visible");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, ProductsListComponent_Conditional_10_Conditional_16_Template, 2, 0, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275repeaterCreate(18, ProductsListComponent_Conditional_10_For_19_Template, 17, 10, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275conditional(!ctx_r0.isClient ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.canManage ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.products);
  }
}
var ProductsListComponent = class _ProductsListComponent {
  products = [];
  loading = true;
  error = "";
  productService = inject(ProductService);
  auth = inject(AuthService);
  get canManage() {
    return this.auth.canManageProducts();
  }
  get isClient() {
    return this.auth.currentUser()?.role === "Client";
  }
  ngOnInit() {
    this.load();
  }
  ngAfterViewInit() {
    this.initDataTable();
  }
  load() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
        setTimeout(() => this.initDataTable(), 0);
      },
      error: () => {
        this.error = "Failed to load products.";
        this.loading = false;
      }
    });
  }
  delete(id) {
    if (!confirm("Delete this product?"))
      return;
    this.productService.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert("Failed to delete product.")
    });
  }
  initDataTable() {
    if (typeof $ === "undefined")
      return;
    const table = $("#productsTable");
    if (table.length && !$.fn.DataTable.isDataTable("#productsTable")) {
      table.DataTable({
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        responsive: true,
        language: { search: "_INPUT_", searchPlaceholder: "Search records" }
      });
    }
  }
  static \u0275fac = function ProductsListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductsListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductsListComponent, selectors: [["app-products-list"]], decls: 11, vars: 2, consts: [[1, "row"], [1, "col-12"], [1, "card"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "card-title"], ["routerLink", "/products/create", 1, "btn", "btn-primary", "btn-sm"], [1, "card-body"], [1, "text-center", "py-3"], [1, "alert", "alert-danger"], ["id", "productsTable", 1, "table", "table-bordered", "table-striped"], [1, "fas", "fa-plus", "mr-1"], [1, "spinner-border", "text-primary"], [1, "badge", "badge-success"], [1, "badge", "badge-secondary"], [1, "btn", "btn-warning", "btn-xs", 3, "routerLink"], [1, "fas", "fa-edit"], [1, "btn", "btn-danger", "btn-xs", "ml-1", 3, "click"], [1, "fas", "fa-trash"]], template: function ProductsListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4);
      \u0275\u0275text(5, "Products");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, ProductsListComponent_Conditional_6_Template, 3, 0, "a", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 6);
      \u0275\u0275conditionalCreate(8, ProductsListComponent_Conditional_8_Template, 2, 0, "div", 7)(9, ProductsListComponent_Conditional_9_Template, 2, 1, "div", 8)(10, ProductsListComponent_Conditional_10_Template, 20, 2, "table", 9);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.canManage ? 6 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading ? 8 : ctx.error ? 9 : 10);
    }
  }, dependencies: [RouterLink, CurrencyPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductsListComponent, [{
    type: Component,
    args: [{ selector: "app-products-list", standalone: true, imports: [RouterLink, CurrencyPipe], template: `<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h3 class="card-title">Products</h3>
        @if (canManage) {
          <a routerLink="/products/create" class="btn btn-primary btn-sm">
            <i class="fas fa-plus mr-1"></i> New Product
          </a>
        }
      </div>
      <div class="card-body">
        @if (loading) {
          <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>
        } @else if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        } @else {
          <table id="productsTable" class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Barcode</th>
                <th>Supplier</th>
                <th>Price</th>
                @if (!isClient) { <th>Quantity</th> }
                <th>Visible</th>
                @if (canManage) { <th>Actions</th> }
              </tr>
            </thead>
            <tbody>
              @for (product of products; track product.id) {
                <tr>
                  <td>{{ product.name }}</td>
                  <td>{{ product.description }}</td>
                  <td>{{ product.barcode || '\u2014' }}</td>
                  <td>{{ product.supplierName || '\u2014' }}</td>
                  <td>{{ product.price | currency }}</td>
                  @if (!isClient) { <td>{{ product.quantity }}</td> }
                  <td>
                    @if (product.visibility) {
                      <span class="badge badge-success">Yes</span>
                    } @else {
                      <span class="badge badge-secondary">No</span>
                    }
                  </td>
                  @if (canManage) {
                    <td>
                      <a [routerLink]="['/products/edit', product.id]" class="btn btn-warning btn-xs">
                        <i class="fas fa-edit"></i>
                      </a>
                      <button class="btn btn-danger btn-xs ml-1" (click)="delete(product.id)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  }
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductsListComponent, { className: "ProductsListComponent", filePath: "app/pages/products/products-list.component.ts", lineNumber: 15 });
})();
export {
  ProductsListComponent
};
//# sourceMappingURL=chunk-JBLDTT5W.js.map

import {
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
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-2HB4LNL5.js";

// src/app/pages/suppliers/suppliers-list.component.ts
var _c0 = (a0) => ["/suppliers/edit", a0];
var _forTrack0 = ($index, $item) => $item.id;
function SuppliersListComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "span", 11);
    \u0275\u0275elementEnd();
  }
}
function SuppliersListComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function SuppliersListComponent_Conditional_12_For_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1, "Yes");
    \u0275\u0275elementEnd();
  }
}
function SuppliersListComponent_Conditional_12_For_11_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1, "No");
    \u0275\u0275elementEnd();
  }
}
function SuppliersListComponent_Conditional_12_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275conditionalCreate(4, SuppliersListComponent_Conditional_12_For_11_Conditional_4_Template, 2, 0, "span", 12)(5, SuppliersListComponent_Conditional_12_For_11_Conditional_5_Template, 2, 0, "span", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "a", 14);
    \u0275\u0275element(8, "i", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 16);
    \u0275\u0275listener("click", function SuppliersListComponent_Conditional_12_For_11_Template_button_click_9_listener() {
      const supplier_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.delete(supplier_r3.id));
    });
    \u0275\u0275element(10, "i", 17);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const supplier_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(supplier_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(supplier_r3.active ? 4 : 5);
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(3, _c0, supplier_r3.id));
  }
}
function SuppliersListComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 10)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275repeaterCreate(10, SuppliersListComponent_Conditional_12_For_11_Template, 11, 5, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r0.suppliers);
  }
}
var SuppliersListComponent = class _SuppliersListComponent {
  suppliers = [];
  loading = true;
  error = "";
  supplierService = inject(SupplierService);
  ngOnInit() {
    this.load();
  }
  ngAfterViewInit() {
    this.initDataTable();
  }
  load() {
    this.loading = true;
    this.supplierService.getAll().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.loading = false;
        setTimeout(() => this.initDataTable(), 0);
      },
      error: () => {
        this.error = "Failed to load suppliers.";
        this.loading = false;
      }
    });
  }
  delete(id) {
    if (!confirm("Delete this supplier?"))
      return;
    this.supplierService.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert("Failed to delete supplier.")
    });
  }
  initDataTable() {
    if (typeof $ === "undefined")
      return;
    const table = $("#suppliersTable");
    if (table.length && !$.fn.DataTable.isDataTable("#suppliersTable")) {
      table.DataTable({
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        responsive: true,
        language: { search: "_INPUT_", searchPlaceholder: "Search records" }
      });
    }
  }
  static \u0275fac = function SuppliersListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SuppliersListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SuppliersListComponent, selectors: [["app-suppliers-list"]], decls: 13, vars: 1, consts: [[1, "row"], [1, "col-12"], [1, "card"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "card-title"], ["routerLink", "/suppliers/create", 1, "btn", "btn-primary", "btn-sm"], [1, "fas", "fa-plus", "mr-1"], [1, "card-body"], [1, "text-center", "py-3"], [1, "alert", "alert-danger"], ["id", "suppliersTable", 1, "table", "table-bordered", "table-striped"], [1, "spinner-border", "text-primary"], [1, "badge", "badge-success"], [1, "badge", "badge-secondary"], [1, "btn", "btn-warning", "btn-xs", 3, "routerLink"], [1, "fas", "fa-edit"], [1, "btn", "btn-danger", "btn-xs", "ml-1", 3, "click"], [1, "fas", "fa-trash"]], template: function SuppliersListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4);
      \u0275\u0275text(5, "Suppliers");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "a", 5);
      \u0275\u0275element(7, "i", 6);
      \u0275\u0275text(8, " New Supplier ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275conditionalCreate(10, SuppliersListComponent_Conditional_10_Template, 2, 0, "div", 8)(11, SuppliersListComponent_Conditional_11_Template, 2, 1, "div", 9)(12, SuppliersListComponent_Conditional_12_Template, 12, 0, "table", 10);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.loading ? 10 : ctx.error ? 11 : 12);
    }
  }, dependencies: [RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SuppliersListComponent, [{
    type: Component,
    args: [{ selector: "app-suppliers-list", standalone: true, imports: [RouterLink], template: `<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h3 class="card-title">Suppliers</h3>
        <a routerLink="/suppliers/create" class="btn btn-primary btn-sm">
          <i class="fas fa-plus mr-1"></i> New Supplier
        </a>
      </div>
      <div class="card-body">
        @if (loading) {
          <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>
        } @else if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        } @else {
          <table id="suppliersTable" class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (supplier of suppliers; track supplier.id) {
                <tr>
                  <td>{{ supplier.name }}</td>
                  <td>
                    @if (supplier.active) {
                      <span class="badge badge-success">Yes</span>
                    } @else {
                      <span class="badge badge-secondary">No</span>
                    }
                  </td>
                  <td>
                    <a [routerLink]="['/suppliers/edit', supplier.id]" class="btn btn-warning btn-xs">
                      <i class="fas fa-edit"></i>
                    </a>
                    <button class="btn btn-danger btn-xs ml-1" (click)="delete(supplier.id)">
                      <i class="fas fa-trash"></i>
                    </button>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SuppliersListComponent, { className: "SuppliersListComponent", filePath: "app/pages/suppliers/suppliers-list.component.ts", lineNumber: 13 });
})();
export {
  SuppliersListComponent
};
//# sourceMappingURL=chunk-RHGWUGCV.js.map

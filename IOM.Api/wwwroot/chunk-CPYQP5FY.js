import {
  RouterLink
} from "./chunk-RBSBLNYF.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-2HB4LNL5.js";

// src/app/pages/access-denied/access-denied.component.ts
var AccessDeniedComponent = class _AccessDeniedComponent {
  static \u0275fac = function AccessDeniedComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccessDeniedComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccessDeniedComponent, selectors: [["app-access-denied"]], decls: 13, vars: 0, consts: [[1, "row", "justify-content-center", "mt-5"], [1, "col-md-6", "text-center"], [1, "error-page"], [1, "headline", "text-danger"], [1, "error-content"], [1, "fas", "fa-exclamation-triangle", "text-danger"], ["routerLink", "/products", 1, "btn", "btn-primary"]], template: function AccessDeniedComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "403");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4)(6, "h3");
      \u0275\u0275element(7, "i", 5);
      \u0275\u0275text(8, " Access Denied");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p");
      \u0275\u0275text(10, "You do not have permission to view this page.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "a", 6);
      \u0275\u0275text(12, "Back to Products");
      \u0275\u0275elementEnd()()()()();
    }
  }, dependencies: [RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccessDeniedComponent, [{
    type: Component,
    args: [{
      selector: "app-access-denied",
      standalone: true,
      imports: [RouterLink],
      template: `
    <div class="row justify-content-center mt-5">
      <div class="col-md-6 text-center">
        <div class="error-page">
          <h2 class="headline text-danger">403</h2>
          <div class="error-content">
            <h3><i class="fas fa-exclamation-triangle text-danger"></i> Access Denied</h3>
            <p>You do not have permission to view this page.</p>
            <a routerLink="/products" class="btn btn-primary">Back to Products</a>
          </div>
        </div>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccessDeniedComponent, { className: "AccessDeniedComponent", filePath: "app/pages/access-denied/access-denied.component.ts", lineNumber: 23 });
})();
export {
  AccessDeniedComponent
};
//# sourceMappingURL=chunk-CPYQP5FY.js.map

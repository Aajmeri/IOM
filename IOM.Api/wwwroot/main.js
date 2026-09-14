import {
  BasketService
} from "./chunk-XWUJ5W22.js";
import {
  AuthService
} from "./chunk-JU3C6OAJ.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-RBSBLNYF.js";
import {
  Component,
  inject,
  provideBrowserGlobalErrorListeners,
  provideHttpClient,
  setClassMetadata,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-2HB4LNL5.js";

// src/app/guards/auth.guard.ts
var authGuard = () => {
  const auth = inject(AuthService);
  if (auth.isAuthenticated())
    return true;
  inject(Router).navigate(["/login"]);
  return false;
};

// src/app/guards/admin.guard.ts
var adminGuard = () => {
  const auth = inject(AuthService);
  if (auth.isAdmin())
    return true;
  inject(Router).navigate(["/access-denied"]);
  return false;
};

// src/app/guards/client.guard.ts
var clientGuard = () => {
  const auth = inject(AuthService);
  if (auth.isClient())
    return true;
  inject(Router).navigate(["/access-denied"]);
  return false;
};

// src/app/guards/staff.guard.ts
var staffGuard = () => {
  const auth = inject(AuthService);
  if (auth.canManageProducts())
    return true;
  const router = inject(Router);
  router.navigate([auth.isClient() ? "/shop" : "/access-denied"]);
  return false;
};

// src/app/layout/main-layout.component.ts
function MainLayoutComponent_Conditional_27_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.basket.count());
  }
}
function MainLayoutComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 3)(1, "a", 28);
    \u0275\u0275element(2, "i", 29);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Shop");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(5, "li", 3)(6, "a", 30);
    \u0275\u0275element(7, "i", 31);
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, " Basket ");
    \u0275\u0275conditionalCreate(10, MainLayoutComponent_Conditional_27_Conditional_10_Template, 2, 1, "span", 32);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "li", 3)(12, "a", 33);
    \u0275\u0275element(13, "i", 34);
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15, "My Orders");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275conditional(ctx_r0.basket.count() > 0 ? 10 : -1);
  }
}
function MainLayoutComponent_Conditional_28_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 3)(1, "a", 49);
    \u0275\u0275element(2, "i", 50);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Users");
    \u0275\u0275elementEnd()()();
  }
}
function MainLayoutComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 3)(1, "a", 35);
    \u0275\u0275element(2, "i", 36);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Products");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(5, "li", 3)(6, "a", 37);
    \u0275\u0275element(7, "i", 38);
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "Scan In");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(10, MainLayoutComponent_Conditional_28_Conditional_10_Template, 5, 0, "li", 3);
    \u0275\u0275elementStart(11, "li", 3)(12, "a", 39);
    \u0275\u0275element(13, "i", 40);
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15, "Suppliers");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "li", 3)(17, "a", 41);
    \u0275\u0275element(18, "i", 42);
    \u0275\u0275elementStart(19, "p");
    \u0275\u0275text(20, "Schedule Shipping");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "li", 3)(22, "a", 43);
    \u0275\u0275element(23, "i", 44);
    \u0275\u0275elementStart(24, "p");
    \u0275\u0275text(25, "Orders");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "li", 3)(27, "a", 45);
    \u0275\u0275element(28, "i", 46);
    \u0275\u0275elementStart(29, "p");
    \u0275\u0275text(30, "Deliveries");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "li", 3)(32, "a", 47);
    \u0275\u0275element(33, "i", 48);
    \u0275\u0275elementStart(34, "p");
    \u0275\u0275text(35, "Order Approvals");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275conditional(ctx_r0.auth.isAdmin() ? 10 : -1);
  }
}
var MainLayoutComponent = class _MainLayoutComponent {
  auth = inject(AuthService);
  basket = inject(BasketService);
  static \u0275fac = function MainLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MainLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MainLayoutComponent, selectors: [["app-main-layout"]], decls: 37, vars: 2, consts: [[1, "wrapper"], [1, "main-header", "navbar", "navbar-expand", "navbar-white", "navbar-light"], [1, "navbar-nav"], [1, "nav-item"], ["data-widget", "pushmenu", "href", "#", "role", "button", 1, "nav-link"], [1, "fas", "fa-bars"], [1, "nav-item", "d-none", "d-sm-inline-block"], ["routerLink", "/products", 1, "nav-link"], [1, "navbar-nav", "ml-auto"], [1, "nav-item", "dropdown"], ["data-toggle", "dropdown", "href", "#", 1, "nav-link"], [1, "fas", "fa-user-circle", "mr-1"], [1, "d-none", "d-sm-inline"], [1, "dropdown-menu", "dropdown-menu-right"], [1, "dropdown-divider"], ["href", "#", 1, "dropdown-item", 3, "click"], [1, "fas", "fa-sign-out-alt", "mr-2"], [1, "main-sidebar", "sidebar-dark-primary", "elevation-4"], ["routerLink", "/products", 1, "brand-link"], [1, "brand-text", "font-weight-light", "pl-3"], [1, "sidebar"], [1, "mt-2"], ["data-widget", "treeview", "role", "menu", "data-accordion", "false", 1, "nav", "nav-pills", "nav-sidebar", "flex-column"], [1, "content-wrapper"], [1, "content", "pt-3"], [1, "container-fluid"], [1, "main-footer"], [1, "control-sidebar", "control-sidebar-dark"], ["routerLink", "/shop", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-icon", "fas", "fa-store"], ["routerLink", "/shop/basket", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-icon", "fas", "fa-shopping-basket"], [1, "badge", "badge-info", "right"], ["routerLink", "/shop/orders", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-icon", "fas", "fa-receipt"], ["routerLink", "/products", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-icon", "fas", "fa-box"], ["routerLink", "/scan", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-icon", "fas", "fa-barcode"], ["routerLink", "/suppliers", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-icon", "fas", "fa-industry"], ["routerLink", "/schedule", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-icon", "fas", "fa-calendar-alt"], ["routerLink", "/orders", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-icon", "fas", "fa-shopping-cart"], ["routerLink", "/deliveries", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-icon", "fas", "fa-truck"], ["routerLink", "/order-approvals", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-icon", "fas", "fa-clipboard-check"], ["routerLink", "/users", "routerLinkActive", "active", 1, "nav-link"], [1, "nav-icon", "fas", "fa-users"]], template: function MainLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "ul", 2)(3, "li", 3)(4, "a", 4);
      \u0275\u0275element(5, "i", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "li", 6)(7, "a", 7);
      \u0275\u0275text(8, "Item Operating Management System");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "ul", 8)(10, "li", 9)(11, "a", 10);
      \u0275\u0275element(12, "i", 11);
      \u0275\u0275elementStart(13, "span", 12);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 13);
      \u0275\u0275element(16, "div", 14);
      \u0275\u0275elementStart(17, "a", 15);
      \u0275\u0275listener("click", function MainLayoutComponent_Template_a_click_17_listener($event) {
        $event.preventDefault();
        return ctx.auth.logout();
      });
      \u0275\u0275element(18, "i", 16);
      \u0275\u0275text(19, " Log out ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(20, "aside", 17)(21, "a", 18)(22, "span", 19);
      \u0275\u0275text(23, "Royal Distributors");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 20)(25, "nav", 21)(26, "ul", 22);
      \u0275\u0275conditionalCreate(27, MainLayoutComponent_Conditional_27_Template, 16, 1)(28, MainLayoutComponent_Conditional_28_Template, 36, 1);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(29, "div", 23)(30, "div", 24)(31, "div", 25);
      \u0275\u0275element(32, "router-outlet");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "footer", 26)(34, "strong");
      \u0275\u0275text(35, "Item Operating Management System");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(36, "aside", 27);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate((tmp_0_0 = ctx.auth.currentUser()) == null ? null : tmp_0_0.name);
      \u0275\u0275advance(13);
      \u0275\u0275conditional(ctx.auth.isClient() ? 27 : 28);
    }
  }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MainLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-main-layout", standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive], template: '<div class="wrapper">\n  <!-- Top Navbar -->\n  <nav class="main-header navbar navbar-expand navbar-white navbar-light">\n    <ul class="navbar-nav">\n      <li class="nav-item">\n        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>\n      </li>\n      <li class="nav-item d-none d-sm-inline-block">\n        <a routerLink="/products" class="nav-link">Item Operating Management System</a>\n      </li>\n    </ul>\n    <ul class="navbar-nav ml-auto">\n      <li class="nav-item dropdown">\n        <a class="nav-link" data-toggle="dropdown" href="#">\n          <i class="fas fa-user-circle mr-1"></i>\n          <span class="d-none d-sm-inline">{{ auth.currentUser()?.name }}</span>\n        </a>\n        <div class="dropdown-menu dropdown-menu-right">\n          <div class="dropdown-divider"></div>\n          <a href="#" class="dropdown-item" (click)="$event.preventDefault(); auth.logout()">\n            <i class="fas fa-sign-out-alt mr-2"></i> Log out\n          </a>\n        </div>\n      </li>\n    </ul>\n  </nav>\n\n  <!-- Sidebar -->\n  <aside class="main-sidebar sidebar-dark-primary elevation-4">\n    <a routerLink="/products" class="brand-link">\n      <span class="brand-text font-weight-light pl-3">Royal Distributors</span>\n    </a>\n    <div class="sidebar">\n      <nav class="mt-2">\n        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">\n          @if (auth.isClient()) {\n            <li class="nav-item">\n              <a routerLink="/shop" routerLinkActive="active" class="nav-link">\n                <i class="nav-icon fas fa-store"></i>\n                <p>Shop</p>\n              </a>\n            </li>\n            <li class="nav-item">\n              <a routerLink="/shop/basket" routerLinkActive="active" class="nav-link">\n                <i class="nav-icon fas fa-shopping-basket"></i>\n                <p>\n                  Basket\n                  @if (basket.count() > 0) {\n                    <span class="badge badge-info right">{{ basket.count() }}</span>\n                  }\n                </p>\n              </a>\n            </li>\n            <li class="nav-item">\n              <a routerLink="/shop/orders" routerLinkActive="active" class="nav-link">\n                <i class="nav-icon fas fa-receipt"></i>\n                <p>My Orders</p>\n              </a>\n            </li>\n          } @else {\n            <li class="nav-item">\n              <a routerLink="/products" routerLinkActive="active" class="nav-link">\n                <i class="nav-icon fas fa-box"></i>\n                <p>Products</p>\n              </a>\n            </li>\n            <li class="nav-item">\n              <a routerLink="/scan" routerLinkActive="active" class="nav-link">\n                <i class="nav-icon fas fa-barcode"></i>\n                <p>Scan In</p>\n              </a>\n            </li>\n            @if (auth.isAdmin()) {\n              <li class="nav-item">\n                <a routerLink="/users" routerLinkActive="active" class="nav-link">\n                  <i class="nav-icon fas fa-users"></i>\n                  <p>Users</p>\n                </a>\n              </li>\n            }\n            <li class="nav-item">\n              <a routerLink="/suppliers" routerLinkActive="active" class="nav-link">\n                <i class="nav-icon fas fa-industry"></i>\n                <p>Suppliers</p>\n              </a>\n            </li>\n            <li class="nav-item">\n              <a routerLink="/schedule" routerLinkActive="active" class="nav-link">\n                <i class="nav-icon fas fa-calendar-alt"></i>\n                <p>Schedule Shipping</p>\n              </a>\n            </li>\n            <li class="nav-item">\n              <a routerLink="/orders" routerLinkActive="active" class="nav-link">\n                <i class="nav-icon fas fa-shopping-cart"></i>\n                <p>Orders</p>\n              </a>\n            </li>\n            <li class="nav-item">\n              <a routerLink="/deliveries" routerLinkActive="active" class="nav-link">\n                <i class="nav-icon fas fa-truck"></i>\n                <p>Deliveries</p>\n              </a>\n            </li>\n            <li class="nav-item">\n              <a routerLink="/order-approvals" routerLinkActive="active" class="nav-link">\n                <i class="nav-icon fas fa-clipboard-check"></i>\n                <p>Order Approvals</p>\n              </a>\n            </li>\n          }\n        </ul>\n      </nav>\n    </div>\n  </aside>\n\n  <!-- Content Wrapper -->\n  <div class="content-wrapper">\n    <div class="content pt-3">\n      <div class="container-fluid">\n        <router-outlet></router-outlet>\n      </div>\n    </div>\n  </div>\n\n  <footer class="main-footer">\n    <strong>Item Operating Management System</strong>\n  </footer>\n\n  <aside class="control-sidebar control-sidebar-dark"></aside>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MainLayoutComponent, { className: "MainLayoutComponent", filePath: "app/layout/main-layout.component.ts", lineNumber: 12 });
})();

// src/app/app.routes.ts
var routes = [
  { path: "login", loadComponent: () => import("./chunk-TCDXZ6U7.js").then((m) => m.LoginComponent) },
  { path: "register", loadComponent: () => import("./chunk-UZWX5C3Y.js").then((m) => m.RegisterComponent) },
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: "", redirectTo: "products", pathMatch: "full" },
      { path: "products", canActivate: [staffGuard], loadComponent: () => import("./chunk-JBLDTT5W.js").then((m) => m.ProductsListComponent) },
      { path: "products/create", canActivate: [staffGuard], loadComponent: () => import("./chunk-7P7FV7YM.js").then((m) => m.ProductFormComponent) },
      { path: "products/edit/:id", canActivate: [staffGuard], loadComponent: () => import("./chunk-7P7FV7YM.js").then((m) => m.ProductFormComponent) },
      { path: "scan", canActivate: [staffGuard], loadComponent: () => import("./chunk-NLO5L6AU.js").then((m) => m.ScanInComponent) },
      { path: "suppliers", canActivate: [staffGuard], loadComponent: () => import("./chunk-RHGWUGCV.js").then((m) => m.SuppliersListComponent) },
      { path: "suppliers/create", canActivate: [staffGuard], loadComponent: () => import("./chunk-MLGVIN4F.js").then((m) => m.SupplierFormComponent) },
      { path: "suppliers/edit/:id", canActivate: [staffGuard], loadComponent: () => import("./chunk-MLGVIN4F.js").then((m) => m.SupplierFormComponent) },
      { path: "orders", canActivate: [staffGuard], loadComponent: () => import("./chunk-DATABDO2.js").then((m) => m.ShippingOrdersComponent) },
      { path: "schedule", canActivate: [staffGuard], loadComponent: () => import("./chunk-TCX22QOF.js").then((m) => m.DeliveryScheduleComponent) },
      { path: "deliveries", canActivate: [staffGuard], loadComponent: () => import("./chunk-3O2IK6ML.js").then((m) => m.DeliveriesComponent) },
      { path: "users", canActivate: [adminGuard], loadComponent: () => import("./chunk-LBDYF4QE.js").then((m) => m.UsersListComponent) },
      { path: "users/edit/:id", canActivate: [adminGuard], loadComponent: () => import("./chunk-WYRCBZUK.js").then((m) => m.UserEditComponent) },
      { path: "order-approvals", canActivate: [staffGuard], loadComponent: () => import("./chunk-RNZQRXIR.js").then((m) => m.OrderApprovalsComponent) },
      { path: "order-approvals/:id", canActivate: [staffGuard], loadComponent: () => import("./chunk-OFVQEZ4N.js").then((m) => m.OrderDetailComponent) },
      { path: "shop", canActivate: [clientGuard], loadComponent: () => import("./chunk-RGWO5TGE.js").then((m) => m.ShopProductsComponent) },
      { path: "shop/basket", canActivate: [clientGuard], loadComponent: () => import("./chunk-ELSN2EME.js").then((m) => m.ShopBasketComponent) },
      { path: "shop/schedule", canActivate: [clientGuard], loadComponent: () => import("./chunk-3DPTCT6V.js").then((m) => m.ShopScheduleComponent) },
      { path: "shop/orders", canActivate: [clientGuard], loadComponent: () => import("./chunk-SLMRQOVH.js").then((m) => m.ShopOrdersComponent) },
      { path: "access-denied", loadComponent: () => import("./chunk-CPYQP5FY.js").then((m) => m.AccessDeniedComponent) }
    ]
  },
  { path: "**", redirectTo: "" }
];

// src/app/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};

// src/app/app.ts
var App = class _App {
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 1, vars: 0, template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{
      selector: "app-root",
      standalone: true,
      imports: [RouterOutlet],
      template: "<router-outlet></router-outlet>"
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "app/app.ts", lineNumber: 10 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map

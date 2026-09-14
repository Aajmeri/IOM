import {
  Router
} from "./chunk-RBSBLNYF.js";
import {
  HttpClient,
  Injectable,
  setClassMetadata,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2HB4LNL5.js";

// src/app/services/auth.service.ts
var AuthService = class _AuthService {
  http;
  router;
  TOKEN_KEY = "iom_token";
  USER_KEY = "iom_user";
  currentUser = signal(this.loadUser(), ...ngDevMode ? [{ debugName: "currentUser" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(http, router) {
    this.http = http;
    this.router = router;
  }
  login(email, password) {
    return this.http.post("/api/auth/login", { email, password }).pipe(tap((user) => this.storeUser(user)));
  }
  register(name, email, password, confirmPassword) {
    return this.http.post("/api/auth/register", { name, email, password, confirmPassword }).pipe(tap((user) => this.storeUser(user)));
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(["/login"]);
  }
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  isAuthenticated() {
    return !!this.getToken();
  }
  isAdmin() {
    return this.currentUser()?.role === "Admin";
  }
  isClient() {
    return this.currentUser()?.role === "Client";
  }
  canManageProducts() {
    const role = this.currentUser()?.role;
    return role === "Admin" || role === "Warehouse";
  }
  storeUser(user) {
    localStorage.setItem(this.TOKEN_KEY, user.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }
  loadUser() {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-JU3C6OAJ.js.map

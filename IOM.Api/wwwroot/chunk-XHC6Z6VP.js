import {
  HttpClient,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2HB4LNL5.js";

// src/app/services/user.service.ts
var UserService = class _UserService {
  http;
  base = "/api/users";
  constructor(http) {
    this.http = http;
  }
  getAll() {
    return this.http.get(this.base);
  }
  getById(id) {
    return this.http.get(`${this.base}/${id}`);
  }
  update(id, data) {
    return this.http.put(`${this.base}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${this.base}/${id}`);
  }
  static \u0275fac = function UserService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  UserService
};
//# sourceMappingURL=chunk-XHC6Z6VP.js.map

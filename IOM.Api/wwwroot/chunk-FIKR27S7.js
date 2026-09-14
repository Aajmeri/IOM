import {
  HttpClient,
  HttpParams,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2HB4LNL5.js";

// src/app/services/supplier.service.ts
var SupplierService = class _SupplierService {
  http;
  base = "/api/suppliers";
  constructor(http) {
    this.http = http;
  }
  getAll() {
    return this.http.get(this.base);
  }
  search(query, limit = 20) {
    const params = new HttpParams().set("query", query).set("limit", limit);
    return this.http.get(`${this.base}/search`, { params });
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
  static \u0275fac = function SupplierService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupplierService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SupplierService, factory: _SupplierService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SupplierService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  SupplierService
};
//# sourceMappingURL=chunk-FIKR27S7.js.map

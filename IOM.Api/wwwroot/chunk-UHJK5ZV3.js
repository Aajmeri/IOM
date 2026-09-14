import {
  HttpClient,
  HttpParams,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2HB4LNL5.js";

// src/app/services/order.service.ts
var OrderService = class _OrderService {
  http;
  base = "/api/orders";
  constructor(http) {
    this.http = http;
  }
  create(data) {
    return this.http.post(this.base, data);
  }
  getMine() {
    return this.http.get(`${this.base}/mine`);
  }
  cancel(id) {
    return this.http.delete(`${this.base}/${id}`);
  }
  getAll(status) {
    let params = new HttpParams();
    if (status)
      params = params.set("status", status);
    return this.http.get(this.base, { params });
  }
  getById(id) {
    return this.http.get(`${this.base}/${id}`);
  }
  update(id, data) {
    return this.http.put(`${this.base}/${id}`, data);
  }
  approve(id, adminNotes) {
    return this.http.post(`${this.base}/${id}/approve`, { adminNotes });
  }
  reject(id, adminNotes) {
    return this.http.post(`${this.base}/${id}/reject`, { adminNotes });
  }
  static \u0275fac = function OrderService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OrderService, factory: _OrderService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  OrderService
};
//# sourceMappingURL=chunk-UHJK5ZV3.js.map

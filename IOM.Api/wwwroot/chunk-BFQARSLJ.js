import {
  HttpClient,
  HttpParams,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2HB4LNL5.js";

// src/app/services/delivery.service.ts
var DeliveryService = class _DeliveryService {
  http;
  base = "/api/deliveries";
  constructor(http) {
    this.http = http;
  }
  search(params) {
    let httpParams = new HttpParams();
    if (params.from)
      httpParams = httpParams.set("from", params.from);
    if (params.to)
      httpParams = httpParams.set("to", params.to);
    if (params.supplierId)
      httpParams = httpParams.set("supplierId", params.supplierId);
    if (params.status)
      httpParams = httpParams.set("status", params.status);
    if (params.keyword)
      httpParams = httpParams.set("keyword", params.keyword);
    return this.http.get(`${this.base}/search`, { params: httpParams });
  }
  calendar(start, end) {
    const params = new HttpParams().set("start", start).set("end", end);
    return this.http.get(`${this.base}/calendar`, { params });
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
  static \u0275fac = function DeliveryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeliveryService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DeliveryService, factory: _DeliveryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeliveryService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  DeliveryService
};
//# sourceMappingURL=chunk-BFQARSLJ.js.map

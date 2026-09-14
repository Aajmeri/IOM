import {
  HttpClient,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-2HB4LNL5.js";

// src/app/services/product.service.ts
var ProductService = class _ProductService {
  http;
  base = "/api/products";
  constructor(http) {
    this.http = http;
  }
  getAll() {
    return this.http.get(this.base);
  }
  getById(id) {
    return this.http.get(`${this.base}/${id}`);
  }
  getByBarcode(barcode) {
    return this.http.get(`${this.base}/by-barcode/${encodeURIComponent(barcode)}`);
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
  static \u0275fac = function ProductService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductService, factory: _ProductService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ProductService
};
//# sourceMappingURL=chunk-3DXSAL63.js.map

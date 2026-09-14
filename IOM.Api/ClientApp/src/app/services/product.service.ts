import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  // The Client role gets a reduced shape from the API (no visibility/
  // barcode/supplier info) at these same endpoints, so these are optional.
  visibility?: boolean;
  barcode?: string | null;
  supplierId?: string | null;
  supplierName?: string | null;
}

export interface SaveProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  visibility: boolean;
  barcode: string | null;
  supplierId: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly base = '/api/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  getByBarcode(barcode: string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/by-barcode/${encodeURIComponent(barcode)}`);
  }

  create(data: SaveProduct): Observable<Product> {
    return this.http.post<Product>(this.base, data);
  }

  update(id: string, data: SaveProduct): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

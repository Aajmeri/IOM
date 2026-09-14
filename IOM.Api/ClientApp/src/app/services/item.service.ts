import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  id: string;
  productId: string;
  productName: string;
  barcode: string | null;
  quantity: number;
  expirationDate: string | null;
  active: boolean;
}

export interface SaveItem {
  productId: string;
  quantity: number;
  expirationDate: string | null;
}

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly base = '/api/items';

  constructor(private http: HttpClient) {}

  getByProduct(productId: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.base}/by-product/${productId}`);
  }

  getById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.base}/${id}`);
  }

  create(data: SaveItem): Observable<Item> {
    return this.http.post<Item>(this.base, data);
  }

  update(id: string, data: SaveItem): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type OrderStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

export interface OrderItemSummary {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  scheduledDate: string;
  status: OrderStatus;
  notes: string | null;
  adminNotes: string | null;
  total: number;
  createdDate: string;
  items: OrderItemSummary[];
}

export interface SaveOrderItem {
  productId: string;
  quantity: number;
}

export interface SaveOrder {
  scheduledDate: string;
  notes: string | null;
  items: SaveOrderItem[];
}

export interface DecideOrder {
  adminNotes?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly base = '/api/orders';

  constructor(private http: HttpClient) {}

  create(data: SaveOrder): Observable<Order> {
    return this.http.post<Order>(this.base, data);
  }

  getMine(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.base}/mine`);
  }

  cancel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  getAll(status?: OrderStatus | ''): Observable<Order[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<Order[]>(this.base, { params });
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.base}/${id}`);
  }

  update(id: string, data: SaveOrder): Observable<Order> {
    return this.http.put<Order>(`${this.base}/${id}`, data);
  }

  approve(id: string, adminNotes?: string): Observable<Order> {
    return this.http.post<Order>(`${this.base}/${id}/approve`, { adminNotes });
  }

  reject(id: string, adminNotes: string): Observable<Order> {
    return this.http.post<Order>(`${this.base}/${id}/reject`, { adminNotes });
  }
}

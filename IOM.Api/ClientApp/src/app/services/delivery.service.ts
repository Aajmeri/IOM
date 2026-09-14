import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type DeliveryStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Delayed';

export interface Delivery {
  id: string;
  supplierId: string;
  supplierName: string;
  scheduledDate: string;
  status: DeliveryStatus;
  invoiceId: string | null;
  notes: string | null;
  active: boolean;
}

export interface SaveDelivery {
  supplierId: string;
  scheduledDate: string;
  status: DeliveryStatus;
  invoiceId: string | null;
  notes: string | null;
}

export interface DeliverySearchParams {
  from?: string;
  to?: string;
  supplierId?: string;
  status?: DeliveryStatus | '';
  keyword?: string;
}

@Injectable({ providedIn: 'root' })
export class DeliveryService {
  private readonly base = '/api/deliveries';

  constructor(private http: HttpClient) {}

  search(params: DeliverySearchParams): Observable<Delivery[]> {
    let httpParams = new HttpParams();
    if (params.from) httpParams = httpParams.set('from', params.from);
    if (params.to) httpParams = httpParams.set('to', params.to);
    if (params.supplierId) httpParams = httpParams.set('supplierId', params.supplierId);
    if (params.status) httpParams = httpParams.set('status', params.status);
    if (params.keyword) httpParams = httpParams.set('keyword', params.keyword);
    return this.http.get<Delivery[]>(`${this.base}/search`, { params: httpParams });
  }

  calendar(start: string, end: string): Observable<Delivery[]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<Delivery[]>(`${this.base}/calendar`, { params });
  }

  getById(id: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.base}/${id}`);
  }

  create(data: SaveDelivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.base, data);
  }

  update(id: string, data: SaveDelivery): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

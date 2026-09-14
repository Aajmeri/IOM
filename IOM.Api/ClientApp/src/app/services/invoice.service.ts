import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InvoiceItemSummary {
  itemId: string;
  productId: string;
  productName: string;
  quantity: number;
  expirationDate: string | null;
}

export interface Invoice {
  id: string;
  number: string;
  total: string;
  supplierId: string;
  supplierName: string;
  createdDate: string;
  items: InvoiceItemSummary[];
}

export interface UploadResult {
  invoiceId: string | null;
  productsCreated: number;
  productsMatched: number;
  itemsCreated: number;
  rowErrors: string[];
}

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private readonly base = '/api/invoices';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.base);
  }

  getById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.base}/${id}`);
  }

  upload(file: File, supplierId: string, invoiceNumber?: string): Observable<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('supplierId', supplierId);
    if (invoiceNumber) {
      formData.append('invoiceNumber', invoiceNumber);
    }
    return this.http.post<UploadResult>(`${this.base}/upload`, formData);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

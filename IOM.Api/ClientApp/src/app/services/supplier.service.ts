import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Supplier {
  id: string;
  name: string;
  active: boolean;
}

export interface SaveSupplier {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private readonly base = '/api/suppliers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.base);
  }

  search(query: string, limit = 20): Observable<Supplier[]> {
    const params = new HttpParams().set('query', query).set('limit', limit);
    return this.http.get<Supplier[]>(`${this.base}/search`, { params });
  }

  getById(id: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.base}/${id}`);
  }

  create(data: SaveSupplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.base, data);
  }

  update(id: string, data: SaveSupplier): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

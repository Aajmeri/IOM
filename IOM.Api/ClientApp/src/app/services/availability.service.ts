import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Slot {
  start: string;
  end: string;
  available: boolean;
}

export interface DaySlots {
  date: string;
  slots: Slot[];
}

@Injectable({ providedIn: 'root' })
export class AvailabilityService {
  private readonly base = '/api/availability';

  constructor(private http: HttpClient) {}

  getRange(start: string, end: string): Observable<DaySlots[]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<DaySlots[]>(this.base, { params });
  }
}

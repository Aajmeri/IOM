import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type OrderStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Refunded' | 'Unpaid';

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
  /** 'Unpaid' for pay-later orders (and orders placed before checkout took payment). */
  paymentStatus: PaymentStatus;
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

export interface PaymentCard {
  cardholderName: string;
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvc: string;
}

/** The amount is never sent - the server computes it from the order lines. */
export interface Checkout extends SaveOrder {
  payment: PaymentCard;
}

export interface Receipt {
  orderId: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  orderDate: string;
  scheduledDate: string;
  clientName: string;
  clientEmail: string;
  notes: string | null;
  items: OrderItemSummary[];
  total: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  cardBrand: string;
  cardLast4: string;
  cardholderName: string;
  transactionId: string;
  amountPaid: number;
  paidDate: string;
  refundedDate: string | null;
  /** Set only on checkout/resend responses: where the receipt was just emailed, or null if sending failed. */
  emailedTo: string | null;
}

export interface DecideOrder {
  adminNotes?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly base = '/api/orders';

  constructor(private http: HttpClient) {}

  /** Places the order without paying now; it can be paid later with pay(). */
  placeOrderPayLater(data: SaveOrder): Observable<Order> {
    return this.http.post<Order>(this.base, { ...data, payLater: true });
  }

  /** Pays for an unpaid (pay-later) order; responds with the receipt. */
  pay(id: string, card: PaymentCard): Observable<Receipt> {
    return this.http.post<Receipt>(`${this.base}/${id}/pay`, card);
  }

  /** Staff: moves the order to another delivery slot and emails the client. */
  reschedule(id: string, scheduledDate: string, reason?: string): Observable<Order> {
    return this.http.post<Order>(`${this.base}/${id}/reschedule`, { scheduledDate, reason: reason ?? null });
  }

  /** Pays for and places the order; responds with the receipt. */
  checkout(data: Checkout): Observable<Receipt> {
    return this.http.post<Receipt>(this.base, data);
  }

  getReceipt(id: string): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.base}/${id}/receipt`);
  }

  emailReceipt(id: string): Observable<Receipt> {
    return this.http.post<Receipt>(`${this.base}/${id}/receipt/email`, {});
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

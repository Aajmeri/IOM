import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Checkout, OrderService, Receipt } from './order.service';
import { sampleReceipt } from '../../testing/order-fixtures';

describe('OrderService (checkout & receipts)', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('checkout() POSTs the order and card to /api/orders and returns the receipt', () => {
    const data: Checkout = {
      scheduledDate: '2026-10-15T08:00:00',
      notes: null,
      items: [{ productId: 'p1', quantity: 2 }],
      payment: { cardholderName: 'Jane', cardNumber: '4242424242424242', expiryMonth: 12, expiryYear: 2030, cvc: '123' }
    };
    let result: Receipt | undefined;

    service.checkout(data).subscribe(r => (result = r));

    const req = httpMock.expectOne('/api/orders');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    expect(req.request.body.amount).toBeUndefined();
    req.flush(sampleReceipt);
    expect(result).toEqual(sampleReceipt);
  });

  it('getReceipt() GETs /api/orders/:id/receipt', () => {
    service.getReceipt('order-1').subscribe(r => expect(r).toEqual(sampleReceipt));

    const req = httpMock.expectOne('/api/orders/order-1/receipt');
    expect(req.request.method).toBe('GET');
    req.flush(sampleReceipt);
  });

  it('emailReceipt() POSTs to /api/orders/:id/receipt/email', () => {
    service.emailReceipt('order-1').subscribe(r => expect(r.emailedTo).toBe('jane@example.com'));

    const req = httpMock.expectOne('/api/orders/order-1/receipt/email');
    expect(req.request.method).toBe('POST');
    req.flush(sampleReceipt);
  });
});

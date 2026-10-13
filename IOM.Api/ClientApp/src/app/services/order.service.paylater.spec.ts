import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { OrderService, PaymentCard, SaveOrder } from './order.service';
import { sampleOrder, sampleReceipt } from '../../testing/order-fixtures';

describe('OrderService (pay later & reschedule)', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  const card: PaymentCard = { cardholderName: 'Jane', cardNumber: '4242424242424242', expiryMonth: 12, expiryYear: 2030, cvc: '123' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('placeOrderPayLater() POSTs the order to /api/orders with payLater and no card', () => {
    const data: SaveOrder = { scheduledDate: '2026-10-15T08:00:00', notes: null, items: [{ productId: 'p1', quantity: 2 }] };

    service.placeOrderPayLater(data).subscribe(o => expect(o).toEqual(sampleOrder));

    const req = httpMock.expectOne('/api/orders');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ ...data, payLater: true });
    expect(req.request.body.payment).toBeUndefined();
    req.flush(sampleOrder);
  });

  it('pay() POSTs the card to /api/orders/:id/pay and returns the receipt', () => {
    service.pay('order-1', card).subscribe(r => expect(r).toEqual(sampleReceipt));

    const req = httpMock.expectOne('/api/orders/order-1/pay');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(card);
    req.flush(sampleReceipt);
  });

  it('reschedule() POSTs the new slot and reason to /api/orders/:id/reschedule', () => {
    service.reschedule('order-1', '2026-10-20T10:00:00', 'Truck unavailable').subscribe();

    const req = httpMock.expectOne('/api/orders/order-1/reschedule');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ scheduledDate: '2026-10-20T10:00:00', reason: 'Truck unavailable' });
    req.flush(sampleOrder);
  });

  it('reschedule() sends a null reason when none is given', () => {
    service.reschedule('order-1', '2026-10-20T10:00:00').subscribe();

    const req = httpMock.expectOne('/api/orders/order-1/reschedule');
    expect(req.request.body).toEqual({ scheduledDate: '2026-10-20T10:00:00', reason: null });
    req.flush(sampleOrder);
  });
});

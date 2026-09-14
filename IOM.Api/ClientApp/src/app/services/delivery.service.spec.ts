import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DeliveryService, Delivery, SaveDelivery } from './delivery.service';

describe('DeliveryService', () => {
  let service: DeliveryService;
  let httpMock: HttpTestingController;

  const sample: Delivery = {
    id: 'd1',
    supplierId: 's1',
    supplierName: 'Acme',
    scheduledDate: '2026-06-01',
    status: 'Scheduled',
    invoiceId: null,
    notes: null,
    active: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(DeliveryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('search() only includes params that were actually provided', () => {
    service.search({ supplierId: 's1' }).subscribe();
    const req = httpMock.expectOne(r => r.url === '/api/deliveries/search');
    expect(req.request.params.get('supplierId')).toBe('s1');
    expect(req.request.params.has('from')).toBe(false);
    expect(req.request.params.has('to')).toBe(false);
    expect(req.request.params.has('status')).toBe(false);
    expect(req.request.params.has('keyword')).toBe(false);
    req.flush([sample]);
  });

  it('search() includes all params when provided', () => {
    service.search({ from: '2026-01-01', to: '2026-02-01', supplierId: 's1', status: 'Completed', keyword: 'x' }).subscribe();
    const req = httpMock.expectOne(r => r.url === '/api/deliveries/search');
    expect(req.request.params.get('from')).toBe('2026-01-01');
    expect(req.request.params.get('to')).toBe('2026-02-01');
    expect(req.request.params.get('status')).toBe('Completed');
    expect(req.request.params.get('keyword')).toBe('x');
    req.flush([sample]);
  });

  it('calendar() GETs /api/deliveries/calendar with start/end params', () => {
    service.calendar('2026-01-01', '2026-01-31').subscribe();
    const req = httpMock.expectOne(r => r.url === '/api/deliveries/calendar');
    expect(req.request.params.get('start')).toBe('2026-01-01');
    expect(req.request.params.get('end')).toBe('2026-01-31');
    req.flush([sample]);
  });

  it('create() POSTs the save model', () => {
    const data: SaveDelivery = { supplierId: 's1', scheduledDate: '2026-06-01', status: 'Scheduled', invoiceId: null, notes: null };
    service.create(data).subscribe();
    const req = httpMock.expectOne('/api/deliveries');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush(sample);
  });

  it('update() PUTs to /api/deliveries/:id', () => {
    const data: SaveDelivery = { supplierId: 's1', scheduledDate: '2026-06-01', status: 'Completed', invoiceId: null, notes: 'done' };
    service.update('d1', data).subscribe();
    const req = httpMock.expectOne('/api/deliveries/d1');
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('delete() DELETEs /api/deliveries/:id', () => {
    service.delete('d1').subscribe();
    const req = httpMock.expectOne('/api/deliveries/d1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { InvoiceService, Invoice, UploadResult } from './invoice.service';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let httpMock: HttpTestingController;

  const sample: Invoice = {
    id: 'inv1',
    number: 'SO-1',
    total: '10.00',
    supplierId: 's1',
    supplierName: 'Acme',
    createdDate: '2026-01-01',
    items: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(InvoiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getAll() GETs /api/invoices', () => {
    service.getAll().subscribe(invoices => expect(invoices).toEqual([sample]));
    const req = httpMock.expectOne('/api/invoices');
    expect(req.request.method).toBe('GET');
    req.flush([sample]);
  });

  it('getById() GETs /api/invoices/:id', () => {
    service.getById('inv1').subscribe();
    const req = httpMock.expectOne('/api/invoices/inv1');
    expect(req.request.method).toBe('GET');
    req.flush(sample);
  });

  it('upload() POSTs multipart form data including the file, supplierId, and invoiceNumber', () => {
    const file = new File(['a,b\n1,2'], 'shipping-order.csv', { type: 'text/csv' });
    const result: UploadResult = { invoiceId: 'inv1', productsCreated: 1, productsMatched: 0, itemsCreated: 1, rowErrors: [] };

    service.upload(file, 's1', 'SO-1').subscribe(r => expect(r).toEqual(result));

    const req = httpMock.expectOne('/api/invoices/upload');
    expect(req.request.method).toBe('POST');
    const body = req.request.body as FormData;
    expect(body.get('file')).toBe(file);
    expect(body.get('supplierId')).toBe('s1');
    expect(body.get('invoiceNumber')).toBe('SO-1');
    req.flush(result);
  });

  it('upload() omits invoiceNumber from the form when not provided', () => {
    const file = new File(['a,b\n1,2'], 'shipping-order.csv', { type: 'text/csv' });

    service.upload(file, 's1').subscribe();

    const req = httpMock.expectOne('/api/invoices/upload');
    const body = req.request.body as FormData;
    expect(body.has('invoiceNumber')).toBe(false);
    req.flush({ invoiceId: null, productsCreated: 0, productsMatched: 0, itemsCreated: 0, rowErrors: [] });
  });

  it('delete() DELETEs /api/invoices/:id', () => {
    service.delete('inv1').subscribe();
    const req = httpMock.expectOne('/api/invoices/inv1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

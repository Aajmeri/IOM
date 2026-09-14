import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SupplierService, Supplier } from './supplier.service';

describe('SupplierService', () => {
  let service: SupplierService;
  let httpMock: HttpTestingController;

  const sample: Supplier = { id: 's1', name: 'Acme', active: true };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(SupplierService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getAll() GETs /api/suppliers', () => {
    service.getAll().subscribe(suppliers => expect(suppliers).toEqual([sample]));
    const req = httpMock.expectOne('/api/suppliers');
    expect(req.request.method).toBe('GET');
    req.flush([sample]);
  });

  it('search() sends query and limit as query params', () => {
    service.search('acme', 5).subscribe();
    const req = httpMock.expectOne(r => r.url === '/api/suppliers/search');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('query')).toBe('acme');
    expect(req.request.params.get('limit')).toBe('5');
    req.flush([sample]);
  });

  it('search() defaults limit to 20', () => {
    service.search('acme').subscribe();
    const req = httpMock.expectOne(r => r.url === '/api/suppliers/search');
    expect(req.request.params.get('limit')).toBe('20');
    req.flush([sample]);
  });

  it('create() POSTs the save model', () => {
    service.create({ name: 'New Co' }).subscribe();
    const req = httpMock.expectOne('/api/suppliers');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'New Co' });
    req.flush(sample);
  });

  it('update() PUTs to /api/suppliers/:id', () => {
    service.update('s1', { name: 'Renamed' }).subscribe();
    const req = httpMock.expectOne('/api/suppliers/s1');
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('delete() DELETEs /api/suppliers/:id', () => {
    service.delete('s1').subscribe();
    const req = httpMock.expectOne('/api/suppliers/s1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

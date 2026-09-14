import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService, Product, SaveProduct } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const sample: Product = {
    id: '1',
    name: 'Widget',
    description: 'A widget',
    price: 9.99,
    quantity: 5,
    visibility: true,
    barcode: '123',
    supplierId: 'sup-1',
    supplierName: 'Acme'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getAll() issues a GET to /api/products', () => {
    service.getAll().subscribe(products => {
      expect(products).toEqual([sample]);
    });

    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('GET');
    req.flush([sample]);
  });

  it('getById() issues a GET to /api/products/:id', () => {
    service.getById('1').subscribe(product => {
      expect(product).toEqual(sample);
    });

    const req = httpMock.expectOne('/api/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(sample);
  });

  it('getByBarcode() URL-encodes the barcode', () => {
    service.getByBarcode('abc 123/x').subscribe();

    const req = httpMock.expectOne('/api/products/by-barcode/abc%20123%2Fx');
    expect(req.request.method).toBe('GET');
    req.flush(sample);
  });

  it('create() POSTs the save model', () => {
    const data: SaveProduct = {
      name: 'New',
      description: 'desc',
      price: 1,
      quantity: 1,
      visibility: true,
      barcode: null,
      supplierId: 'sup-1'
    };

    service.create(data).subscribe();

    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush(sample);
  });

  it('update() PUTs to /api/products/:id', () => {
    const data: SaveProduct = {
      name: 'Updated',
      description: 'desc',
      price: 2,
      quantity: 2,
      visibility: false,
      barcode: '999',
      supplierId: 'sup-2'
    };

    service.update('1', data).subscribe();

    const req = httpMock.expectOne('/api/products/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(data);
    req.flush(null);
  });

  it('delete() DELETEs /api/products/:id', () => {
    service.delete('1').subscribe();

    const req = httpMock.expectOne('/api/products/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

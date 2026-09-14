import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ItemService, Item, SaveItem } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  const sample: Item = {
    id: 'i1',
    productId: 'p1',
    productName: 'Widget',
    barcode: '123',
    quantity: 4,
    expirationDate: null,
    active: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getByProduct() GETs /api/items/by-product/:productId', () => {
    service.getByProduct('p1').subscribe(items => expect(items).toEqual([sample]));
    const req = httpMock.expectOne('/api/items/by-product/p1');
    expect(req.request.method).toBe('GET');
    req.flush([sample]);
  });

  it('getById() GETs /api/items/:id', () => {
    service.getById('i1').subscribe();
    const req = httpMock.expectOne('/api/items/i1');
    expect(req.request.method).toBe('GET');
    req.flush(sample);
  });

  it('create() POSTs the save model', () => {
    const data: SaveItem = { productId: 'p1', quantity: 3, expirationDate: null };
    service.create(data).subscribe();
    const req = httpMock.expectOne('/api/items');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush(sample);
  });

  it('update() PUTs to /api/items/:id', () => {
    const data: SaveItem = { productId: 'p1', quantity: 9, expirationDate: '2027-01-01' };
    service.update('i1', data).subscribe();
    const req = httpMock.expectOne('/api/items/i1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(data);
    req.flush(null);
  });

  it('delete() DELETEs /api/items/:id', () => {
    service.delete('i1').subscribe();
    const req = httpMock.expectOne('/api/items/i1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

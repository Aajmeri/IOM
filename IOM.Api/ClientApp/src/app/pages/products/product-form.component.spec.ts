import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let httpMock: HttpTestingController;
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    router = { navigate: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        { provide: Router, useValue: router }
      ]
    });

    const fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('blocks submit and sets an error when no supplier is selected', () => {
    component.model.supplierId = '';

    component.submit();

    expect(component.error).toContain('supplier');
    httpMock.expectNone('/api/products');
  });

  it('submits a create (POST) request once a supplier is selected, then navigates to the list', () => {
    component.model = {
      name: 'Widget',
      description: 'desc',
      price: 5,
      quantity: 1,
      visibility: true,
      barcode: null,
      supplierId: 'sup-1'
    };

    component.submit();

    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 'p1' });

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('submits an update (PUT) request when editing an existing product', () => {
    (component as any).isEdit = true;
    (component as any).productId = 'p1';
    component.model.supplierId = 'sup-1';

    component.submit();

    const req = httpMock.expectOne('/api/products/p1');
    expect(req.request.method).toBe('PUT');
    req.flush(null);

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('surfaces the server error message and stops saving on failure', () => {
    component.model.supplierId = 'sup-1';

    component.submit();

    const req = httpMock.expectOne('/api/products');
    req.flush({ message: 'Barcode is already in use by another product.' }, { status: 400, statusText: 'Bad Request' });

    expect(component.error).toBe('Barcode is already in use by another product.');
    expect(component.saving).toBe(false);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});

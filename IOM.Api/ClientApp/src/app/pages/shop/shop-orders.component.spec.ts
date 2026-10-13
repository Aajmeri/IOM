import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { ShopOrdersComponent } from './shop-orders.component';
import { Order } from '../../services/order.service';
import { sampleOrder } from '../../../testing/order-fixtures';

describe('ShopOrdersComponent (payment status)', () => {
  let fixture: ComponentFixture<ShopOrdersComponent>;
  let httpMock: HttpTestingController;

  function setup(orders: Order[], query: Record<string, string> = {}) {
    TestBed.configureTestingModule({
      imports: [ShopOrdersComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: query, queryParamMap: convertToParamMap(query) } } }
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ShopOrdersComponent);
    fixture.detectChanges();
    httpMock.expectOne('/api/orders/mine').flush(orders);
    fixture.detectChanges();
  }

  afterEach(() => httpMock.verify());

  const el = () => fixture.nativeElement as HTMLElement;

  it('shows an Unpaid badge and a Pay now link for a pay-later order', () => {
    setup([sampleOrder]);

    expect(el().textContent).toContain('Unpaid');
    expect(el().querySelector('a[href="/shop/orders/order-1/pay"]')?.textContent).toContain('Pay now');
    expect(el().querySelector('a[href="/shop/orders/order-1/receipt"]')).toBeNull();
  });

  it('shows a Receipt link and no Pay now link for a paid order', () => {
    setup([{ ...sampleOrder, paymentStatus: 'Paid' }]);

    expect(el().querySelector('a[href="/shop/orders/order-1/receipt"]')).not.toBeNull();
    expect(el().querySelector('a[href="/shop/orders/order-1/pay"]')).toBeNull();
  });

  it('does not offer Pay now on a cancelled unpaid order', () => {
    setup([{ ...sampleOrder, status: 'Cancelled' }]);

    expect(el().querySelector('a[href="/shop/orders/order-1/pay"]')).toBeNull();
  });

  it('after a pay-later checkout, says the order was placed and payment is still due', () => {
    setup([sampleOrder], { placed: '1', payLater: '1' });

    expect(el().textContent).toContain('payment is due');
  });
});

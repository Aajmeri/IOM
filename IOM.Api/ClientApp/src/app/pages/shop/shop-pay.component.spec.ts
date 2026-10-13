import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { ShopPayComponent } from './shop-pay.component';
import { Order } from '../../services/order.service';
import { sampleOrder, sampleReceipt } from '../../../testing/order-fixtures';

describe('ShopPayComponent', () => {
  let fixture: ComponentFixture<ShopPayComponent>;
  let component: ShopPayComponent;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopPayComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: 'order-1' }) } } }
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(ShopPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => httpMock.verify());

  const text = () => (fixture.nativeElement as HTMLElement).textContent ?? '';

  function loadOrder(order: Order = sampleOrder) {
    httpMock.expectOne('/api/orders/order-1').flush(order);
    fixture.detectChanges();
  }

  function fillValidCard() {
    component.cardholderName = 'Jane Client';
    component.onCardNumberInput('4242424242424242');
    component.expiryMonth = 12;
    component.expiryYear = new Date().getFullYear() + 2;
    component.onCvcInput('123');
  }

  it('loads the order and shows its total on the pay button', () => {
    loadOrder();

    expect(text()).toContain('ORD-20261012100000');
    expect(text()).toContain('Widget');
    const button = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(button.textContent).toContain('Pay $20.00');
    expect(fixture.nativeElement.querySelector('#cardNumber')).not.toBeNull();
  });

  it('pays with a valid card and goes to the receipt', () => {
    loadOrder();
    fillValidCard();
    component.pay();

    const req = httpMock.expectOne('/api/orders/order-1/pay');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      cardholderName: 'Jane Client',
      cardNumber: '4242424242424242',
      expiryMonth: 12,
      expiryYear: new Date().getFullYear() + 2,
      cvc: '123'
    });
    req.flush(sampleReceipt);

    expect(router.navigate).toHaveBeenCalledWith(['/shop/orders', 'order-1', 'receipt'], {
      queryParams: { paid: '1', emailed: '1' }
    });
  });

  it('does not call the API when the card is invalid', () => {
    loadOrder();
    component.pay();
    fixture.detectChanges();

    httpMock.expectNone('/api/orders/order-1/pay');
    expect(text()).toContain('Enter your card number.');
  });

  it('shows the decline message and clears the CVC', () => {
    loadOrder();
    fillValidCard();
    component.pay();

    httpMock.expectOne('/api/orders/order-1/pay').flush(
      { message: 'Payment failed: Your card was declined.' },
      { status: 400, statusText: 'Bad Request' }
    );
    fixture.detectChanges();

    expect(text()).toContain('Payment failed: Your card was declined.');
    expect(component.cvc).toBe('');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('an already-paid order shows a receipt link instead of the card form', () => {
    loadOrder({ ...sampleOrder, paymentStatus: 'Paid' });

    expect(text()).toContain('already been paid');
    expect(fixture.nativeElement.querySelector('#cardNumber')).toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="/shop/orders/order-1/receipt"]')).not.toBeNull();
  });

  it('a cancelled or rejected order cannot be paid', () => {
    loadOrder({ ...sampleOrder, status: 'Cancelled' });

    expect(text()).toContain('can no longer be paid');
    expect(fixture.nativeElement.querySelector('#cardNumber')).toBeNull();
  });

  it('shows an error when the order cannot be loaded', () => {
    httpMock.expectOne('/api/orders/order-1').flush({}, { status: 404, statusText: 'Not Found' });
    fixture.detectChanges();

    expect(text()).toContain('Order not found.');
  });
});

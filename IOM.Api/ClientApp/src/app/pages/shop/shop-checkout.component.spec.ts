import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { ShopCheckoutComponent } from './shop-checkout.component';
import { BasketService } from '../../services/basket.service';
import { sampleReceipt } from '../../../testing/order-fixtures';

describe('ShopCheckoutComponent', () => {
  let fixture: ComponentFixture<ShopCheckoutComponent>;
  let component: ShopCheckoutComponent;
  let httpMock: HttpTestingController;
  let basket: BasketService;
  let router: Router;

  const slotStart = '2026-10-15T08:00:00';

  function setup(queryParams: Record<string, string> = { start: slotStart, end: '2026-10-15T10:00:00' }) {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [ShopCheckoutComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap(queryParams) } } }
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    basket = TestBed.inject(BasketService);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    basket.clear();
    basket.add({ id: 'p1', name: 'Widget', price: 10 }, 2);

    fixture = TestBed.createComponent(ShopCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function fillValidCard() {
    component.cardholderName = 'Jane Client';
    component.onCardNumberInput('4242424242424242');
    component.expiryMonth = 12;
    component.expiryYear = new Date().getFullYear() + 2;
    component.onCvcInput('123');
  }

  afterEach(() => httpMock.verify());

  it('shows the basket total on the pay button and in the summary', () => {
    setup();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="checkout-total"]')?.textContent).toContain('$20.00');
    expect(el.querySelector('button[type="submit"]')?.textContent).toContain('Pay $20.00');
  });

  it('formats the card number and detects the brand as the user types', () => {
    setup();
    component.onCardNumberInput('4242424242424242');
    expect(component.cardNumber).toBe('4242 4242 4242 4242');
    expect(component.brand).toBe('Visa');
  });

  it('does not call the API and shows field errors when the card form is invalid', () => {
    setup();
    component.onCardNumberInput('4242424242424241');
    component.pay();
    fixture.detectChanges();

    httpMock.expectNone('/api/orders');
    const errors = Array.from(fixture.nativeElement.querySelectorAll('.invalid-feedback')).map((e: any) => e.textContent.trim());
    expect(errors).toContain('That card number is not valid.');
    expect(errors).toContain('Enter the name on the card.');
  });

  it('pays, clears the basket and navigates to the receipt on success', () => {
    setup();
    fillValidCard();
    component.notes = '  back door ';
    component.pay();

    const req = httpMock.expectOne('/api/orders');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      scheduledDate: slotStart,
      notes: 'back door',
      items: [{ productId: 'p1', quantity: 2 }],
      payment: {
        cardholderName: 'Jane Client',
        cardNumber: '4242424242424242',
        expiryMonth: 12,
        expiryYear: new Date().getFullYear() + 2,
        cvc: '123'
      }
    });
    req.flush(sampleReceipt);

    expect(basket.basket()).toEqual([]);
    expect(router.navigate).toHaveBeenCalledWith(['/shop/orders', 'order-1', 'receipt'], {
      queryParams: { placed: '1', emailed: '1' }
    });
  });

  it('keeps the basket, clears the CVC and shows the server message when the card is declined', () => {
    setup();
    fillValidCard();
    component.pay();

    httpMock.expectOne('/api/orders').flush(
      { message: 'Payment failed: Your card was declined.' },
      { status: 400, statusText: 'Bad Request' }
    );
    fixture.detectChanges();

    expect(component.error).toBe('Payment failed: Your card was declined.');
    expect(component.cvc).toBe('');
    expect(basket.basket().length).toBe(1);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.alert-danger')?.textContent).toContain('declined');
  });

  it('surfaces ASP.NET validation-problem errors', () => {
    setup();
    fillValidCard();
    component.pay();

    httpMock.expectOne('/api/orders').flush(
      { errors: { 'Payment.CardNumber': ['Card number is invalid.'] } },
      { status: 400, statusText: 'Bad Request' }
    );

    expect(component.error).toBe('Card number is invalid.');
  });

  it('cannot pay without a delivery slot', () => {
    setup({});
    fillValidCard();
    component.pay();
    fixture.detectChanges();

    httpMock.expectNone('/api/orders');
    expect(fixture.nativeElement.textContent).toContain('Pick a delivery time first');
  });
});

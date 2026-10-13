import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router, convertToParamMap, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { ShopCheckoutComponent } from './shop-checkout.component';
import { BasketService } from '../../services/basket.service';
import { sampleOrder } from '../../../testing/order-fixtures';

describe('ShopCheckoutComponent (pay later)', () => {
  let fixture: ComponentFixture<ShopCheckoutComponent>;
  let component: ShopCheckoutComponent;
  let httpMock: HttpTestingController;
  let basket: BasketService;
  let router: Router;

  const slotStart = '2026-10-15T08:00:00';

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [ShopCheckoutComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap({ start: slotStart }) } } }
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
  });

  afterEach(() => httpMock.verify());

  const el = () => fixture.nativeElement as HTMLElement;
  const submitButton = () => el().querySelector('button[type="submit"]') as HTMLButtonElement;

  function choosePayLater() {
    (el().querySelector('#payLater') as HTMLInputElement).click();
    fixture.detectChanges();
  }

  it('offers "pay now" (the default) and "pay later" options', () => {
    expect(el().querySelector('#payNow')).not.toBeNull();
    expect(el().querySelector('#payLater')).not.toBeNull();
    expect(component.payLater).toBe(false);
    expect(el().querySelector('#cardNumber')).not.toBeNull();
  });

  it('choosing pay later hides the card fields and changes the button to "Place Order"', () => {
    choosePayLater();

    expect(component.payLater).toBe(true);
    expect(el().querySelector('#cardNumber')).toBeNull();
    expect(submitButton().textContent).toContain('Place Order');
    expect(submitButton().textContent).not.toContain('Pay $');
  });

  it('pay later places the order without any card, clears the basket and goes to My Orders', () => {
    choosePayLater();
    component.notes = ' ring bell ';
    submitButton().click();

    const req = httpMock.expectOne('/api/orders');
    expect(req.request.body).toEqual({
      scheduledDate: slotStart,
      notes: 'ring bell',
      items: [{ productId: 'p1', quantity: 2 }],
      payLater: true
    });
    req.flush(sampleOrder);

    expect(basket.basket()).toEqual([]);
    expect(router.navigate).toHaveBeenCalledWith(['/shop/orders'], { queryParams: { placed: '1', payLater: '1' } });
  });

  it('pay later shows the server error and keeps the basket on failure', () => {
    choosePayLater();
    submitButton().click();

    httpMock.expectOne('/api/orders').flush(
      { message: 'The selected delivery slot is fully booked.' },
      { status: 400, statusText: 'Bad Request' }
    );
    fixture.detectChanges();

    expect(component.error).toBe('The selected delivery slot is fully booked.');
    expect(basket.basket().length).toBe(1);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('switching back to pay now requires a valid card again', () => {
    choosePayLater();
    (el().querySelector('#payNow') as HTMLInputElement).click();
    fixture.detectChanges();
    submitButton().click();

    httpMock.expectNone('/api/orders');
    expect(component.payLater).toBe(false);
  });
});

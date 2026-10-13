import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { ShopReceiptComponent } from './shop-receipt.component';
import { sampleReceipt } from '../../../testing/order-fixtures';

describe('ShopReceiptComponent (after paying a pay-later order)', () => {
  let fixture: ComponentFixture<ShopReceiptComponent>;
  let httpMock: HttpTestingController;

  function setup(query: Record<string, string>) {
    TestBed.configureTestingModule({
      imports: [ShopReceiptComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: 'order-1' }), queryParamMap: convertToParamMap(query) } }
        }
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ShopReceiptComponent);
    fixture.detectChanges();
    httpMock.expectOne('/api/orders/order-1/receipt').flush(sampleReceipt);
    fixture.detectChanges();
  }

  afterEach(() => httpMock.verify());

  const text = () => (fixture.nativeElement as HTMLElement).textContent ?? '';

  it('confirms the payment and the emailed receipt without claiming the order was just placed', () => {
    setup({ paid: '1', emailed: '1' });

    expect(text()).toContain('Payment successful.');
    expect(text()).toContain('emailed to jane@example.com');
    expect(text()).not.toContain('Your order has been placed');
  });

  it('tells the client when the receipt email failed', () => {
    setup({ paid: '1', emailed: '0' });

    expect(text()).toContain("couldn't email your receipt");
  });
});

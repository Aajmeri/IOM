import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { ShopReceiptComponent } from './shop-receipt.component';
import { sampleReceipt } from '../../../testing/order-fixtures';

describe('ShopReceiptComponent', () => {
  let fixture: ComponentFixture<ShopReceiptComponent>;
  let component: ShopReceiptComponent;
  let httpMock: HttpTestingController;

  function setup(query: Record<string, string> = {}) {
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function flushReceipt(receipt = sampleReceipt) {
    httpMock.expectOne('/api/orders/order-1/receipt').flush(receipt);
    fixture.detectChanges();
  }

  const text = () => (fixture.nativeElement as HTMLElement).textContent ?? '';

  afterEach(() => httpMock.verify());

  it('renders the receipt lines, total and masked payment details', () => {
    setup();
    flushReceipt();

    expect(text()).toContain('ORD-20261012100000');
    expect(text()).toContain('Widget');
    expect(fixture.nativeElement.querySelector('[data-testid="receipt-total"]').textContent).toContain('$20.00');
    expect(text()).toContain('Visa ending in 4242');
    expect(text()).toContain('SIM-TXN');
    expect(text()).toContain('PAID');
  });

  it('shows the success banner with the email address after checkout', () => {
    setup({ placed: '1', emailed: '1' });
    flushReceipt();

    expect(text()).toContain('Payment successful.');
    expect(text()).toContain('emailed to jane@example.com');
  });

  it('tells the client when the checkout receipt email failed', () => {
    setup({ placed: '1', emailed: '0' });
    flushReceipt();

    expect(text()).toContain("couldn't email your receipt");
  });

  it('marks refunded payments', () => {
    setup();
    flushReceipt({ ...sampleReceipt, paymentStatus: 'Refunded', refundedDate: '2026-10-13T09:00:00Z' });

    expect(text()).toContain('REFUNDED');
    expect(text()).toContain('Refunded on');
  });

  it('Print Receipt calls window.print()', () => {
    setup();
    flushReceipt();
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});

    const button = Array.from(fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>)
      .find(b => b.textContent?.includes('Print Receipt'))!;
    button.click();

    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('Email me a copy resends the receipt and confirms the address', () => {
    setup();
    flushReceipt();

    component.emailReceipt();
    const req = httpMock.expectOne('/api/orders/order-1/receipt/email');
    expect(req.request.method).toBe('POST');
    req.flush(sampleReceipt);
    fixture.detectChanges();

    expect(text()).toContain('A copy of this receipt was sent to jane@example.com.');
  });

  it('shows the server error when resending fails', () => {
    setup();
    flushReceipt();

    component.emailReceipt();
    httpMock.expectOne('/api/orders/order-1/receipt/email').flush(
      { message: 'The receipt email could not be sent. Please try again later.' },
      { status: 502, statusText: 'Bad Gateway' }
    );
    fixture.detectChanges();

    expect(text()).toContain('could not be sent');
  });

  it('shows an error when the receipt cannot be loaded', () => {
    setup();
    httpMock.expectOne('/api/orders/order-1/receipt').flush(
      { message: 'This order has no payment on record, so there is no receipt.' },
      { status: 404, statusText: 'Not Found' }
    );
    fixture.detectChanges();

    expect(text()).toContain('no payment on record');
  });
});

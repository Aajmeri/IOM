import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ScanInComponent } from './scan-in.component';

function keyEvent(key: string, target: EventTarget | null = null): KeyboardEvent {
  return {
    key,
    target,
    preventDefault: vi.fn(),
    stopPropagation: vi.fn()
  } as unknown as KeyboardEvent;
}

describe('ScanInComponent', () => {
  let component: ScanInComponent;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    const fixture = TestBed.createComponent(ScanInComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('stray-scan-blocking heuristic (onDocumentKeydown)', () => {
    it('ignores keydown events on the scan input itself while in the scan state', () => {
      component.state = 'scan';
      const inputEl = document.createElement('input');
      (component as any).scanInputRef = { nativeElement: inputEl };

      component.onDocumentKeydown(keyEvent('1', inputEl));
      component.onDocumentKeydown(keyEvent('Enter', inputEl));

      expect(component.warning).toBe('');
    });

    it('warns and swallows Enter when a fast (scanner-speed) sequence arrives outside the scan state', () => {
      component.state = 'found';
      const now = Date.now();
      vi.spyOn(Date, 'now')
        .mockReturnValueOnce(now)
        .mockReturnValueOnce(now + 5)
        .mockReturnValueOnce(now + 10)
        .mockReturnValueOnce(now + 15)
        .mockReturnValueOnce(now + 20);

      component.onDocumentKeydown(keyEvent('1'));
      component.onDocumentKeydown(keyEvent('2'));
      component.onDocumentKeydown(keyEvent('3'));
      component.onDocumentKeydown(keyEvent('4'));
      const enterEvent = keyEvent('Enter');
      component.onDocumentKeydown(enterEvent);

      expect(component.warning).toContain('barcode was scanned');
      expect(enterEvent.preventDefault).toHaveBeenCalled();
      expect(enterEvent.stopPropagation).toHaveBeenCalled();
    });

    it('does not warn for a short buffer (looks like normal typing), even outside the scan state', () => {
      component.state = 'found';
      component.onDocumentKeydown(keyEvent('a'));
      const enterEvent = keyEvent('Enter');
      component.onDocumentKeydown(enterEvent);

      expect(component.warning).toBe('');
      expect(enterEvent.preventDefault).not.toHaveBeenCalled();
    });

    it('resets the key buffer when keystrokes are slow (elapsed > 75ms apart)', () => {
      component.state = 'found';
      const now = Date.now();
      vi.spyOn(Date, 'now')
        .mockReturnValueOnce(now)
        .mockReturnValueOnce(now + 100)
        .mockReturnValueOnce(now + 200)
        .mockReturnValueOnce(now + 300);

      component.onDocumentKeydown(keyEvent('1'));
      component.onDocumentKeydown(keyEvent('2'));
      component.onDocumentKeydown(keyEvent('3'));
      component.onDocumentKeydown(keyEvent('Enter'));

      expect(component.warning).toBe('');
    });

    it('does not warn while genuinely in the scan state, regardless of buffer length', () => {
      component.state = 'scan';
      component.onDocumentKeydown(keyEvent('1'));
      component.onDocumentKeydown(keyEvent('2'));
      component.onDocumentKeydown(keyEvent('3'));
      component.onDocumentKeydown(keyEvent('Enter'));

      expect(component.warning).toBe('');
    });
  });

  describe('onScanSubmit', () => {
    it('transitions to the found state when the barcode matches a product', () => {
      component.scanValue = '12345';

      component.onScanSubmit();

      const req = httpMock.expectOne('/api/products/by-barcode/12345');
      req.flush({ id: 'p1', name: 'Widget', description: '', price: 1, quantity: 1 });

      expect(component.state).toBe('found');
      expect(component.foundProduct?.id).toBe('p1');
    });

    it('transitions to the notfound state on a 404 and pre-fills the scanned barcode', () => {
      component.scanValue = '99999';

      component.onScanSubmit();

      const req = httpMock.expectOne('/api/products/by-barcode/99999');
      req.flush('not found', { status: 404, statusText: 'Not Found' });

      expect(component.state).toBe('notfound');
      expect(component.newProduct.barcode).toBe('99999');
    });

    it('does nothing when the scan value is blank', () => {
      component.scanValue = '   ';

      component.onScanSubmit();

      httpMock.expectNone(() => true);
    });
  });
});

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { OrderDetailComponent } from './order-detail.component';
import { Order } from '../../services/order.service';
import { DaySlots } from '../../services/availability.service';
import { sampleOrder } from '../../../testing/order-fixtures';

describe('OrderDetailComponent (accept & reschedule)', () => {
  let fixture: ComponentFixture<OrderDetailComponent>;
  let component: OrderDetailComponent;
  let httpMock: HttpTestingController;

  const day: DaySlots[] = [{
    date: '2026-10-20T00:00:00',
    slots: [
      { start: '2026-10-20T08:00:00', end: '2026-10-20T10:00:00', available: false },
      { start: '2026-10-20T10:00:00', end: '2026-10-20T12:00:00', available: true },
      { start: '2026-10-20T12:00:00', end: '2026-10-20T14:00:00', available: true }
    ]
  }];

  function setup(order: Order = sampleOrder) {
    TestBed.configureTestingModule({
      imports: [OrderDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 'order-1' } } } }
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock.expectOne('/api/orders/order-1').flush(order);
    fixture.detectChanges();
  }

  function expectAvailability(date: string): TestRequest {
    return httpMock.expectOne(r =>
      r.url === '/api/availability' && r.params.get('start') === date && r.params.get('end') === date);
  }

  function pickDateAndSlot() {
    component.rescheduleDate = '2026-10-20';
    component.loadRescheduleSlots();
    expectAvailability('2026-10-20').flush(day);
    fixture.detectChanges();
    component.rescheduleSlot = component.rescheduleSlots[0];
  }

  afterEach(() => httpMock.verify());

  const el = () => fixture.nativeElement as HTMLElement;
  const buttons = () => Array.from(el().querySelectorAll('button')) as HTMLButtonElement[];

  it('offers Accept and Reschedule for a pending order', () => {
    setup();

    expect(buttons().some(b => b.textContent?.includes('Accept'))).toBe(true);
    expect(component.canReschedule).toBe(true);
    expect(el().querySelector('#rescheduleDate')).not.toBeNull();
  });

  it('Accept approves the order', () => {
    setup();
    buttons().find(b => b.textContent?.includes('Accept'))!.click();

    const req = httpMock.expectOne('/api/orders/order-1/approve');
    expect(req.request.method).toBe('POST');
    req.flush({ ...sampleOrder, status: 'Approved' });
  });

  it('an approved order can still be rescheduled', () => {
    setup({ ...sampleOrder, status: 'Approved' });

    expect(component.canReschedule).toBe(true);
    expect(el().querySelector('#rescheduleDate')).not.toBeNull();
  });

  it('rejected and cancelled orders cannot be rescheduled', () => {
    setup({ ...sampleOrder, status: 'Rejected' });

    expect(component.canReschedule).toBe(false);
    expect(el().querySelector('#rescheduleDate')).toBeNull();
  });

  it('picking a date loads that day and lists only its open slots', () => {
    setup();
    pickDateAndSlot();

    expect(component.rescheduleSlots.map(s => s.start)).toEqual(['2026-10-20T10:00:00', '2026-10-20T12:00:00']);
  });

  it('says so when the chosen day has no open slots', () => {
    setup();
    component.rescheduleDate = '2026-10-20';
    component.loadRescheduleSlots();
    expectAvailability('2026-10-20').flush([{ ...day[0], slots: day[0].slots.map(s => ({ ...s, available: false })) }]);
    fixture.detectChanges();

    expect(component.rescheduleSlots).toEqual([]);
    expect(el().textContent).toContain('No open delivery slots on this day');
  });

  it('reschedule posts the slot and reason, updates the order and confirms the client was emailed', () => {
    setup();
    pickDateAndSlot();
    component.rescheduleReason = '  Truck unavailable ';
    component.reschedule();

    const req = httpMock.expectOne('/api/orders/order-1/reschedule');
    expect(req.request.body).toEqual({ scheduledDate: '2026-10-20T10:00:00', reason: 'Truck unavailable' });
    req.flush({ ...sampleOrder, scheduledDate: '2026-10-20T10:00:00', adminNotes: 'Truck unavailable' });
    fixture.detectChanges();

    expect(component.order?.scheduledDate).toBe('2026-10-20T10:00:00');
    expect(component.rescheduleMessage).toContain('client has been emailed');
    expect(el().textContent).toContain('client has been emailed');
    expect(component.rescheduleSlot).toBeNull();
    expect(component.rescheduleReason).toBe('');
  });

  it('reschedule without a slot shows an error and sends nothing', () => {
    setup();
    component.reschedule();
    fixture.detectChanges();

    httpMock.expectNone('/api/orders/order-1/reschedule');
    expect(component.rescheduleError).toBe('Choose a new delivery slot.');
  });

  it('reschedule shows the server error', () => {
    setup();
    pickDateAndSlot();
    component.reschedule();

    httpMock.expectOne('/api/orders/order-1/reschedule').flush(
      { message: 'The selected delivery slot is fully booked.' },
      { status: 400, statusText: 'Bad Request' }
    );
    fixture.detectChanges();

    expect(component.rescheduleError).toBe('The selected delivery slot is fully booked.');
    expect(component.order?.scheduledDate).toBe(sampleOrder.scheduledDate);
  });

  it('the date can no longer be edited directly (it must go through Reschedule so the client is told)', () => {
    setup();

    expect(el().querySelector('input[type="datetime-local"]')).toBeNull();
  });

  it('shows the payment status', () => {
    setup();

    expect(el().textContent).toContain('Unpaid');
  });
});

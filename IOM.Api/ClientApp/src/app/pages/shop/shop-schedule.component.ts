import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AvailabilityService, DaySlots, Slot } from '../../services/availability.service';
import { OrderService, SaveOrder } from '../../services/order.service';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-shop-schedule',
  standalone: true,
  imports: [FormsModule, RouterLink, DatePipe, CurrencyPipe, FullCalendarModule],
  templateUrl: './shop-schedule.component.html'
})
export class ShopScheduleComponent implements OnInit {
  private availabilityService = inject(AvailabilityService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  basket = inject(BasketService);

  private daysByDate = new Map<string, DaySlots>();

  selectedDate: string | null = null;
  selectedSlots: Slot[] = [];
  selectedSlot: Slot | null = null;
  notes = '';
  submitting = false;
  error = '';
  loadError = '';

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    height: 'auto',
    headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth' },
    events: (info, successCallback, failureCallback) => {
      const start = info.startStr.substring(0, 10);
      const end = info.endStr.substring(0, 10);
      this.availabilityService.getRange(start, end).subscribe({
        next: days => {
          this.loadError = '';
          const events: EventInput[] = [];
          for (const day of days) {
            this.daysByDate.set(day.date, day);
            const hasAvailable = day.slots.some(s => s.available);
            events.push({
              start: day.date,
              display: 'background',
              color: hasAvailable ? '#28a745' : '#dc3545'
            });
          }
          successCallback(events);
        },
        error: err => {
          this.loadError = 'Failed to load delivery availability.';
          failureCallback(err);
        }
      });
    },
    dateClick: (arg: DateClickArg) => this.onDateClick(arg.dateStr)
  };

  ngOnInit(): void {
    if (this.basket.basket().length === 0) {
      this.router.navigate(['/shop/basket']);
    }
  }

  onDateClick(dateStr: string): void {
    this.error = '';
    const day = this.daysByDate.get(dateStr);
    const openSlots = day ? day.slots.filter(s => s.available) : [];
    if (openSlots.length === 0) {
      this.selectedDate = null;
      this.selectedSlots = [];
      this.selectedSlot = null;
      return;
    }
    this.selectedDate = dateStr;
    this.selectedSlots = openSlots;
    this.selectedSlot = null;
  }

  pickSlot(slot: Slot): void {
    this.selectedSlot = slot;
  }

  changeSlot(): void {
    this.selectedSlot = null;
  }

  submitOrder(): void {
    if (!this.selectedSlot) return;
    this.error = '';
    this.submitting = true;
    const data: SaveOrder = {
      scheduledDate: this.selectedSlot.start,
      notes: this.notes.trim() || null,
      items: this.basket.basket().map(i => ({ productId: i.productId, quantity: i.quantity }))
    };
    this.orderService.create(data).subscribe({
      next: () => {
        this.basket.clear();
        this.submitting = false;
        this.router.navigate(['/shop/orders'], { queryParams: { placed: '1' } });
      },
      error: err => {
        this.error = err.error?.message ?? 'Failed to submit order.';
        this.submitting = false;
      }
    });
  }
}

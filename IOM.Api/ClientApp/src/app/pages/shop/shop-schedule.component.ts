import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AvailabilityService, DaySlots, Slot } from '../../services/availability.service';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-shop-schedule',
  standalone: true,
  imports: [RouterLink, DatePipe, CurrencyPipe, FullCalendarModule],
  templateUrl: './shop-schedule.component.html'
})
export class ShopScheduleComponent {
  private availabilityService = inject(AvailabilityService);
  private router = inject(Router);
  basket = inject(BasketService);

  private daysByDate = new Map<string, DaySlots>();

  selectedDate: string | null = null;
  selectedSlots: Slot[] = [];
  selectedSlot: Slot | null = null;
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
            const dateKey = day.date.substring(0, 10);
            this.daysByDate.set(dateKey, day);
            const hasAvailable = day.slots.some(s => s.available);
            events.push({
              start: dateKey,
              allDay: true,
              display: 'background',
              color: hasAvailable ? '#28a745' : '#adb5bd'
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

  get basketEmpty(): boolean {
    return this.basket.basket().length === 0;
  }

  onDateClick(dateStr: string): void {
    this.error = '';
    const day = this.daysByDate.get(dateStr);
    this.selectedDate = dateStr;
    this.selectedSlots = day ? day.slots : [];
    this.selectedSlot = null;
  }

  pickSlot(slot: Slot): void {
    if (!slot.available) return;
    this.selectedSlot = slot;
  }

  changeSlot(): void {
    this.selectedSlot = null;
  }

  /** The slot travels in the URL so the checkout page survives a refresh; the server re-validates it at payment time. */
  continueToCheckout(): void {
    if (!this.selectedSlot || this.basketEmpty) return;
    this.router.navigate(['/shop/checkout'], {
      queryParams: { start: this.selectedSlot.start, end: this.selectedSlot.end }
    });
  }
}

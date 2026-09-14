import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { DeliveryService, Delivery, DeliveryStatus, SaveDelivery } from '../../services/delivery.service';

const STATUS_COLORS: Record<DeliveryStatus, string> = {
  Scheduled: '#007bff',
  Completed: '#28a745',
  Cancelled: '#6c757d',
  Delayed: '#fd7e14'
};

@Component({
  selector: 'app-delivery-calendar',
  standalone: true,
  imports: [FormsModule, FullCalendarModule],
  templateUrl: './delivery-calendar.component.html'
})
export class DeliveryCalendarComponent {
  private deliveryService = inject(DeliveryService);

  @ViewChild('calendar') calendarRef?: FullCalendarComponent;

  selectedDelivery: Delivery | null = null;
  editModel: { scheduledDate: string; status: DeliveryStatus; notes: string | null } = {
    scheduledDate: '', status: 'Scheduled', notes: ''
  };
  saving = false;
  error = '';

  statuses: DeliveryStatus[] = ['Scheduled', 'Completed', 'Cancelled', 'Delayed'];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    height: 'auto',
    headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth' },
    events: (info, successCallback, failureCallback) => {
      this.deliveryService.calendar(info.startStr, info.endStr).subscribe({
        next: deliveries => successCallback(deliveries.map(d => this.toEvent(d))),
        error: err => failureCallback(err)
      });
    },
    eventClick: (arg: EventClickArg) => this.onEventClick(arg)
  };

  private toEvent(delivery: Delivery): EventInput {
    return {
      id: delivery.id,
      title: delivery.supplierName,
      start: delivery.scheduledDate,
      color: STATUS_COLORS[delivery.status],
      extendedProps: { delivery }
    };
  }

  private onEventClick(arg: EventClickArg): void {
    const delivery = arg.event.extendedProps['delivery'] as Delivery;
    this.selectedDelivery = delivery;
    this.editModel = {
      scheduledDate: delivery.scheduledDate,
      status: delivery.status,
      notes: delivery.notes
    };
    this.error = '';
  }

  closeModal(): void {
    this.selectedDelivery = null;
  }

  saveDelivery(): void {
    if (!this.selectedDelivery) return;
    this.saving = true;
    this.error = '';
    const data: SaveDelivery = {
      supplierId: this.selectedDelivery.supplierId,
      scheduledDate: this.editModel.scheduledDate,
      status: this.editModel.status,
      invoiceId: this.selectedDelivery.invoiceId,
      notes: this.editModel.notes
    };
    this.deliveryService.update(this.selectedDelivery.id, data).subscribe({
      next: () => {
        this.saving = false;
        this.selectedDelivery = null;
        this.calendarRef?.getApi().refetchEvents();
      },
      error: err => {
        this.error = err.error?.message ?? 'Failed to update delivery.';
        this.saving = false;
      }
    });
  }

  deleteDelivery(): void {
    if (!this.selectedDelivery) return;
    if (!confirm('Delete this delivery?')) return;
    this.saving = true;
    this.deliveryService.delete(this.selectedDelivery.id).subscribe({
      next: () => {
        this.saving = false;
        this.selectedDelivery = null;
        this.calendarRef?.getApi().refetchEvents();
      },
      error: () => {
        this.saving = false;
        alert('Failed to delete delivery.');
      }
    });
  }
}

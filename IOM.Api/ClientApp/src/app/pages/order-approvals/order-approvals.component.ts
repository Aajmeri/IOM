import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { OrderService, Order, OrderStatus } from '../../services/order.service';

const STATUS_COLORS: Record<OrderStatus, string> = {
  Pending: '#ffc107',
  Approved: '#28a745',
  Rejected: '#dc3545',
  Cancelled: '#6c757d'
};

type ViewMode = 'list' | 'calendar';

@Component({
  selector: 'app-order-approvals',
  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe, DatePipe, FullCalendarModule],
  templateUrl: './order-approvals.component.html'
})
export class OrderApprovalsComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error = '';
  statusFilter: OrderStatus | '' = 'Pending';
  statuses: OrderStatus[] = ['Pending', 'Approved', 'Rejected', 'Cancelled'];
  view: ViewMode = 'list';

  @ViewChild('calendar') calendarRef?: FullCalendarComponent;

  private orderService = inject(OrderService);
  private router = inject(Router);

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    height: 'auto',
    headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth' },
    events: (info, successCallback) => successCallback(this.toEvents()),
    eventClick: (arg: EventClickArg) => this.onEventClick(arg)
  };

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.orderService.getAll(this.statusFilter).subscribe({
      next: orders => {
        this.orders = orders.sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
        this.loading = false;
        this.calendarRef?.getApi().refetchEvents();
      },
      error: () => {
        this.error = 'Failed to load orders.';
        this.loading = false;
      }
    });
  }

  setView(view: ViewMode): void {
    this.view = view;
  }

  private toEvents(): EventInput[] {
    return this.orders.map(order => ({
      id: order.id,
      title: `${order.clientName} (${order.number})`,
      start: order.scheduledDate,
      color: STATUS_COLORS[order.status]
    }));
  }

  private onEventClick(arg: EventClickArg): void {
    this.router.navigate(['/order-approvals', arg.event.id]);
  }

  statusClass(status: OrderStatus): string {
    switch (status) {
      case 'Approved': return 'badge-success';
      case 'Rejected': return 'badge-danger';
      case 'Cancelled': return 'badge-secondary';
      default: return 'badge-warning';
    }
  }
}

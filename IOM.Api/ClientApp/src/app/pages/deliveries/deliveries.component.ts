import { Component } from '@angular/core';
import { DeliverySearchComponent } from './delivery-search.component';
import { DeliveryCalendarComponent } from './delivery-calendar.component';

@Component({
  selector: 'app-deliveries',
  standalone: true,
  imports: [DeliverySearchComponent, DeliveryCalendarComponent],
  templateUrl: './deliveries.component.html'
})
export class DeliveriesComponent {
  view: 'search' | 'calendar' = 'search';
}

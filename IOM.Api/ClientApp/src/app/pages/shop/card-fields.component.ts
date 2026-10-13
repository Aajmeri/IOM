import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardForm } from './card-form';

/** The card-entry inputs (name, number, expiry, CVC), bound to a page that extends CardForm. */
@Component({
  selector: 'app-card-fields',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card-fields.component.html'
})
export class CardFieldsComponent {
  @Input({ required: true }) form!: CardForm;
}

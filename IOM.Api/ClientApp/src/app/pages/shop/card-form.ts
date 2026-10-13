import { PaymentCard } from '../../services/order.service';
import {
  cardBrand,
  formatCardNumber,
  isCardExpired,
  isValidCardNumber,
  isValidCvc,
  normalizeCardNumber
} from '../../services/card-validation';

/**
 * Card-entry state and validation shared by every page that takes a card payment (checkout,
 * paying for a pay-later order). Pages extend this and render the fields with
 * <app-card-fields [form]="this">.
 */
export abstract class CardForm {
  cardholderName = '';
  cardNumber = '';
  expiryMonth: number | null = null;
  expiryYear: number | null = null;
  cvc = '';

  /** Set when the user first tries to submit; field errors are only shown after that. */
  attempted = false;

  readonly months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: String(i + 1).padStart(2, '0') }));
  readonly years = Array.from({ length: 12 }, (_, i) => new Date().getFullYear() + i);

  get brand(): string {
    return cardBrand(this.cardNumber);
  }

  get nameError(): string | null {
    return this.cardholderName.trim() ? null : 'Enter the name on the card.';
  }

  get numberError(): string | null {
    if (!normalizeCardNumber(this.cardNumber)) return 'Enter your card number.';
    return isValidCardNumber(this.cardNumber) ? null : 'That card number is not valid.';
  }

  get expiryError(): string | null {
    if (this.expiryMonth == null || this.expiryYear == null) return 'Select the expiry month and year.';
    return isCardExpired(this.expiryMonth, this.expiryYear) ? 'This card has expired.' : null;
  }

  get cvcError(): string | null {
    return isValidCvc(this.cvc) ? null : 'Enter the 3 or 4 digit security code.';
  }

  get cardValid(): boolean {
    return !this.nameError && !this.numberError && !this.expiryError && !this.cvcError;
  }

  onCardNumberInput(value: string): void {
    this.cardNumber = formatCardNumber(value);
  }

  onCvcInput(value: string): void {
    this.cvc = (value ?? '').replace(/\D/g, '').slice(0, 4);
  }

  /** The card as the API expects it. Only call once cardValid is true. */
  protected cardPayload(): PaymentCard {
    return {
      cardholderName: this.cardholderName.trim(),
      cardNumber: normalizeCardNumber(this.cardNumber),
      expiryMonth: this.expiryMonth!,
      expiryYear: this.expiryYear!,
      cvc: this.cvc
    };
  }

  /** Extracts a display message from an API error: { message } or ASP.NET's { errors: { field: [..] } }. */
  protected apiErrorMessage(err: any, fallback: string): string {
    const body = err?.error;
    if (body?.message) return body.message;
    const first = body?.errors ? Object.values(body.errors)[0] : null;
    return Array.isArray(first) && first.length ? String(first[0]) : fallback;
  }
}

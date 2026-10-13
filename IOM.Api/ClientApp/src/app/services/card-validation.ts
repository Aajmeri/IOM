/**
 * Client-side card checks for the checkout form. These mirror IOM.Service's CardHelper so the
 * form rejects the same input the API would. The server re-validates every card regardless.
 */

export function normalizeCardNumber(value: string | null | undefined): string {
  return (value ?? '').replace(/[\s-]/g, '');
}

/** Groups digits in fours as the user types ("4242424242424242" -> "4242 4242 4242 4242"). */
export function formatCardNumber(value: string | null | undefined): string {
  const digits = (value ?? '').replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

export function isValidCardNumber(value: string | null | undefined): boolean {
  const digits = normalizeCardNumber(value);
  if (!/^\d{12,19}$/.test(digits)) return false;

  // Luhn checksum.
  let sum = 0;
  let doubleIt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (doubleIt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    doubleIt = !doubleIt;
  }
  return sum % 10 === 0;
}

/** A card is valid through the end of its expiry month. Accepts 2- or 4-digit years. */
export function isCardExpired(month: number, year: number, now: Date = new Date()): boolean {
  if (!Number.isInteger(month) || month < 1 || month > 12) return true;
  const fullYear = year < 100 ? 2000 + year : year;
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  return fullYear < nowYear || (fullYear === nowYear && month < nowMonth);
}

export function isValidCvc(value: string | null | undefined): boolean {
  return /^\d{3,4}$/.test(value ?? '');
}

export function cardBrand(value: string | null | undefined): string {
  const digits = normalizeCardNumber(value);
  if (digits.startsWith('4')) return 'Visa';
  if (/^3[47]/.test(digits)) return 'American Express';
  const two = Number(digits.slice(0, 2));
  const four = Number(digits.slice(0, 4));
  if ((two >= 51 && two <= 55) || (digits.length >= 4 && four >= 2221 && four <= 2720)) return 'Mastercard';
  if (digits.startsWith('6011') || digits.startsWith('65')) return 'Discover';
  return '';
}

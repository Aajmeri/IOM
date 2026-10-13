import {
  cardBrand,
  formatCardNumber,
  isCardExpired,
  isValidCardNumber,
  isValidCvc,
  normalizeCardNumber
} from './card-validation';

describe('card-validation', () => {
  it('normalizeCardNumber() strips spaces and dashes', () => {
    expect(normalizeCardNumber('4242 4242-4242 4242')).toBe('4242424242424242');
    expect(normalizeCardNumber(null)).toBe('');
  });

  it('formatCardNumber() groups digits in fours and drops non-digits', () => {
    expect(formatCardNumber('4242424242424242')).toBe('4242 4242 4242 4242');
    expect(formatCardNumber('4242a42')).toBe('4242 42');
    expect(formatCardNumber('4242 ')).toBe('4242');
  });

  it('isValidCardNumber() accepts Luhn-valid numbers', () => {
    expect(isValidCardNumber('4242 4242 4242 4242')).toBe(true);
    expect(isValidCardNumber('5555555555554444')).toBe(true);
    expect(isValidCardNumber('378282246310005')).toBe(true);
  });

  it('isValidCardNumber() rejects bad checksums, short numbers and non-digits', () => {
    expect(isValidCardNumber('4242424242424241')).toBe(false);
    expect(isValidCardNumber('42424242')).toBe(false);
    expect(isValidCardNumber('4242abcd42424242')).toBe(false);
    expect(isValidCardNumber('')).toBe(false);
  });

  it('isCardExpired() treats a card as valid through the end of its expiry month', () => {
    const now = new Date(2026, 9, 31); // 31 Oct 2026
    expect(isCardExpired(10, 2026, now)).toBe(false);
    expect(isCardExpired(10, 26, now)).toBe(false);
    expect(isCardExpired(9, 2026, now)).toBe(true);
    expect(isCardExpired(12, 2025, now)).toBe(true);
    expect(isCardExpired(13, 2030, now)).toBe(true);
  });

  it('isValidCvc() requires 3 or 4 digits', () => {
    expect(isValidCvc('123')).toBe(true);
    expect(isValidCvc('1234')).toBe(true);
    expect(isValidCvc('12')).toBe(false);
    expect(isValidCvc('12a')).toBe(false);
  });

  it('cardBrand() detects common brands', () => {
    expect(cardBrand('4242424242424242')).toBe('Visa');
    expect(cardBrand('5555555555554444')).toBe('Mastercard');
    expect(cardBrand('2223003122003222')).toBe('Mastercard');
    expect(cardBrand('378282246310005')).toBe('American Express');
    expect(cardBrand('6011111111111117')).toBe('Discover');
    expect(cardBrand('9999')).toBe('');
  });
});

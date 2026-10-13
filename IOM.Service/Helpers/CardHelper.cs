using System;
using System.Linq;

namespace IOM.Service.Helpers
{
    /// <summary>
    /// Card-number checks shared by the API's checkout validator and SimulatedPaymentService, so
    /// a card the form accepts is never then rejected by the gateway as malformed (or vice versa).
    /// </summary>
    public static class CardHelper
    {
        /// <summary>Strips the spaces/dashes people type between digit groups.</summary>
        public static string Normalize(string cardNumber)
            => new string((cardNumber ?? string.Empty).Where(c => c != ' ' && c != '-').ToArray());

        public static bool IsValidNumber(string cardNumber)
        {
            var digits = Normalize(cardNumber);
            if (digits.Length < 12 || digits.Length > 19 || !digits.All(char.IsAsciiDigit)) return false;

            // Luhn checksum.
            var sum = 0;
            var doubleIt = false;
            for (var i = digits.Length - 1; i >= 0; i--)
            {
                var d = digits[i] - '0';
                if (doubleIt)
                {
                    d *= 2;
                    if (d > 9) d -= 9;
                }
                sum += d;
                doubleIt = !doubleIt;
            }
            return sum % 10 == 0;
        }

        /// <summary>Accepts 2- or 4-digit years. A card is valid through the end of its expiry month.</summary>
        public static bool IsExpired(int expiryMonth, int expiryYear, DateTime now)
        {
            if (expiryMonth < 1 || expiryMonth > 12) return true;
            var year = NormalizeYear(expiryYear);
            return year < now.Year || (year == now.Year && expiryMonth < now.Month);
        }

        public static int NormalizeYear(int expiryYear) => expiryYear < 100 ? 2000 + expiryYear : expiryYear;

        public static bool IsValidCvc(string cvc)
            => !string.IsNullOrEmpty(cvc) && (cvc.Length == 3 || cvc.Length == 4) && cvc.All(char.IsAsciiDigit);

        public static string GetBrand(string cardNumber)
        {
            var digits = Normalize(cardNumber);
            if (digits.StartsWith("4")) return "Visa";
            if (digits.StartsWith("34") || digits.StartsWith("37")) return "American Express";
            if (digits.Length >= 2 && int.TryParse(digits.Substring(0, 2), out var two) && two >= 51 && two <= 55) return "Mastercard";
            if (digits.Length >= 4 && int.TryParse(digits.Substring(0, 4), out var four) && four >= 2221 && four <= 2720) return "Mastercard";
            if (digits.StartsWith("6011") || digits.StartsWith("65")) return "Discover";
            return "Card";
        }

        public static string GetLast4(string cardNumber)
        {
            var digits = Normalize(cardNumber);
            return digits.Length >= 4 ? digits.Substring(digits.Length - 4) : digits;
        }
    }
}

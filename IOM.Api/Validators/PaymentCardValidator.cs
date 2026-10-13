using System;
using FluentValidation;
using IOM.Api.Resources;
using IOM.Service.Helpers;

namespace IOM.Api.Validators
{
    /// <summary>
    /// Used both for the card inside a checkout and directly as the body of
    /// POST api/orders/{id}/pay (paying a pay-later order).
    /// </summary>
    public class PaymentCardValidator : AbstractValidator<PaymentCardResource>
    {
        public PaymentCardValidator()
        {
            RuleFor(p => p.CardholderName)
                .NotEmpty()
                .MaximumLength(128);

            RuleFor(p => p.CardNumber)
                .NotEmpty()
                .Must(CardHelper.IsValidNumber)
                .WithMessage("Card number is invalid.");

            RuleFor(p => p.ExpiryMonth)
                .InclusiveBetween(1, 12);

            RuleFor(p => p)
                .Must(p => !CardHelper.IsExpired(p.ExpiryMonth, p.ExpiryYear, DateTime.UtcNow))
                .WithName("Expiry")
                .WithMessage("Card has expired.")
                .When(p => p.ExpiryMonth >= 1 && p.ExpiryMonth <= 12);

            RuleFor(p => p.Cvc)
                .Must(CardHelper.IsValidCvc)
                .WithMessage("Security code (CVC) must be 3 or 4 digits.");
        }
    }
}

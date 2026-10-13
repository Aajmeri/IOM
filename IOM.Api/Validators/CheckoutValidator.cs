using FluentValidation;
using IOM.Api.Resources;

namespace IOM.Api.Validators
{
    public class CheckoutValidator : AbstractValidator<CheckoutResource>
    {
        public CheckoutValidator()
        {
            Include(new SaveOrderValidator());

            // Pay later: any card sent along is ignored, so it isn't validated either.
            When(x => !x.PayLater, () =>
            {
                RuleFor(x => x.Payment)
                    .NotNull()
                    .WithMessage("Payment details are required.")
                    .SetValidator(new PaymentCardValidator());
            });
        }
    }
}

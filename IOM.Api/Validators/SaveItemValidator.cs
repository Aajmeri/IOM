using FluentValidation;
using IOM.Api.Resources;

namespace IOM.Api.Validators
{
    public class SaveItemValidator : AbstractValidator<SaveItemResource>
    {
        public SaveItemValidator()
        {
            RuleFor(x => x.ProductId)
                .NotEmpty();

            RuleFor(x => x.Quantity)
                .GreaterThan(0);
        }
    }
}

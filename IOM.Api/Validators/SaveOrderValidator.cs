using FluentValidation;
using IOM.Api.Resources;

namespace IOM.Api.Validators
{
    public class SaveOrderValidator : AbstractValidator<SaveOrderResource>
    {
        public SaveOrderValidator()
        {
            RuleFor(x => x.ScheduledDate)
                .NotEmpty();

            RuleFor(x => x.Items)
                .NotEmpty()
                .Must(items => items != null && items.Count > 0)
                .WithMessage("At least one item is required.");

            RuleForEach(x => x.Items).ChildRules(item =>
            {
                item.RuleFor(i => i.ProductId).NotEmpty();
                item.RuleFor(i => i.Quantity).GreaterThan(0);
            });
        }
    }
}

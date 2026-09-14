using FluentValidation;
using IOM.Api.Resources;

namespace IOM.Api.Validators
{
    public class SaveProductValidator : AbstractValidator<SaveProductResource>
    {
        public SaveProductValidator()
        {
            RuleFor(x => x.SupplierId)
                .NotEmpty();
        }
    }
}

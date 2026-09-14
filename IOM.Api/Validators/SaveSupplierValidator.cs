using FluentValidation;
using IOM.Api.Resources;

namespace IOM.Api.Validators
{
    public class SaveSupplierValidator : AbstractValidator<SaveSupplierResource>
    {
        public SaveSupplierValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty();
        }
    }
}

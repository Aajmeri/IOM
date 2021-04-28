using FluentValidation;
using IOM.Core.Models;

namespace IOM.Api.Validators
{
    public class ItemValidator : AbstractValidator<Item>
    {
        public ItemValidator()
        {
            // RuleFor(x => x.)
            //     .NotEmpty()
            //     .Matches("^[a-zA-Z0-9 ]*$"); 
        }
    }
}
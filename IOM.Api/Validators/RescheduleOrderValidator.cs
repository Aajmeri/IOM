using FluentValidation;
using IOM.Api.Resources;

namespace IOM.Api.Validators
{
    public class RescheduleOrderValidator : AbstractValidator<RescheduleOrderResource>
    {
        public RescheduleOrderValidator()
        {
            RuleFor(x => x.ScheduledDate)
                .NotEmpty();

            RuleFor(x => x.Reason)
                .MaximumLength(1000);
        }
    }
}

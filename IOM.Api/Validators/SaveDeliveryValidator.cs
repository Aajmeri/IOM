using System;
using FluentValidation;
using IOM.Api.Resources;
using IOM.Core.Models;

namespace IOM.Api.Validators
{
    public class SaveDeliveryValidator : AbstractValidator<SaveDeliveryResource>
    {
        public SaveDeliveryValidator()
        {
            RuleFor(x => x.SupplierId)
                .NotEmpty();

            RuleFor(x => x.ScheduledDate)
                .NotEmpty();

            RuleFor(x => x.Status)
                .Must(status => Enum.TryParse<DeliveryStatus>(status, true, out _))
                .WithMessage($"Status must be one of: {string.Join(", ", Enum.GetNames(typeof(DeliveryStatus)))}");
        }
    }
}

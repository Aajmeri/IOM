using FluentValidation;
using IOM.Api.Controllers.Api;

namespace IOM.Api.Validators
{
    public static class Roles
    {
        public static readonly string[] All = { "Admin", "Warehouse", "Client" };
    }

    // Mirrors what the register form already requires (name, a valid email, a password). No
    // password-strength policy is imposed here; that would be a product decision.
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(256);
            RuleFor(x => x.Password).NotEmpty();
        }
    }

    public class UpdateUserRequestValidator : AbstractValidator<UpdateUserRequest>
    {
        public UpdateUserRequestValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Role)
                .Must(role => System.Array.IndexOf(Roles.All, role) >= 0)
                .WithMessage("Role must be one of: Admin, Warehouse, Client.");
        }
    }
}

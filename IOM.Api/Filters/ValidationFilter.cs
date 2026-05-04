using System.Linq;
using System.Threading.Tasks;
using IOM.Api.Contracts.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace IOM.Api.Filters
{
    public class ValidationFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // Only short-circuit for API (JSON body) requests — let MVC form actions handle their own validation
            var descriptor = context.ActionDescriptor as ControllerActionDescriptor;
            var hasFromBody = descriptor?.Parameters
                .Any(p => p.BindingInfo?.BindingSource == BindingSource.Body) ?? false;

            if (!context.ModelState.IsValid && hasFromBody)
            {
                var errorsInModelState = context.ModelState
                    .Where(i => i.Value.Errors.Count > 0)
                    .ToDictionary(kvp => kvp.Key, kvp => kvp.Value.Errors.Select(i => i.ErrorMessage)).ToArray();

                var errorResponse = new ErrorResponse();

                foreach (var error in errorsInModelState)
                {
                    foreach (var subError in error.Value)
                    {
                        errorResponse.Error.Add(new ErrorModel
                        {
                            FieldName = error.Key,
                            Message = subError
                        });
                    }
                }

                context.Result = new BadRequestObjectResult(errorResponse);
                return;
            }

            await next();
        }
    }
}
using System;
using System.Threading.Tasks;
using IOM.Api.Mapping;
using IOM.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IOM.Api.Controllers.Api
{
    [ApiController]
    [Route("api/availability")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AvailabilityApiController : ControllerBase
    {
        private readonly IAvailabilityService _availabilityService;
        private readonly OrderMapper _mapper;

        public AvailabilityApiController(IAvailabilityService availabilityService, OrderMapper mapper)
        {
            _availabilityService = availabilityService;
            _mapper = mapper;
        }

        // Any authenticated role - no sensitive data is exposed, only booleans for whether a
        // slot is bookable right now.
        [HttpGet]
        public async Task<IActionResult> GetAvailability([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            var (availability, error) = await _availabilityService.GetAvailability(start, end);
            if (error != null) return BadRequest(new { message = error });

            return Ok(_mapper.ToResource(availability));
        }
    }
}

using System;
using System.Threading.Tasks;
using IOM.Api.Mapping;
using IOM.Core.Models;
using IOM.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IOM.Api.Controllers.Api
{
    [ApiController]
    [Route("api/users")]
    [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UsersApiController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserMapper _mapper;

        public UsersApiController(IUserService userService, UserMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(_mapper.ToResource(users));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(_mapper.ToResource(user));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUserRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var user = await _userService.GetByIdAsync(id);
            if (user == null) return NotFound();
            await _userService.UpdateUser(user, new User
            {
                Name = request.Name,
                Role = request.Role,
                Active = request.Active
            });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null) return NotFound();
            await _userService.DeleteUser(user);
            return NoContent();
        }
    }

    public class UpdateUserRequest
    {
        public string Name { get; set; }
        public string Role { get; set; }
        public bool Active { get; set; }
    }
}

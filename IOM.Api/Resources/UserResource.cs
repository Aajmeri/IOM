using System;

namespace IOM.Api.Resources
{
    /// <summary>A user as returned by api/users. Deliberately has no Password (hash) property.</summary>
    public class UserResource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public bool Active { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}

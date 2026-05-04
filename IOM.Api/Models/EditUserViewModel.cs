using System;
using System.ComponentModel.DataAnnotations;

namespace IOM.Api.Models
{
    public class EditUserViewModel
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public string Email { get; set; }

        [Required]
        public string Role { get; set; }

        public bool Active { get; set; }
    }
}

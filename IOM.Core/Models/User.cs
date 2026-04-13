using System;
using System.ComponentModel.DataAnnotations;

namespace IOM.Core.Models
{
    public class User : Base
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}

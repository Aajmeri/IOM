using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IOM.Core.Models
{
    public abstract class Base
    {
        public bool Active { get; set; }

        public Guid? CreatedById {get; set;}
        public Guid? UpdatedById {get; set;}

        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

    }
}

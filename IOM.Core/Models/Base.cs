using System;

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

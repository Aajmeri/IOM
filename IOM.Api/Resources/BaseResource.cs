using System;
using System.Collections.Generic;
using IOM.Core.Models;

namespace IOM.Api.Resources
{
    public class BaseResource
    {
        private DateTime? createdDate;
        private DateTime? updatedDate;
        public bool Active { get; set; }

        public Guid? CreatedById {get; set;}
        public Guid? UpdatedById {get; set;}

        public DateTime? CreatedDate
        {
            get { return createdDate; }
            set
            {
                createdDate = createdDate == null ? DateTime.UtcNow : value;
            }
        }
        public DateTime? UpdatedDate
        {
            get { return updatedDate; }
            set
            {
                updatedDate = updatedDate == null ? DateTime.UtcNow : value;
            }
        }
    }
}
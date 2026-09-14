using System;

namespace IOM.Api.Resources
{
    public class SlotResource
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool Available { get; set; }
    }
}

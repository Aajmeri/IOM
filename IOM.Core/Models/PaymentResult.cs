namespace IOM.Core.Models
{
    public class PaymentResult
    {
        public bool Succeeded { get; set; }
        public string TransactionId { get; set; }
        public string CardBrand { get; set; }
        public string CardLast4 { get; set; }
        public string DeclineReason { get; set; }
    }
}

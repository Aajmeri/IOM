namespace IOM.Core.Models
{
    /// <summary>
    /// Raw card input for a single charge. Passed straight through to <c>IPaymentService</c> and
    /// never persisted - see <see cref="Payment"/> for what is actually stored.
    /// </summary>
    public class CardDetails
    {
        public string CardholderName { get; set; }
        public string CardNumber { get; set; }
        public int ExpiryMonth { get; set; }
        public int ExpiryYear { get; set; }
        public string Cvc { get; set; }
    }
}

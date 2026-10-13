namespace IOM.Api.Resources
{
    /// <summary>
    /// Client checkout: the order (slot, notes, items) plus the card to pay with. The amount is
    /// deliberately absent - the server always computes it from the order lines.
    /// </summary>
    public class CheckoutResource : SaveOrderResource
    {
        public PaymentCardResource Payment { get; set; }

        // True = place the order now and pay later; Payment is then ignored.
        public bool PayLater { get; set; }
    }

    public class PaymentCardResource
    {
        public string CardholderName { get; set; }
        public string CardNumber { get; set; }
        public int ExpiryMonth { get; set; }
        public int ExpiryYear { get; set; }
        public string Cvc { get; set; }
    }
}

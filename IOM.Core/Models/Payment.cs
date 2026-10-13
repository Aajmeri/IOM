using System;
using System.ComponentModel.DataAnnotations;

namespace IOM.Core.Models
{
    /// <summary>
    /// The card payment taken for an <see cref="Order"/> at checkout (one-to-one). Only what a
    /// receipt needs is stored - the brand and last four digits. The full card number and CVC
    /// are never persisted.
    /// </summary>
    public class Payment
    {
        [Key]
        public Guid Id { get; set; }

        public Guid OrderId { get; set; }
        public Order Order { get; set; }

        public decimal Amount { get; set; }

        public PaymentStatus Status { get; set; } = PaymentStatus.Paid;

        [MaxLength(32)]
        public string Method { get; set; } = "Card";

        [MaxLength(32)]
        public string CardBrand { get; set; }

        [MaxLength(4)]
        public string CardLast4 { get; set; }

        [MaxLength(128)]
        public string CardholderName { get; set; }

        [MaxLength(64)]
        public string TransactionId { get; set; }

        public DateTime PaidDate { get; set; }

        public DateTime? RefundedDate { get; set; }
    }

    public enum PaymentStatus
    {
        Paid,
        Refunded
    }
}

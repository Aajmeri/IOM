using System;
using IOM.Service.Helpers;
using Xunit;

namespace IOM.Tests.Unit.Services
{
    public class CardHelperTests
    {
        [Theory]
        [InlineData("4242424242424242")]
        [InlineData("4242 4242 4242 4242")]
        [InlineData("4242-4242-4242-4242")]
        [InlineData("5555555555554444")]
        [InlineData("378282246310005")]
        public void IsValidNumber_LuhnValidNumbers_ReturnsTrue(string number)
        {
            Assert.True(CardHelper.IsValidNumber(number));
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("4242424242424241")] // fails Luhn
        [InlineData("42424242")]         // too short
        [InlineData("4242abcd42424242")]
        public void IsValidNumber_InvalidNumbers_ReturnsFalse(string number)
        {
            Assert.False(CardHelper.IsValidNumber(number));
        }

        [Fact]
        public void IsExpired_CardValidThroughEndOfExpiryMonth()
        {
            var now = new DateTime(2026, 10, 31);

            Assert.False(CardHelper.IsExpired(10, 2026, now));
            Assert.False(CardHelper.IsExpired(10, 26, now));
            Assert.True(CardHelper.IsExpired(9, 2026, now));
            Assert.True(CardHelper.IsExpired(12, 2025, now));
            Assert.True(CardHelper.IsExpired(13, 2030, now));
        }

        [Theory]
        [InlineData("123", true)]
        [InlineData("1234", true)]
        [InlineData("12", false)]
        [InlineData("12a", false)]
        [InlineData(null, false)]
        public void IsValidCvc(string cvc, bool expected)
        {
            Assert.Equal(expected, CardHelper.IsValidCvc(cvc));
        }

        [Theory]
        [InlineData("4242424242424242", "Visa")]
        [InlineData("5555555555554444", "Mastercard")]
        [InlineData("2223003122003222", "Mastercard")]
        [InlineData("378282246310005", "American Express")]
        [InlineData("6011111111111117", "Discover")]
        public void GetBrand(string number, string brand)
        {
            Assert.Equal(brand, CardHelper.GetBrand(number));
        }

        [Fact]
        public void GetLast4_IgnoresSeparators()
        {
            Assert.Equal("4242", CardHelper.GetLast4("4242 4242 4242 4242"));
        }
    }
}

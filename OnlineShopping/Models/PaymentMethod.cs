using System;
using System.Collections.Generic;

#nullable disable

namespace OnlineShopping.Models
{
    public partial class PaymentMethod
    {
        public PaymentMethod()
        {
            Payments = new HashSet<Payment>();
        }

        public int PaymentMethodId { get; set; }
        public string Type { get; set; }
        public string Provider { get; set; }
        public string Available { get; set; }
        public string Reason { get; set; }

        public virtual ICollection<Payment> Payments { get; set; }
    }
}

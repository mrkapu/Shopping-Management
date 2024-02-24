using System;
using System.Collections.Generic;

#nullable disable

namespace OnlineShopping.Models
{
    public partial class Payment
    {
        public Payment()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public int PaymentMethodId { get; set; }
        public int TotalAmount { get; set; }
        public int ShippingCharges { get; set; }
        public int AmountReduced { get; set; }
        public int AmountPaid { get; set; }
        public string CreatedAt { get; set; }

        public virtual PaymentMethod PaymentMethod { get; set; }
        public virtual UserDetail User { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}

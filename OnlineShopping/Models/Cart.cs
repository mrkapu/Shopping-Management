using System;
using System.Collections.Generic;

#nullable disable

namespace OnlineShopping.Models
{
    public partial class Cart
    {
        public Cart()
        {
            CartItems = new HashSet<CartItem>();
            Orders = new HashSet<Order>();
        }

        public int CartId { get; set; }
        public int UserId { get; set; }
        public string Ordered { get; set; }
        public DateTime OrderedOn { get; set; }

        public virtual UserDetail User { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}

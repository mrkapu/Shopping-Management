using System;
using System.Collections.Generic;

#nullable disable

namespace OnlineShopping.Models
{
    public partial class CartItem
    {
        public int CartItemId { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }

        public virtual Cart Cart { get; set; }
    }
}

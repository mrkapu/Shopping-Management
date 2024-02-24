using System;
using System.Collections.Generic;

#nullable disable

namespace OnlineShopping.Models
{
    public partial class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CartId { get; set; }
        public int PaymentId { get; set; }
        public string CreatedAt { get; set; }

        public virtual Cart Cart { get; set; }
        public virtual Payment Payment { get; set; }
        public virtual UserDetail User { get; set; }
    }
}

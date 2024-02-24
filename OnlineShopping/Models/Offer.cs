using System;
using System.Collections.Generic;

#nullable disable

namespace OnlineShopping.Models
{
    public partial class Offer
    {
        public Offer()
        {
            Products = new HashSet<Product>();
        }

        public int OfferId { get; set; }
        public string Title { get; set; }
        public int Discount { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}

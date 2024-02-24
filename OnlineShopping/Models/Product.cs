using System;
using System.Collections.Generic;

#nullable disable

namespace OnlineShopping.Models
{
    public partial class Product
    {
        public int ProductId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int OfferId { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string ImageName { get; set; }

        public  ProductCategory Category { get; set; }

        public Offer Offer { get; set; }
    }
}

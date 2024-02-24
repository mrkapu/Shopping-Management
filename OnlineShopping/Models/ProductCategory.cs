using System;
using System.Collections.Generic;

#nullable disable

namespace OnlineShopping.Models
{
    public partial class ProductCategory
    {
        //public ProductCategory()
        //{
        //    Products = new HashSet<Product>();
        //}

        public int CategoryId { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }

      //  public virtual ICollection<Product> Products { get; set; }
    }
}

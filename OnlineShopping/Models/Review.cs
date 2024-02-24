using System;
using System.Collections.Generic;

#nullable disable

namespace OnlineShopping.Models
{
    public partial class Review
    {
        public int ReviewId { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string Review1 { get; set; }
        public string CreatedAt { get; set; }

        public virtual UserDetail User { get; set; }
    }
}

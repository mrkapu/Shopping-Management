using System;
using System.Collections.Generic;

#nullable disable

namespace OnlineShopping.Models
{
    public partial class UserDetail
    {
        //public UserDetail()
        //{
        //    Carts = new HashSet<Cart>();
        //    Orders = new HashSet<Order>();
        //    Payments = new HashSet<Payment>();
        //    Reviews = new HashSet<Review>();
        //}

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }

        //public virtual ICollection<Cart> Carts { get; set; }
        //public virtual ICollection<Order> Orders { get; set; }
        //public virtual ICollection<Payment> Payments { get; set; }
        //public virtual ICollection<Review> Reviews { get; set; }
    }
}

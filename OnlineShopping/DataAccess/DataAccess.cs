using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OnlineShopping.Encrypt;
using OnlineShopping.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace OnlineShopping.DataAccess
{
    public class DataAccess : IDataAccess
    {
        private readonly ShoppingManagementContext _Context;
        private readonly string dateFormat;

        public DataAccess(ShoppingManagementContext context)
        {
            _Context = context;

        }

        public async Task<List<ProductCategory>> GetProductCategories()
        {
            var productCategory = new List<ProductCategory>();
            productCategory = await _Context.ProductCategories.ToListAsync();
            return productCategory;
        }
        
        public ProductCategory getCategoryById(int categoryId)
        {
            return _Context.ProductCategories.Where(x => x.CategoryId == categoryId).FirstOrDefault();
        }

        public Offer GetOffersById(int offerId)
        {
            return  _Context.Offers.Where(x => x.OfferId== offerId).FirstOrDefault();

        }
        public async Task<List<Product>> GetProductsList(string category, string subcategory, int count)
        {
            
            string StoredProc = "exec GetProdcuts " +
           "@count= " + count + "," +
           "@category= '" + category + "'," +
           "@subcategory= '" + subcategory + "'";


            var products= await _Context.Products.FromSqlRaw(StoredProc).ToListAsync();
            products.Select(p => new Product
            {

                ProductId = p.ProductId,
                Title = p.Title,
                Description = p.Description,
                Price = p.Price,
                Quantity = p.Quantity,
                ImageName = p.ImageName,
                Category = getCategoryById(p.CategoryId),
                Offer = GetOffersById(p.OfferId)

            }).ToList();

            //List<Product> prod = new List<Product>();
                


            return products;
        }

        public async Task<Product> getProductDetail(int productId)
        {
            var  product=await _Context.Products.Where(x=>x.ProductId==productId).FirstOrDefaultAsync();
            product.Category = getCategoryById(product.CategoryId);
            product.Offer = GetOffersById(product.OfferId);
            
            return product;
        }

        public async Task<bool> submitRegister(UserDetail user)
        {
            if (await checkUsernameExistvalidation(user.Username))
            {
                return false;
            }
                //user.CreatedAt = DateTime.Now;
                //user.ModifiedAt = DateTime.Now;
                user.Password= Encryption.EncodePasswordToBase64(user.Password);
                _Context.UserDetails.Add(user);
                await _Context.SaveChangesAsync();
            
            return true;
        }

        public string checkPasswordstrength(string password)
        {
            StringBuilder builder = new StringBuilder();
            if (password.Length < 8)
            {
                builder.Append("Minimum Password Length Shuold be 8 !" + Environment.NewLine);
            }
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")))
            {
                builder.Append("Password Shuold be Alphanumeric !" + Environment.NewLine);
            }
            if (!(Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]")))
            {
                builder.Append("Password Shuold be contain Specail Characters!" + Environment.NewLine);
            }
            return builder.ToString();
        }

        public Task<bool> checkUsernameExistvalidation(string username)
      => _Context.UserDetails.AnyAsync(x => x.Username== username);

        public async Task<bool> checkUserLogin(UserDetail user)
        {
            var userdetail = await _Context.UserDetails.FirstOrDefaultAsync(x => x.Username == user.Username);
            if (userdetail == null)
            {
                return false;
            }
            if (!(Encryption.DecodeFrom64(userdetail.Password) == user.Password))
            {
                return false ;
            }

            return true;
        }
    }
}

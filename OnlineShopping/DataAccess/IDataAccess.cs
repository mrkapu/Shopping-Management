using OnlineShopping.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShopping.DataAccess
{
    public interface IDataAccess
    {
        Task<List<ProductCategory>> GetProductCategories();
        Offer GetOffersById(int offerId);
        ProductCategory getCategoryById(int categoryId);
        Task<List<Product>> GetProductsList(string category,string subcategory,int count);
        Task<Product> getProductDetail(int productId);
        Task<bool> submitRegister(UserDetail user);
        string checkPasswordstrength(string password);
        Task<bool> checkUsernameExistvalidation(string username);
        Task<bool> checkUserLogin(UserDetail user);


    }
}

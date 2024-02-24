using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OnlineShopping.DataAccess;
using OnlineShopping.Models;
//using OnlineShopping.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        readonly IDataAccess _data;
        public ShoppingController(IDataAccess dataAccess)
        {
            this._data = dataAccess;
        }

        [HttpGet("GetCategoryList")]
        public IActionResult GetProductCategoryList()
        {
            var Category = _data.GetProductCategories();

            return Ok(Category.Result);
        }
        [HttpGet("GetProducts")]
        public IActionResult GetProductsList(string category, string subcategory, int count)
        {
            var Category = _data.GetProductsList(category, subcategory, count);

            return Ok(Category.Result);
        }
        [HttpGet("GetProductDetails")]
        public IActionResult GetProductsDetails(int productId)
        {
            var Category = _data.getProductDetail(productId);

            return Ok(Category.Result);
        }
        [HttpPost("SubmitUser")]
        public async Task<IActionResult> submitUser(UserDetail user)
         {

            var pass = _data.checkPasswordstrength(user.Password);
            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { Message = pass });
            }
            user.CreatedAt = DateTime.Now;
            user.ModifiedAt = DateTime.Now;

            var result = await _data.submitRegister(user);
            string? message;
            if (result) message = "inserted";
            else message = "email already Exist";

            return Ok(new
            {
                message = message
            });
        }

        [HttpPost("authenticateLogin")]
        public async Task<IActionResult> authenticateLogin(UserDetail user)
        {
            try
            {
                var employeeToken="";
                if (user == null)
                    return BadRequest(new { message = "Please Enter valid Username" });

                var Userlogin = await _data.checkUserLogin(user);
                string? message;
                if (Userlogin)
                {
                    message = "Login SuccessFully";
                    employeeToken = CreatejwtToken(user);
                }
                else message = "Username or Password is wrong";
                return Ok(new
                {
                    Token = employeeToken,
                    message = message
                }) ;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        private string CreatejwtToken(UserDetail user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("JaiShreeKrishna..");
            var identity = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.Role,"user"),
                new Claim("FirstName",$"{user.FirstName}"),
                new Claim("LastName",$"{user.LastName}"),
                new Claim("Address",$"{user.Address}"),
                new Claim("Mobile",$"{user.Mobile}"),
                new Claim("CreatedAt",$"{user.CreatedAt}"),
                
                new Claim("Username",$"{user.Username}")
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescripter = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddMinutes(10),
                SigningCredentials = credentials

            };
            var token = jwtTokenHandler.CreateToken(tokenDescripter);

            return jwtTokenHandler.WriteToken(token);
        }





        //private string CreateRefreshToken()
        //{
        //    var refreshToken = "";
        //    // Create an instance of the RandomNumberGenerator class
        //    using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        //    {
        //        // Specify the number of bytes you want to generate
        //        int numberOfBytes = 64; // 16 bytes for example

        //        // Create a byte array to store the generated random bytes
        //        byte[] randomBytes = new byte[numberOfBytes];

        //        // Use the GetBytes() method to fill the array with random bytes
        //        rng.GetBytes(randomBytes);

        //        // Display the generated random bytes as a hexadecimal string

        //        refreshToken = Convert.ToBase64String(randomBytes);

        //        var tokenInUser = _context.Employees
        //            .Any(a => a.EmployeeRefToken == refreshToken);
        //        if (tokenInUser)
        //        {
        //            return CreateRefreshToken();
        //        }
        //    }
        //    return refreshToken;
        //}
        private ClaimsPrincipal GetPrincipalFromEpToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("JaiShreeKrishna..");
            var tokenValidationParameter = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameter, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("This Is Invalid Token");
            }
            return principal;
        }

        //    [HttpPost("refresh")]
        //    public async Task<IActionResult> Refresh(Employee employee)
        //    {
        //        if (employee is null)
        //            return BadRequest("Invalid Request");
        //        string accessToken = employee.EmployeeToken;
        //        string refreshToken = employee.EmployeeRefToken;
        //        var principal = GetPrincipalFromEpToken(accessToken);
        //        var username = principal.Identity.Name;
        //        var emp = await _context.Employees.FirstOrDefaultAsync(x => x.EmployeeUsername == username);
        //        if (emp is null || emp.EmployeeRefToken != refreshToken || emp.ExpiryTime <= DateTime.Now)
        //            return BadRequest("Invalid Request");
        //        var newAccessToken = CreatejwtToken(emp);
        //        var newRefreshToken = CreateRefreshToken();

        //        emp.EmployeeRefToken = newRefreshToken;
        //        await _context.SaveChangesAsync();

        //        return Ok(new
        //        {
        //            EmployeeToken = newAccessToken,
        //            EmployeeRefToken = newRefreshToken
        //        });
        //    }
        //}
    }
}

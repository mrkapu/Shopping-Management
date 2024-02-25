import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Category, Product,UserDetail } from '../model.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavigateServiceService {
  
  
  private url="Shopping"
    constructor(private http:HttpClient,private route:Router) { 

  }

  public  getProductCategory():Observable<Category[]>
  {
  
    return this.http.get<Category[]>(`${environment.apiUrl}/${this.url}/GetCategoryList`)
  }
  public  getProducts(category:string,subcategory:string,count:number):Observable<Product[]>
  {
  
    return this.http.get<Product[]>(`${environment.apiUrl}/${this.url}/GetProducts`,
    {params:new HttpParams().set('category',category).set('subcategory',subcategory).set('count',count),
    })
    
  }

  
  public getProductDetail(productId:number)
  {
    console.log(productId);
    return this.http.get<Product>(`${environment.apiUrl}/${this.url}/GetProductDetails`,{params:new HttpParams().set('productId',productId)});
  }
  public UserSubmit(user:UserDetail)
  {
    console.log(user);
    return this.http.post(`${environment.apiUrl}/${this.url}/SubmitUser`,
    {
     
      FirstName:user.FirstName,
      LastName:user.LastName,
      Address:user.Address,
      Mobile:user.Mobile,
      Username:user.Username,
      Password:user.Password
   
    });
  }
  public UserLogin(Username:string,Password:string)
  {
    console.log(Username);
    console.log(Password);


    
    return this.http.post(`${environment.apiUrl}/${this.url}/authenticateLogin`,{Username:Username
      ,Password:Password});
  }
}

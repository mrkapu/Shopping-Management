import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { count } from 'rxjs';
import { NavigateServiceService } from 'src/app/Services/navigate-service.service';
import { Product } from 'src/app/model.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  view:'grid'|'list'='grid';
  sortby:'default'|'htl'|'lth'='default'
  product:Product[]=[];
  constructor(private router:ActivatedRoute,private navigateService:NavigateServiceService) {
    
 
  }
  ngOnInit(): void {
   this.router.queryParams.subscribe((params:any)=>{
    let category=params.categories;
    let subcategory=params.subcategories;
    console.log(category);
    console.log(subcategory)
    if(category && subcategory)
    {
      this.navigateService.getProducts(category,subcategory,10).subscribe((res:any)=>{
        this.product=res;
        console.log(this.product);
      })
    }
   })
  }
  applyDiscount(price:number,discount:number):number
  {
    let finalprice:number;
    finalprice=price-price*(discount/100)
    return finalprice;
    
  }

  sortProduct(sortkey:string){
    console.log(sortkey);
    this.product.sort((a,b)=>{
      if(sortkey=='default')
      {
        return a.productId>b.productId?1:-1;
      }
      if(sortkey=='htl')
      {
        return this.applyDiscount(a.price,a.offer.discount)>this.applyDiscount(b.price,b.offer.discount)?-1:1;
      }
      if(sortkey=='lth')
      {
        return this.applyDiscount(a.price,a.offer.discount)>this.applyDiscount(b.price,b.offer.discount)?1:-1;
      }
      return 0;
    });
  }

}

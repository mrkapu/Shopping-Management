import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigateServiceService } from 'src/app/Services/navigate-service.service';
import { Product } from 'src/app/model.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  /**
   *
   */
  imageIndex:number=1;
  products!:Product;
  constructor(private activatedRoute:ActivatedRoute,private navigate:NavigateServiceService) {
    
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any)=>{
      let id=params.id;
      this.navigate.getProductDetail(id).subscribe((res:any)=>{
        this.products=res;
        
      })
    })
  }
  applyDiscount(price:number,discount:number):number
  {
    let finalprice:number;
    finalprice=price-price*(discount/100)
    return finalprice;
    
  }
}

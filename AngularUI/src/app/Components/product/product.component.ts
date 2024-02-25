import { Component, Input, OnInit } from '@angular/core';
import { NavigateServiceService } from 'src/app/Services/navigate-service.service';
import { Product } from 'src/app/model.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit  {

  @Input() view: 'grid' | 'list'|'cartview'|'previouscartview' ='grid';
  @Input() product:Product={
  productId:0,
  title:'',
   description:'',
   price:0,
    quantity:0,
    category:{id:1,category:'',subCategory:''},
    offer:{id:1,title:'',discount:0},
    imagename:''

  } 
  /**
   *
   */
  constructor() {
    
  }
  ngOnInit(): void {
    
  }
      applyDiscount(price:number,discount:number):number
      {
        let finalprice:number;
        finalprice=price-price*(discount/100)
        return finalprice;
        
      }
}

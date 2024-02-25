import { Component, Input, OnInit } from '@angular/core';
import { NavigateServiceService } from 'src/app/Services/navigate-service.service';
import { Category, Product } from 'src/app/model.model';

@Component({
  selector: 'app-suggested-product',
  templateUrl: './suggested-product.component.html',
  styleUrls: ['./suggested-product.component.css']
})
export class SuggestedProductComponent implements OnInit {
@Input() category:Category={
  id:0,
  category:'',
  subCategory:''
};
products:Product[]=[];
@Input() count:number=3;
  constructor(private navigateService:NavigateServiceService) {
    
  }
  ngOnInit(): void {
    this.navigateService.getProducts(this.category.category,this.category.subCategory,this.count)
    .subscribe((res:Product[])=>{
      this.products=res;
      console.log(this.products)  
    })
  }
}

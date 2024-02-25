import { Directive, HostListener, Input } from '@angular/core';
import { Category } from '../model.model';
import { Route, Router } from '@angular/router';

@Directive({
  selector: '[ClickProducts]'
})
export class ClickProductsDirective {
  constructor(private router:Router) { }
  @Input() productId:number=0;
  @Input() category:Category={
    id:0,
    category:'',
    subCategory:'',

  };
  @HostListener('click') openProducts(){
    this.router.navigate(['/product-list'],
    {queryParams:
      {
        categories:this.category.category,
        subcategories:this.category.subCategory
      },
    })
  }

  // @HostListener('click') openProductDetail(){
  //   window.scrollTo(0,0);
  //   this.router.navigate(['/product-detail'],
  //   {
  //     queryParams:{
  //       id:this.productId,
  //     },
  //   });

  }




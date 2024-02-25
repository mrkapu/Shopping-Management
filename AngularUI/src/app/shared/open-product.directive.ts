import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[OpenProduct]'
})
export class OpenProductDirective {
  @Input() productId:number=0;
 
  constructor(private router:Router) { }
    @HostListener('click') openProductDetail(){
    window.scrollTo(0,0);
    this.router.navigate(['/product-detail'],
    {
      queryParams:{
        id:this.productId,
      },
    });
  }
}

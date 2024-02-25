import { Component, OnInit } from '@angular/core';
import { NavigationItem,Category, SuggestedProduct } from './model.model';
import { NavigateServiceService } from './Services/navigate-service.service'
import { ClickProductsDirective } from './shared/click-products.directive';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  navigationList:NavigationItem[]=[
    // {
    //   category:"electronics",
    //   subcategories:["mobiles","laptops","Washing machine"]
    // }
    // ,
    // {
    //   category:"furniture",
    //   subcategories:["chairs","sofasets","tables"]
    // }
    
    // ,
    // {
    //   category:"Shoes",
    //   subcategories:["sandals","slipper","shoes"]
    // }
  ];

  title = 'KrishnaSales';
  suggestedProducts:SuggestedProduct[]=[
    {
      bannerimage:'Baner/Baner_Mobile.jpg',
      category:{
        id:1,
        category:'electronics',
        subCategory:'mobile'
      }
    },
    {
      bannerimage:'Baner/Baner_Mobile.jpg',
      category:{
        id:1,
        category:'electronics',
        subCategory:'Laptops'
      }
    },
    {
      bannerimage:'Baner/Baner_Mobile.jpg',
      category:{
        id:1,
        category:'furnicture',
        subCategory:'chairs'
      }
    }
  ]

  productCategory:Category[]=[];

  
  constructor(private navigateServices:NavigateServiceService){


  }
  ngOnInit(): void {
    this.navigateServices.getProductCategory().subscribe((data:Category[]) =>
     {
      this.productCategory=data;
      console.log(this.productCategory)
      for(let item of this.productCategory)
      {
        let present=false;
        for(let navItem of this.navigationList)
        {
          if(navItem.category==item.category)
          {
            navItem.subcategories.push(item.subCategory)
            present=true;
          }

        }
        if(!present)
        {
          this.navigationList.push({
            category:item.category,
            subcategories:[item.subCategory]

          });
        }
      }
    });

  }
}

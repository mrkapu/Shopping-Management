import { Component } from '@angular/core';
import { SuggestedProduct } from 'src/app/model.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  suggestedProducts:SuggestedProduct[]=[
    {
      bannerimage:'Baner/Baner_Mobile.jpg',
      category:{
        id:1,
        category:'electronics',
        subCategory:'mobiles'
      }
    },
    {
      bannerimage:'Baner/Baner_Mobile.jpg',
      category:{
        id:1,
        category:'electronics',
        subCategory:'laptops'
      }
    },
    {
      bannerimage:'Baner/Baner_Mobile.jpg',
      category:{
        id:1,
        category:'furniture',
        subCategory:'chairs'
      }
    }
  ]

}

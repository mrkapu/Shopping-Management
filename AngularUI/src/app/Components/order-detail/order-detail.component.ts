import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  selectPaymentMethodName='';
  selectPaymentMethod=new FormControl('0');
  /**
   *
   */
  constructor() {
    
  }
  ngOnInit(): void {
   this.selectPaymentMethod.valueChanges.subscribe((val:any)=>{
    if(val=='0')
    {
      this.selectPaymentMethodName=''
    }
    else{
      this.selectPaymentMethodName=val.toString();
    }
   }) 
  }
}

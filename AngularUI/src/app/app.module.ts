import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './Components/product/product.component';
import { SuggestedProductComponent } from './Components/suggested-product/suggested-product.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CartDetailsComponent } from './Components/cart-details/cart-details.component';
import { OrderDetailComponent } from './Components/order-detail/order-detail.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ClickProductsDirective } from './shared/click-products.directive';
import { LoginComponent } from './Components/Authenticate/login/login.component';

import { NgToastModule } from 'ng-angular-popup';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { OpenProductDirective } from './shared/open-product.directive';



@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SuggestedProductComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartDetailsComponent,
    OrderDetailComponent,
    PageNotFoundComponent,
    DashboardComponent,
    ClickProductsDirective,
    LoginComponent,
    OpenProductDirective,
    

 ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    AppRoutingModule,
    RouterModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

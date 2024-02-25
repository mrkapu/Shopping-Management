import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CartDetailsComponent } from './Components/cart-details/cart-details.component';
import { OrderDetailComponent } from './Components/order-detail/order-detail.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ProductComponent } from './Components/product/product.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/Authenticate/login/login.component';



const routes: Routes = [
{path:'home',component:DashboardComponent ,title:'KrishnaSales'},
{path:'product-detail',component:ProductDetailsComponent},
{path:'product-list',component:ProductListComponent},

{path:'cart-detail',component:CartDetailsComponent},
{path:'order-detail',component:OrderDetailComponent},
{path:'login',component:LoginComponent},


{path:'',redirectTo:'/home',pathMatch:'full',title:'KrishnaSales'},
{path:'**',component:PageNotFoundComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

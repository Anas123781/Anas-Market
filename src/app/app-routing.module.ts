import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { AdminCartsComponent } from './admin/components/admin-carts/admin-carts.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { LoginComponent } from './shared-module/components/login/login.component';
import { RegisterationComponent } from './shared-module/components/registeration/registeration.component';
import { MenClothesComponent } from './products/components/men-clothes/men-clothes.component';
import { WomenClothesComponent } from './products/components/women-clothes/women-clothes.component';
import { ElectronicsComponent } from './products/components/electronics/electronics.component';
import { JeweleryComponent } from './products/components/jewelery/jewelery.component';
import { PaymentComponent } from './shared-module/components/payment/payment.component';
import { authGuard } from 'src/guard/auth.guard';

const routes: Routes = [
  {path:"home",component:AllProductsComponent},
  {path:"products:id",component:AllProductsComponent,canActivate:[authGuard]},
  {path:"men",component:MenClothesComponent,canActivate:[authGuard]},
  {path:"women",component:WomenClothesComponent,canActivate:[authGuard]},
  {path:"electronics",component:ElectronicsComponent,canActivate:[authGuard]},
  {path:"jewelery",component:JeweleryComponent,canActivate:[authGuard]},
  {path:"cart",component:CartComponent,canActivate:[authGuard]},
  {path:"adminCarts",component:AdminCartsComponent,canActivate:[authGuard]},
  {path:"adminProducts",component:AdminProductsComponent,canActivate:[authGuard]},
  {path:"users",component:RegisterationComponent,canActivate:[authGuard]},
  {path:"login",component:LoginComponent,canActivate:[authGuard]},
  {path:"payment",component:PaymentComponent,canActivate:[authGuard]},
  {path:"details/:id",component:ProductDetailsComponent,canActivate:[authGuard]},
  {path:"**",redirectTo:"products",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenClothesComponent } from './components/men-clothes/men-clothes.component';
import { WomenClothesComponent } from './components/women-clothes/women-clothes.component';
import { ElectronicsComponent } from './components/electronics/electronics.component';
import { JeweleryComponent } from './components/jewelery/jewelery.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AllProductsComponent,
    ProductDetailsComponent,
    ProductComponent,
    MenClothesComponent,
    WomenClothesComponent,
    ElectronicsComponent,
    JeweleryComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModuleModule,
    FontAwesomeModule
    ],
  exports:[
    AllProductsComponent,
    ProductComponent,
    ProductDetailsComponent,

  ]
})
export class ProductsModule { }

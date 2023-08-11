import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCartsComponent } from './components/admin-carts/admin-carts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';



@NgModule({
  declarations: [
    AdminCartsComponent,
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModuleModule
  ]
})
export class AdminModule { }

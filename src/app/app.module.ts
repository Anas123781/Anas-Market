import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModuleModule } from "./shared-module/shared-module.module";
import { ProductsModule } from "./products/products.module";
import { RouterModule } from '@angular/router';
import { CartsModule } from './carts/carts.module';
import { AdminModule } from './admin/admin.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModuleModule,
        ProductsModule,
        RouterModule,
        CartsModule,
        AdminModule,
        FontAwesomeModule
    ]
})
export class AppModule {
    constructor(){
      }
 }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SelectComponent } from "./components/select/Select.component";
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainHeadComponent } from './components/main-head/main-head.component';
import { FooterComponent } from './components/footer/footer.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SecondHeaderComponent } from './components/second-header/second-header.component';
import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SelectComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    RegisterationComponent,
    MainHeadComponent,
    FooterComponent,
    GalleryComponent,
    SecondHeaderComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports:[
    HeaderComponent,
    SelectComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    MainHeadComponent,
    FooterComponent,
    GalleryComponent,
    SecondHeaderComponent,
    PaymentComponent 
  ]
})
export class SharedModuleModule { }

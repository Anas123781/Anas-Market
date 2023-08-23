/*****************
 I used local storage (vertual data base) to access data because I have not alot of options in fake API to use services
 *****************/
import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCartShopping as fasShopping } from '@fortawesome/free-solid-svg-icons';
import { faHome as fasHome } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { faBars as farBars } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-second-header',
  templateUrl: './second-header.component.html',
  styleUrls: ['./second-header.component.scss']
})
export class SecondHeaderComponent implements OnInit {
  cartsNumber!:number;
  showHeaderInPayment!:boolean;
  constructor(private iconLibrary:FaIconLibrary, private productService:ProductService) {
    this.iconLibrary.addIcons(fasShopping , fasHome , farUser,farBars);
  }
  ngOnInit(): void {
    this.productService.sharedCartsNumber.subscribe(data => this.cartsNumber = data);
    this.productService.sharedShowHeader.subscribe((data:any) => this.showHeaderInPayment = data)

  }

}

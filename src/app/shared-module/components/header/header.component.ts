/*****************
 I used local storage (vertual data base) to access data because I have not alot of options in fake API to use services
 *****************/
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCartShopping as fasShopping } from '@fortawesome/free-solid-svg-icons';
import { faHome as fasHome } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { faBars as farBars } from '@fortawesome/free-solid-svg-icons';
import { faClose as farClose } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/products/services/products.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() showHeader:boolean = true
  headerIcon:boolean = true ;
  text:any;
  cartsNumber!:number;
  showHeaderInPayment!:boolean;
  constructor(private iconLibrary:FaIconLibrary, private productsService :ProductsService,private productService:ProductService) {
    this.iconLibrary.addIcons(fasShopping , fasHome , farUser,farBars,farClose);
  }
  ngOnInit(): void {
    this.productService.sharedCartsNumber.subscribe(data => this.cartsNumber = data)
    this.productService.sharedShowHeader.subscribe((data:any) => this.showHeaderInPayment = data)
  }
  reverce() {
    this.headerIcon = !this.headerIcon
  }
}

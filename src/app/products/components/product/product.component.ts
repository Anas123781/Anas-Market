/*****************
 I used local storage (vertual data base) to access data because I have not alot of options in fake API to use services
 *****************/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faFireFlameCurved as fasFire } from '@fortawesome/free-solid-svg-icons'
import { ProductService } from 'src/app/shared-module/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  @Input() data:any;
  @Output() cart = new EventEmitter();
  addToCartClicked:boolean = false;
  quantity:number=1;
  // love check
  heartChecked:boolean = true
  // I will create random sale because i have not actual back-end database
  sale:number = this.generateRandomIntegerInRange(20 , 70);
  constructor( private iconLibrary:FaIconLibrary, private productService:ProductService){
    this.iconLibrary.addIcons(farHeart, fasHeart ,fasFire);
  }
  // send data from compnent to parent
  add() {
    this.cart.emit({item:this.data , quantity:this.quantity});
    console.log("from product")
    this.productService.updataCartsNumber(JSON.parse(localStorage.getItem('cart')!).length + 1)
  }
  setFav() {
    // if i have data base i could handel love check here
  }
  // toggle love button
  love() {
    this.heartChecked = !this.heartChecked
  }
  // generate random number
  generateRandomIntegerInRange(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } 
  ngOnInit(): void {
  }
}

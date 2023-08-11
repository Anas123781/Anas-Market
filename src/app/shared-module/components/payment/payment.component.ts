import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/carts/interfaces/order';
import { CartsService } from 'src/app/carts/services/carts.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor (private service:CartsService, private router:Router) {}
  carts:any[] = []
  cartsLingth:number=0
  sum:number = 0;
  amount:number = 0;
  success:boolean = false;
  checkedBoxes :any[] = [];
  hideCarts:boolean = false
  discount:number = 20;
  ngOnInit(): void {
    this.getProductsCart ();
    this.getTotalPrice();
  }
  // get collection of carts from local storage because we have not alot of options in fake API
  getProductsCart () {
    if("cart" in localStorage){
      this.carts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.cartsLingth = this.carts.length
  }
  // calculate the total price of all carts 
  getTotalPrice() {
    let temp = 0;
    this.carts.forEach(cart => {
      temp+=(cart.item.price * cart.quantity);
    })
    this.sum = temp;
    return this.sum;
  }
// put data in order interface shap to be ready to pass it to back-end by api service
goToPay(){
  let products= this.carts.map(product => {
    // choose only checked 
    const found = this.checkedBoxes.find((element) => element == product.item.id );
    if(found) {
      return {productId:product.item.id , quantity: product.quantity}
    } else {
      return ''
    }
  })
  // remove all '' values
  this.removeFromArr(products , '')
  console.log(products)
  
   let model: Order = {
    userId : 5 ,
    date: new Date(),
    products : products
   }
   if(products.length!==0) {
     this.service.sendOrder(model).subscribe(res => {
       this.success = true;
       this.hideCarts = true
       // pass data to back-end
     })
   }
   this.router.navigate(['/payment'])
}
// remove from array
removeFromArr(arr:any[], value:any) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

}

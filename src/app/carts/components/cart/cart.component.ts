/*****************
 I used local storage (vertual data base) to access data because I have not alot of options in fake API to use services
 *****************/
import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { CartsService } from '../../services/carts.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared-module/services/product.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor (private service:CartsService, private router:Router,private productService:ProductService) {}
  carts:any[] = []
  cartsLingth:number=0
  sum:number = 0;
  amount:number = 0;
  success:boolean = false;
  checkedBoxes :any[] = [];
  hideCarts:boolean = false
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
  // calculate the total price of all carts when click on plus op
  plus(cart:any) {
    if(cart.quantity >= 1) {
      cart.quantity +=1;
    }
    localStorage.setItem("cart" , JSON.stringify(this.carts));
    this.getTotalPrice();
  }
  // calculate the total price of all carts when click on minus op
  minus(cart:any) {
    if(cart.quantity > 1) {
      cart.quantity -=1;
    }
    localStorage.setItem("cart" , JSON.stringify(this.carts));
    this.getTotalPrice();
  }
  // remove cart from ui and local storage
  deleteCart(id:number) {
    this.carts = this.carts.filter(item => item.item.id !== id);
    this.getTotalPrice();
    //this.data.updataData(this.cartsLingth-=1)
    this.productService.updataCartsNumber(JSON.parse(localStorage.getItem('cart')!).length)
    localStorage.removeItem("cart")
    localStorage.setItem("cart" , JSON.stringify(this.carts));
    this.cartsLingth-=1;
}
// remove all carts from ui and local strorage (vertual data base)
deleteAllCarts() {
  this.carts = [];
  this.productService.updataCartsNumber(0);
  localStorage.setItem("cart" , JSON.stringify(this.carts));
  this.getTotalPrice();
  this.cartsLingth = 0;
}
// if click on check box 
checked(event:any) {
  let checkboxes = document.querySelectorAll('.check-cart');
  if(event.target.id == "all") {
    this.checkedBoxes =[]
    if(event.target.checked == true) {
      checkboxes.forEach((item:any) => {
        item.checked = true;
        // to not dublicate id
        const found = this.checkedBoxes.find((element:any) => element === item.id);
        if(!found) {
          this.checkedBoxes.push(item.id);
        } else {
          this.checkedBoxes = []
          checkboxes.forEach((box:any) => {
            box.checked = false;
          })
        }  
      });
    } else {
      checkboxes.forEach((item:any) => {
          item.checked = false;
          this.checkedBoxes = []  
      });
    }
  } else {
    // to not dublicate id
    const found = this.checkedBoxes.find((element:any) => element === event.target.id);
    if(!found ) {
      if(event.target.checked === true) {
        this.checkedBoxes.push(event.target.value);
      }
    } else {
        this.removeFromArr(this.checkedBoxes , event.target.id);
        const all = document.getElementById('all') as HTMLInputElement | null;
        all!.checked = false
    }
  }
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

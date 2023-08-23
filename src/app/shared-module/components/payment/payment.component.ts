import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/carts/interfaces/order';
import { CartsService } from 'src/app/carts/services/carts.service';
import { ConfirmPasswordValidator } from '../../classes/password.validators';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCartShopping as faCart } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp as faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown as faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor (private service:CartsService, private router:Router, private fb: FormBuilder, private iconLibrary:FaIconLibrary, private productService:ProductService) {
    this.iconLibrary.addIcons(faCart, faAngleUp, faAngleDown);

  }
  carts:any[] = []
  cartsLingth:number=0
  sum:number = 0;
  amount:number = 0;
  success:boolean = false;
  checkedBoxes :any[] = [];
  hideCarts:boolean = false;
  discount:number = 20;
  form!: FormGroup;
  offers: boolean = false;
  showSummary:boolean = true
  ngOnInit(): void {
    this.productService.showHeader(false);
    this.getTotalPrice();
    this.getProductsCart ();
    this.getTotalPrice();
        //create form group and controls
        this.form = this.fb.group({
          email: ['', [Validators.required ,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
          userName: ['', [Validators.required]],
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
          name: this.fb.group({
            fName: ['', [Validators.required]],
            lName: ['', [Validators.required]]
          }),
          address: this.fb.group({
            city: ['', [Validators.required]],
            street: ['', [Validators.required]],
            number: ['', [Validators.required]],
            zipCode: ['', [Validators.required]],
          })
        })
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
reverseSummary() {
  this.showSummary = !this.showSummary;
}
emailMe() {
  this.offers = !this.offers
}
submit() {

}
goToShipping() {
  
}
}

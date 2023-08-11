import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { Adminproducts } from '../../interfaces/adminproducts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-admin-carts',
  templateUrl: './admin-carts.component.html',
  styleUrls: ['./admin-carts.component.scss']
})
export class AdminCartsComponent implements OnInit {
  carts:any[] = [];
  form!:FormGroup;
  details:any = {};
  products:any[] = [];
  sum:number = 0;
  constructor (private service:AdminServiceService , private fb:FormBuilder , private productService:ProductsService) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      start:[''],
      end : ['']
    })
    this.getAllCarts()
  }
  getDate() {
    console.log(this.form.value)
  }
  getAllCarts() {
    let date = this.form.value
    this.service.getCarts(date).subscribe((data:any) => {
      this.carts = data;
      console.log(this.carts)
    })
  }
  // remove cart from ui and local storage
  deleteCart(id:number) {
    this.carts = this.carts.filter(item => item.id !== id);
    localStorage.removeItem("cart")
    localStorage.setItem("cart" , JSON.stringify(this.carts));
  }
  //view products for each cart
  view(index:number) {
    this.details = this.carts[index];
    for(let i=0 ; i<this.details.products.length ; i++) {
      this.productService.getProductById(this.details.products[i].productId).subscribe(data => {
        this.products.push({item : data , quantity : this.details.products[i].quantity});
      })
    }
    console.log(this.details);
    console.log(this.products);
  }

}
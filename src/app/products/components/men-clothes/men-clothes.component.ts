/*****************
 I used local storage (vertual data base) to access data because I have not alot of options in fake API to use services
 *****************/
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/productsInterface';

@Component({
  selector: 'app-men-clothes',
  templateUrl: './men-clothes.component.html',
  styleUrls: ['./men-clothes.component.scss']
})
export class MenClothesComponent implements OnInit {
  header = "Men's Clothes";
  loading:boolean = false
  //list of all products that recieved data from service
  products: Product[] = [];
  // bus between localstorge and item
  vertualCarts:any[] = [];
  constructor(private productService:ProductsService){}
  ngOnInit(): void {
    this.getProductByCategory("men's clothing")
  }
  //get Products By catigory
  getProductByCategory(keyword:any) {
    this.loading = true;
    this.productService.getProductsByCategory(keyword).subscribe((data: any) => {
      console.log(data)
      this.products = data;
      this.loading = false; 
    },
    (error) => {
      alert(error);
        this.loading = false;
      });
    }
  // add product to converts to carts in carts page
  addToCart(event:any) {
    this.loading = true;
    console.log(event)
    if("cart" in localStorage){
      JSON.parse(localStorage.getItem("cart")!).forEach((cart:any) => {
        this.vertualCarts.push(cart);
      })
      // to check if this product add to cart already
      let excist = this.vertualCarts.find(item => item.item.id === event.item.id);
      if(excist) {
        this.loading = false;
        alert("Product Is Already in your cart");
      }else {
        this.loading = false;
        this.vertualCarts.push(event);
        localStorage.setItem("cart" , JSON.stringify(this.vertualCarts));
        this.vertualCarts = [];
      }
    }else {
      this.vertualCarts.push(event);
      console.log(this.vertualCarts);
      localStorage.setItem("cart" , JSON.stringify(this.vertualCarts));
      console.log(this.vertualCarts);
      this.vertualCarts = [];
      this.loading = false;
    }
  }
}


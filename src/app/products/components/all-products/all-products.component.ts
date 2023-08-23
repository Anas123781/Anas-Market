/*****************
 I used local storage (vertual data base) to access data because I have not alot of options in fake API to use services
 *****************/
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';
import { Product } from '../../interfaces/productsInterface';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  constructor(private productService: ProductsService) { }

  //list of all products that recieved data from service
  products: Product[] = [];
  arrivalsProducts: Product[] = [];
  newProducts: Product[] = [];
  // all ctegories
  categories:string[] = [];
  //selectedCategory
  selectedCategory: string = "all";
  //loading
  loading:boolean = false;
  // bus between localstorge and item
  vertualCarts:any[] = [];
  //All Methods
  //get all products
  getAllProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data;
      this.loading = false;
    },
      error => {
        alert(error);
        this.loading = false;
      });
  }
  //get all catigories
  getAllCategories() {
    this.loading = true;
    this.productService.getAllCategories().subscribe((data: any) => {
      this.categories = data;
      this.loading = false;
    },
      (error) => {
        alert(error);
        this.loading = false;
      });
  }
  // get selected category
  filterProductsByCategories (event:any) {
    let value = event.target.value;
    (value === "all")
    ? this.getAllProducts()
    : this.getProductByCategory(value)
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
  // add carts to back-end to put their in carts page
  addToCart(event:any) {
    this.loading = true;
    console.log(event);
    if("cart" in localStorage){
      let exc = JSON.parse(localStorage.getItem("cart")!).find((item:any) => item.item.id === event.item.id);
      if(!exc) {
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
      } else {
        this.loading = false;
        alert("Product Is Already in your cart");
      }
    }else {
      this.vertualCarts.push(event);
      localStorage.setItem("cart" , JSON.stringify(this.vertualCarts));
      this.vertualCarts = [];
      this.loading = false;
    }
  }
  // if I have actual bac-end i will get arrivals Products and new products so i got random collection of id to show products  
  getProductsByID() {
    let arrivalsList = ['1','5','8','10','6','7','15','17'];
    let newProductsList = ['2','3','20','19','4','13','14','16'];
    // arrivals Products
    arrivalsList.forEach(id => {
      this.productService.getProductById(id).subscribe((element:any) => {
        this.arrivalsProducts.push(element)
      })
    })
    // new Products
    newProductsList.forEach(id => {
      this.productService.getProductById(id).subscribe((element:any) => {
        this.newProducts.push(element)
      })
    })
  }
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getProductsByID()
  }
} 




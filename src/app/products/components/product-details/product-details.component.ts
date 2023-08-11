/*****************
 I used local storage (vertual data base) to access data because I have not alot of options in fake API to use services
 *****************/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { faStar as faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faFireFlameCurved as fasFire } from '@fortawesome/free-solid-svg-icons'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CartsService } from 'src/app/carts/services/carts.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  carts: any[] = []
  sum: number = 0;
  amount: number = 1;
  success: boolean = false;
  id!: any;
  data: any = {}
  loading: Boolean = true;
  selectedSize: string = 'S';
  selectedColor: string = 'red';
  stars: number[] = [1, 2, 3, 4, 5];
  rate = 0;
  heartChecked: boolean = true;
  // I will create random sale because i have not actual back-end database
  sale: number = this.generateRandomIntegerInRange(20, 70);
  constructor(private activated: ActivatedRoute, private service: ProductsService,
    private iconLibrary: FaIconLibrary,
    private CartService: CartsService) {
    this.iconLibrary.addIcons(faStar, farHeart, fasHeart, fasFire);
    // get id parameter of product
    this.id = activated.snapshot.paramMap.get("id");
  }
  ngOnInit(): void {
    this.getProductById();
  }
  // rating products from 0 to 5
  countStar(star: any) {
    let starsIcons = document.querySelectorAll('.reveiw .rating-list li fa-icon');
    starsIcons.forEach(star => {
      star.classList.remove('active')
    })
    for (let i = 0; i < star; i++) {
      starsIcons[i].classList.add('active')
    }
    this.rate = star
  }
  // get any product by his id by service
  getProductById() {
    this.loading = true;
    this.service.getProductById(this.id).subscribe(result => {
      this.data = result
      this.loading = false;
    },
      error => {
        console.log(error)
        this.loading = false;
      })
  }
  // get size of products 
  getSize(event: any) {
    this.selectedSize = event.target.outerText
    this.handleClassActive('.size span', event)
  }
  // get color of products 
  getColor(event: any) {
    this.selectedColor = event.target.dataset.color
    let bullets = document.querySelectorAll('.color span')
    this.handleClassActive('.color span', event)
  }
  // handle active class of items
  handleClassActive(query: string, event: any) {
    let items = document.querySelectorAll(query)
    items.forEach(item => {
      item.classList.remove('active');
    })
    event.target.classList.add("active")
  }
  //////////////////////
  // calculate the total price of all carts 
  /* getTotalPrice() {
    let temp = 0;
    temp+=(this.data.item.price * this.data.quantity);
    this.sum = temp;
    return this.sum;
  } */
  // update local storage
  updateLocalStorage(LocalStorageItem: string, list: any[]) {
    if ('cart' in localStorage) {
      JSON.parse(localStorage.getItem(LocalStorageItem)!).forEach((item: any) => {
        list.push(item);
      })
      let excist = this.carts.find(item => item.item.id === this.data.id);
      if (excist) {
        alert("Product Is Already in your cart");
      } else {
        list.push({ item: this.data, quantity: this.amount })
        localStorage.setItem("cart", JSON.stringify(list));
      }

    } else {
      list.push({ item: this.data, quantity: this.amount })
      localStorage.setItem("cart", JSON.stringify(list));
    }
  }
  // calculate the total price of all carts when click on plus op
  plus(cart: any) {
    if (this.amount >= 1) {
      this.amount += 1;
    }
  }
  // calculate the total price of all carts when click on minus op
  minus(cart: any) {
    if (this.amount > 1) {
      this.amount -= 1;
    }
  }
  // add carts to data base
  addToCart() {
    this.updateLocalStorage('cart', this.carts);
    this.carts = [];
  }
  // toggle love button
  love() {
    this.heartChecked = !this.heartChecked
  }
  // zoom in image
  zoom(e: any) {
    let offsetX;
    let offsetY;
    var zoomer = e.currentTarget;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
    let x = offsetX / zoomer.offsetWidth * 100
    let y = offsetY / zoomer.offsetHeight * 100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
  }
  // generate random number
  generateRandomIntegerInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

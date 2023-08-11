import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cartsNumber = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('cart')!).length);
  public sharedCartsNumber = this.cartsNumber.asObservable();
  constructor() { }
  updataCartsNumber (carts:any) {
    this.cartsNumber.next(carts-1)
  }
}

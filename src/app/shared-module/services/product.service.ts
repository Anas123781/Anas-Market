import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cartsNumber = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('cart')!).length);
  public sharedCartsNumber = this.cartsNumber.asObservable();
  private showHead = new BehaviorSubject<boolean>(true);
  public sharedShowHeader = this.showHead.asObservable();
  constructor() { }
  updataCartsNumber (carts:any) {
    this.cartsNumber.next(carts-1)
  }
  showHeader(show:boolean) {
    this.showHead.next(show)
  }
}

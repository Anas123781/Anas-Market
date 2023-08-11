import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { environment } from 'src/environment/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private _http:HttpClient) { }
  sendOrder(model:Order) {
    return this._http.post(environment.basicApi + 'carts' , model)
  }
}

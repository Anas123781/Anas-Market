import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private _http:HttpClient) { }
  getCarts(date:any) {
    let params = new HttpParams
    params = params.append('startDate', date.start ).append('endDate', date.end )
    return this._http.get(environment.basicApi + 'carts' ,{params})
  }
  addProduct(model:any) {
    return this._http.post(environment.basicApi + 'products/', model)
  }
}

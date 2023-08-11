import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/productsInterface';
import { environment } from 'src/environment/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //API path of products
  _productUrl =  environment.basicApi+"products";         //environment.basicApi = "https://fakestoreapi.com/"
  _categoriesUrl =  environment.basicApi+"products/categories";         //environment.basicApi = "https://fakestoreapi.com/"
  _spacificCategoryUrl =  environment.basicApi+"products/category/";         //environment.basicApi = "https://fakestoreapi.com/"
  cartsNumber:number = 0;
  constructor(private _http: HttpClient) { }
  //method get all data and pass it in product interface
  getAllProducts() {
    return this._http.get<Product[]>(this._productUrl).pipe(
      catchError(
      (error) => {
        return throwError(error.message || "Server Issue Please contact with Site Adminstrator")
      }
    )
    );
  }
  //method get all categories
  getAllCategories() {
    return this._http.get<Product[]>(this._categoriesUrl).pipe(
      catchError(
      (error) => {
        return throwError(error.message || "Server Issue Please contact with Site Adminstrator")
      }
    )
    );
  }
  //method get Products with category
  getProductsByCategory(restPath:string) {
    return this._http.get<Product[]>(this._spacificCategoryUrl + restPath).pipe(
      catchError(
      (error) => {
        return throwError(error.message || "Server Issue Please contact with Site Adminstrator")
      }
      )
    );
  }
  //method get Products with category
  getProductById(restPath:string) {
    return this._http.get<Product[]>(this._productUrl +'/'+ restPath).pipe(
      catchError(
      (error) => {
        return throwError(error.message || "Server Issue Please contact with Site Adminstrator")
      }
    )
    );
  }
  getCartsNumber () {
    return this.cartsNumber;
  }
  setCartsNumber (cartsNumber:number) {
    this.cartsNumber = cartsNumber;
  }
}

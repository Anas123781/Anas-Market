import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/products/interfaces/productsInterface';
import { ProductsService } from 'src/app/products/services/products.service';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products!:Product[];
  category!:string[];
  buttonState:boolean = true
  form!:FormGroup;
  base64!:any;
  constructor( private productService:ProductsService , private fb:FormBuilder , private adminService:AdminServiceService){}
  ngOnInit(): void {
    this.form = this.fb.group({
      title : ['',[Validators.required]],
      price : ['',[Validators.required]],
      category : ['',[Validators.required]],
      description : ['',[Validators.required]],
      image : [''],
    })
    this. getAllProducts();
    this.getAllCaregories();
  }
  getAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    })
  }
  getAllCaregories() {
    this.productService.getAllCategories().subscribe((data:any) => {
      this.category = data;
    })
  }
  getCategory(event:any){
    this.form.get('category')?.setValue(event.target.value);

  }
  addProduct() {
    console.log(this.form.value);
    let model = this.form.value;
    this.adminService.addProduct(model).subscribe(data => {
      alert("success");
    })
  }
  getImgPath(event:any) {
    // this way to convert local path of image to base64 link use it in any where
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64 = reader.result;
        //this.form.get('image')?.setValue(this.base64);
        this.form.get('image')?.setValue("image");
      }
  }
}

/*****************
 I used local storage (vertual data base) to access data because I have not alot of options in fake API to use services
 *****************/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '../../interfaces/loginData';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from '../../classes/password.validators';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {
  members: LoginData[] = [];
  form!: FormGroup;
  model!: LoginData;
  constructor(private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    //create form group and controls
    this.form = this.fb.group({
      email: ['', [Validators.required ,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      name: this.fb.group({
        fName: ['', [Validators.required]],
        lName: ['', [Validators.required]]
      }),
      address: this.fb.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
      }),
      phone: ['', [Validators.required]]
    }, { validators: [ConfirmPasswordValidator] })
  }
  // return random value in range
  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  //save data in database and go to login page 
  register() {
    this.model = {
      id: this.randomIntFromInterval(1, 1000),
      email: this.form.get('email')?.value,
      username: this.form.get('userName')?.value,
      password: this.form.get('password')?.value,
      name: {
        fName: this.form.get('name.fName')?.value,
        lName: this.form.get('name.lName')?.value,
      },
      address: {
        city: this.form.get('address.city')?.value,
        street: this.form.get('address.street')?.value,
        number: this.form.get('address.number')?.value,
        zipCode: this.form.get('address.zipCode')?.value,
      },
      phone: this.form.get('phone')?.value,
      favourite: []
    }
    if ("emails" in localStorage) {
      JSON.parse(localStorage.getItem('emails')!).forEach((element: any) => {
        this.members.push(element);
      });
    } else {
      localStorage.setItem('emails', JSON.stringify([{}]));
    }
    this.members.push(this.model);
    console.log(this.members)
    if ("emails" in localStorage) {
      JSON.parse(localStorage.getItem('emails')!).forEach((element: any) => {
        if (element.email === this.model.email) {
          alert("This Account Excist Already !!! ")
        } else {
          localStorage.setItem('emails', JSON.stringify(this.members));
          this.router.navigate(['/login']);
        }
      })
    } else {
      localStorage.setItem('emails', JSON.stringify(this.members));
      this.router.navigate(['/login']);
    }
  }
  submitData() {
    console.log(this.model)
    // if i have actual back-end send all values of form in class to back-end
  }
}

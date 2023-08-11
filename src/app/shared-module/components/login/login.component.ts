/*****************
 I used local storage (vertual data base) to access data because I have not alot of options in fake API to use services
 *****************/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowRight as fasRight } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loginCheck: boolean = true;
  constructor(private fb: FormBuilder, private route: Router ,  private iconLibrary:FaIconLibrary ) { 
    this.iconLibrary.addIcons(fasRight);

   }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  // when click login check your data to database and go top main page
  login() {
    JSON.parse(localStorage.getItem("emails")!).forEach((item: any , i:number) => {
      console.log(i)
      if (item.email === this.form.get('email')!.value && item.password === this.form.get('password')!.value) {
        localStorage.setItem('user', JSON.stringify({item : item , index:i}));
        this.route.navigate(['/products'])
      } else {
        this.loginCheck = false;
      }
    })
  }
}

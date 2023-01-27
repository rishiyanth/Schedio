import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/services/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private cookieService : CookieService,private router:Router,private loaderService:LoaderService) { }
  validateLogin!:FormGroup
  validateSignup!: FormGroup
  valid_signup = false
  valid_login = false

  ngOnInit(): void {
    this.loaderService.checkLogin()
    this.validateLogin = new FormGroup({
      loginusername: new FormControl("",[Validators.required]),
      loginpassword: new FormControl("",Validators.required)
    })

    this.validateSignup = new FormGroup({
      signupusername: new FormControl("",Validators.required),
      signupemail: new FormControl("",[Validators.required,Validators.email]),
      signuppassword: new FormControl("",Validators.required),
      retypepassword: new FormControl("",[Validators.required])
    }
    )

  };

  get login(){return this.validateLogin.controls;}
  get signup(){return this.validateSignup.controls;}

  validateLoginUser(){

    var formDataLogin: any = new FormData();
    formDataLogin.append('username', this.login['loginusername'].value);
    formDataLogin.append('password', this.login['loginpassword'].value);

    this.http.post(
      "http://localhost:8000/login/", formDataLogin
    ).subscribe((data:any)=>{
      this.cookieService.set('Token','Token '+ data.token)
      console.log(this.cookieService.get('Token'))
      this.router.navigate(['feed'])
    })
    this.valid_login = true
    if (this.validateLogin.invalid) { return  }
  }

  validateSignupUser(){
    this.valid_signup = true
    if (this.validateSignup.invalid) { return  }
    var formDataSignup: any = new FormData();
    formDataSignup.append('username',this.signup['signupusername'].value);
    formDataSignup.append('email',this.signup['signupemail'].value);
    formDataSignup.append('password',this.signup['signuppassword'].value);
    this.http.post(
      "http://localhost:8000/register/", formDataSignup
    ).subscribe((data:any)=>{
      this.cookieService.set('Token','Token '+ data.token)
      console.log(this.cookieService.get('Token'))
      this.router.navigate(['newuser'])
    })
  }

}
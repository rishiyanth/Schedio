import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/services/loader/loader.service';
import { Newuser } from 'src/assets/interfaces/Newuser.model';
import { BACKEND_URL, GET_MY_PROFILE, USER_LOGIN, USER_REGISTER } from 'src/assets/constants/url';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private cookieService : CookieService,private router:Router,private loaderService:LoaderService) {}

  validateLogin!:FormGroup
  validateSignup!: FormGroup
  valid_signup = false
  valid_login = false
  invalid_credentials = false
  invalid_username = false

  isLogin = true;

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

  switchForm(){
    this.isLogin = !this.isLogin;
  }

  validateLoginUser(){

    this.invalid_credentials = false
    var formDataLogin: any = new FormData();
    formDataLogin.append('username', this.login['loginusername'].value);
    formDataLogin.append('password', this.login['loginpassword'].value);

    this.valid_login = true
    if (this.validateLogin.invalid) { return }

    this.http.post(
      BACKEND_URL+USER_LOGIN, formDataLogin
    ).subscribe((data:any)=>{
      this.cookieService.set('Token','Token '+ data.token)
      console.log(this.cookieService.get('Token'))
      // this.loaderService.getUserProfile()
      this.loaderService.setUserData();
      this.loaderService.setUserProfile();
      this.router.navigate(['feed'])
    },
    (error)=>{
      this.invalid_credentials = true
    })
  
  }

  validateSignupUser(){
    this.valid_signup = true
    this.invalid_username = false

    if (this.validateSignup.invalid) { return  }
    var formDataSignup: any = new FormData();
    formDataSignup.append('username',this.signup['signupusername'].value);
    formDataSignup.append('email',this.signup['signupemail'].value);
    formDataSignup.append('password',this.signup['signuppassword'].value);
    this.http.post(
      BACKEND_URL+USER_REGISTER, formDataSignup
    ).subscribe((data:any)=>{
      this.cookieService.set('Token','Token '+ data.token)
      console.log(this.cookieService.get('Token'))
      this.loaderService.setUserData()
    },
    (error)=>{
      this.invalid_username = true
    },
    ()=>{
      this.router.navigateByUrl('userdetail');
    })

  }

}


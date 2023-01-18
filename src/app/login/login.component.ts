import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }
  validateLogin!:FormGroup
  validateSignup!: FormGroup
  valid_signup = false
  valid_login = false

  ngOnInit(): void {
    this.validateLogin = new FormGroup({
      loginemail: new FormControl("",[Validators.required]),
      loginpassword: new FormControl("",Validators.required)
    })

    this.validateSignup = new FormGroup({
      signupemail: new FormControl("",[Validators.required,Validators.email]),
      signuppassword: new FormControl("",Validators.required),
      retypepassword: new FormControl("",[Validators.required])
    })
  };

  get login(){return this.validateLogin.controls;}
  get signup(){return this.validateSignup.controls;}

  validateLoginUser(){

    var formData: any = new FormData();
    formData.append('username', this.login['loginemail'].value);
    formData.append('password', this.login['loginpassword'].value);

    console.log(this.login['loginpassword'].value);
    this.http.post(
      "http://localhost:8000/login/", formData
    ).subscribe((data)=>{
      console.log(data)
    })
    this.valid_login = true
    if (this.validateLogin.invalid) { return  }
  }

  validateSignupUser(){
    console.log("Signup works")
    this.valid_signup = true
    if (this.validateSignup.invalid) { return  }
  }

}
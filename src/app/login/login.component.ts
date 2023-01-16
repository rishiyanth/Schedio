import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  validateLogin!:FormGroup
  validateSignup!: FormGroup
  valid_signup = false
  valid_login = false

  ngOnInit(): void {
    this.validateLogin = new FormGroup({
      loginemail: new FormControl("",[Validators.required,Validators.email]),
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
    console.log("Login works")
    this.valid_login = true
    if (this.validateLogin.invalid) { return  }
  }

  validateSignupUser(){
    console.log("Signup works")
    this.valid_signup = true
    if (this.validateSignup.invalid) { return  }
  }

}
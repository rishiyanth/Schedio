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

  validateLoginUser(){
    console.log("Login works")
  }

  validateSignupUser(){
    console.log("Signup works")
  }

}
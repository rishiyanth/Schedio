import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlSegment } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { async } from 'rxjs';
import { BACKEND_URL, CREATE_USER_PROFILE } from 'src/assets/constants/url';
import { countries } from 'src/assets/datastore/country-data';
import { techstack } from 'src/assets/datastore/techstack-data';
import { LoaderService } from 'src/services/loader/loader.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {

  @ViewChild('techstack') usertechstack: any;

  selectedItemsList:any = [];
  checkedIDs:any = [];
  alert_techstack = false;
  user: any = JSON.parse(localStorage.getItem('User')!)
  userDetail: any = JSON.parse(localStorage.getItem('UserDetail')!)


  public techstack:any = techstack
  public countries:any = countries

  basicDetails!:FormGroup;
  basic_step = false;
  techstack_step = false;
  step = 1;

  constructor(private formBuilder: FormBuilder,private loaderService: LoaderService,private http:HttpClient,private router:Router,private cookieService: CookieService) { }

  ngOnInit(): void {
    // this.loaderService.checkUser();

    this.basicDetails = this.formBuilder.group({
      firstname: [this.user.first_name,Validators.required],
      lastname: [this.user.last_name],
      dob: [this.userDetail.dob,Validators.required],
      gender: [this.userDetail.gender,Validators.required],  //look into this
      email: [this.user.email, Validators.required],
      phone: [this.userDetail.phone,Validators.required],   //look into this
      country: [this.userDetail.country,Validators.required],
      profession: [this.userDetail.profession,Validators.required],
      organisation: [this.userDetail.organisation]
    });

    this.checkedIDs = this.userDetail.tech_stack //look into this
  }

  changeSelection(event:any) {
    this.fetchSelectedItems(event)
  }

  fetchSelectedItems(event:any) {
    if(event.target.checked){
      let index = event.target.id
      this.checkedIDs.push(this.techstack[index].name)
    }
    else{
      let index = event.target.id
      this.checkedIDs.splice(this.checkedIDs.indexOf(this.techstack[index].name),1)
    }
  }

  get basic() { return this.basicDetails.controls; }

  next(){
    if(this.step==1){
          this.basic_step = true;
          if (this.basicDetails.invalid) { 
            return  
          }
          this.step++
    }
  }
  previous(){
    this.step--
    if(this.step==1){
      this.basic_step = false;
    }
  }
  submit(){
    let newUserData: any = this.getNewUserData()
    for (const pair of newUserData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    if(this.step==2){
      this.techstack_step = true;
      if (this.checkedIDs.length==0) { 
        this.alert_techstack = true  
        return 
      }
      else { 
        this.alert_techstack = false
        this.http.post(BACKEND_URL+CREATE_USER_PROFILE,newUserData).subscribe((data) =>{
          this.loaderService.setUserProfile()
          this.router.navigate(['feed']);
        },
        (error)=>{
          this.router.navigate(['newuser']);
        })
      }
    }
  }

  getNewUserData():any{
    var newUserData: any = new FormData();
    newUserData.append('username', this.user.username);
    newUserData.append('first_name', this.basic['firstname'].value);
    newUserData.append('last_name', this.basic['lastname'].value);
    newUserData.append('tech_stack' , this.checkedIDs);
    newUserData.append('email' , this.basic['email'].value);
    newUserData.append('dob' , this.basic['dob'].value);
    newUserData.append('user_gender' , this.basic['gender'].value);
    newUserData.append('phone_number' , this.basic['phone'].value);
    newUserData.append('country' , this.basic['country'].value);
    newUserData.append('profession' , this.basic['profession'].value);
    newUserData.append('organisation' , this.basic['organisation'].value);
    return newUserData
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { BACKEND_URL, CREATE_USER_PROFILE, EDIT_PROFILE } from 'src/assets/constants/url';
import { countries } from 'src/assets/datastore/country-data';
import { techstack } from 'src/assets/datastore/techstack-data';
import { LoaderService } from 'src/services/loader/loader.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

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
  profile_step = false;
  step = 1;

  imageTemp = ''
  imageOriginal = ''
  imageFile : any

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private http:HttpClient,
    private router:Router,
    private cookieService: CookieService,
    private modalService: NgbModal,
    config: NgbModalConfig,
  ) { }

  ngOnInit(): void {
    this.loaderService.checkUser();

    console.log("Usedetail :",this.userDetail.user.first_name)

    this.basicDetails = this.formBuilder.group({
      firstname: [this.user.first_name,Validators.required],
      lastname: [this.user.last_name],
      dob: [this.userDetail.dob,Validators.required],
      gender: [this.userDetail.user_gender,Validators.required],  //look into this
      email: [this.user.email, Validators.required],
      phone: [this.userDetail.phone,Validators.required],   //look into this
      country: [this.userDetail.country,Validators.required],
      profession: [this.userDetail.profession,Validators.required],
      organisation: [this.userDetail.organisation],
      linkedin: [this.userDetail.linkedin],
      github: [this.userDetail.github],
      userbio: [this.userDetail.user_bio],
    });

    this.checkedIDs = this.userDetail.tech_stack;

    console.log("Checked Stacks",this.checkedIDs)
    this.imageTemp = this.userDetail.image_url;

    // console.log("Userdetail",this.userDetail);
  }

  isToolChecked(id: number): Boolean{
    return this.checkedIDs.includes(id);
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
        this.step++;
    }
    else if(this.step==2){
      this.techstack_step = true;
      if (this.checkedIDs.length==0) { 
        this.alert_techstack = true  
        return 
      }
      else { 
        this.alert_techstack = false
        this.step++
      }
    }
  }
  previous(){
    this.step--;
    if(this.step==1){
      this.basic_step = false;
    }
    if(this.step==2){
      this.techstack_step = false;
    }
  }
  submit(){
    let newUserData: any = this.getNewUserData()
    newUserData.append('file',this.imageFile)

    console.log("UserData",newUserData)
    for (const pair of newUserData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    if(this.step == 3){
      this.profile_step = true;
      this.http.put(BACKEND_URL+EDIT_PROFILE,newUserData).subscribe((data) =>{
          this.loaderService.setUserProfile()
          this.router.navigate(['feed']);
        },
        (error)=>{
          this.router.navigate(['editprofile']);
      })
    }

    // if(this.step==2){
    //   this.techstack_step = true;
    //   if (this.checkedIDs.length==0) { 
    //     this.alert_techstack = true  
    //     return 
    //   }
    //   else { 
    //     this.alert_techstack = false
    //     this.http.put(BACKEND_URL+EDIT_PROFILE,newUserData).subscribe((data) =>{
    //       this.loaderService.setUserProfile()
    //       this.router.navigate(['feed']);
    //     },
    //     (error)=>{
    //       this.router.navigate(['editprofile']);
    //     })
    //   }
    // }
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
    newUserData.append('linkedin' , this.basic['linkedin'].value);
    newUserData.append('github' , this.basic['github'].value);
    newUserData.append('user_bio' , this.basic['userbio'].value);
    newUserData.append('file' , this.imageFile);
    return newUserData
  }

  // Profile image related functions



  resetImage(){
    this.imageTemp = ''
    this.imageOriginal = ''
  }

  openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true,size: 'xl'  });
	}

  getFile(imageFile: any):void{
    console.log("File",imageFile)
    this.imageFile = imageFile
  }

  renderImage(imageURL: any): void{
    console.log("Received file")
    console.log(imageURL)

    this.imageTemp = imageURL;

    // let blob = new Blob([value], {type: 'text/plain'});
    // this.imageTemp = URL.createObjectURL(blob)
  }

}

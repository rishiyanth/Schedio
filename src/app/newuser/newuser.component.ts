import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countries } from 'src/assets/datastore/country-data';
import { techstack } from 'src/assets/datastore/techstack-data';
import { LoaderService } from 'src/services/loader.service';

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

  public techstack:any = techstack
  public countries:any = countries

  basicDetails!:FormGroup;
  basic_step = false;
  techstack_step = false;
  step = 1;

  constructor(private formBuilder: FormBuilder,private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.checkUser()
    this.basicDetails = this.formBuilder.group({
        firstname: ['',Validators.required],
        lastname: [''],
        dob: ['',Validators.required],
        gender: ['',Validators.required], 
        email: ['', Validators.required],
        phone: ['',Validators.required],
        country: [null,Validators.required],
        profession: [null,Validators.required]
    });
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
    console.log(this.basic)
    if(this.step==1){
          this.basic_step = true;
          if (this.basicDetails.invalid) { return  }
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
    console.log(this.checkedIDs)
    if(this.step==2){
      this.techstack_step = true;
      if (this.checkedIDs.length==0) { 
        this.alert_techstack = true  
        return 
      }
      else { 
        this.alert_techstack = false
      }
    }
  }
}

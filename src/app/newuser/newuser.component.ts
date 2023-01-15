import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countries } from 'src/assets/datastore/country-data';
import { techstack } from 'src/assets/datastore/techstack-data';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {

  @ViewChild('techstack') usertechstack: any;

  selectedItemsList:any = [];
  checkedIDs:any = [];

  public techstack:any = techstack
  public countries:any = countries

  basicDetails!:FormGroup;
  techstackDetails!:FormGroup;
  basic_step = false;
  techstack_step = false;
  step = 1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.basicDetails = this.formBuilder.group({
        username: ['', Validators.required],
        firstname: ['',Validators.required],
        lastname: [''],
        dob: ['',Validators.required],
        //gender: ['',Validators.required], 
        email: ['', Validators.required],
        phone: ['',Validators.required],
        country: [null,Validators.required],
        profession: [null,Validators.required]
    });
    this.techstackDetails = this.formBuilder.group({
       techpreferences: ['',Validators.required] 
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
  }

  get basic() { return this.basicDetails.controls; }
  get techStack() { return this.techstackDetails.controls; }

  next(){
    console.log(this.basic)
    if(this.step==1){
          this.basic_step = true;
          if (this.basicDetails.invalid) { return  }
          this.step++
    }
    if(this.step==2){
        this.techstack_step = true;
        if (this.techstackDetails.invalid) { return }
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
      if (this.techstackDetails.invalid) { return }
    }
  }

}

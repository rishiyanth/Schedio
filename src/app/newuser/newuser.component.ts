import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {

  @ViewChild('techstack') usertechstack: any;

  selectedItemsList:any = [];
  checkedIDs:any = [];

  techstack = [
    {
      id:'1',
      name: 'React',
      img: 'https://reactjs.org/logo-og.png'
    },
    {
      id:'2',
      name: 'Angular',
      img: 'https://repository-images.githubusercontent.com/24195339/87018c00-694b-11e9-8b5f-c34826306d36'
    },
    {
      id:'3',
      name: 'MongoDB',
      img: 'https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Emblem.jpg'
    },
    {
      id: '4',
      name: 'Node',
      img: 'https://nodejs.org/static/images/logo-hexagon-card.png'
    },
    {
      id: '5',
      name: 'Vue',
      img: 'https://miro.medium.com/max/1400/1*-8AAdexfOAK9R-AIha_PBQ.png'
    },
    {
      id: '6',
      name: 'Django',
      img: 'https://d1wrxu8gicsgam.cloudfront.net/wp-content/files/django-logo-big.jpg'
    },
    {
      id: '7',
      name: 'Python',
      img: 'https://mpng.subpng.com/20181128/cbr/kisspng-python-programming-basics-for-absolute-beginners-michigan-python-user-group-5-jul-2-18-5bfef921c53528.7857216715434365778078.jpg'
    },
    {
      id: '8',
      name: 'C++',
      img: 'https://raw.githubusercontent.com/isocpp/logos/master/cpp_logo.png'
    },
    {
      id: '9',
      name: 'Java',
      img: 'https://1000logos.net/wp-content/uploads/2020/09/Java-Emblem.jpg'
    },
    {
      id: '10',
      name: 'Github',
      img: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
    },
  ]

  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.personalDetails = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['',Validators.required]
    });
    this.addressDetails = this.formBuilder.group({
        city: ['', Validators.required],
        address: ['', Validators.required],
        pincode: ['',Validators.required]
    });
    this.educationalDetails = this.formBuilder.group({
        highest_qualification: ['', Validators.required],
        university: ['', Validators.required],
        total_marks: ['',Validators.required]
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

  get personal() { return this.personalDetails.controls; }
  get education() { return this.educationalDetails.controls; }
  get address() { return this.addressDetails.controls; }
  next(){
    if(this.step==1){
          this.personal_step = true;
          if (this.personalDetails.invalid) { return  }
          this.step++
    }
    if(this.step==2){
        this.address_step = true;
        if (this.addressDetails.invalid) { return }
            this.step++;
    }
  }
  previous(){
    this.step--
    if(this.step==1){
      this.personal_step = false;
    }
    if(this.step==2){
      this.education_step = false;
    }
  }
  submit(){
    console.log(this.checkedIDs)
    if(this.step==3){
      this.education_step = true;
      if (this.educationalDetails.invalid) { return }
    }
  }

}

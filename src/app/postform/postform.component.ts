import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BACKEND_URL, CREATE_POST } from 'src/assets/constants/url';
import { techstack } from 'src/assets/datastore/techstack-data';
import { Techstack } from 'src/assets/interfaces/Techstack.model';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.scss']
})
export class PostformComponent implements OnInit {

  postForm !: FormGroup
  loaderService: any;
  techstacks:Techstack[] = techstack;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      titleInput: new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      gistInput: new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(250)]),
      descriptionInput: new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(3000)]),
      techStack : new FormControl([""]),
      file : new FormControl("")
      // postImage: new FormControl(null,Validators.required)
    })
  }

  get postform(){return this.postForm.controls;}

  uploadPost(){

    var postFormData: any = this.getPostFormData()
    // postFormData.append('file',this.imageTemp)
    // console.log(postFormData.get("file"))
    this.http.post(BACKEND_URL+CREATE_POST,postFormData).subscribe((data) =>{
      this.postForm.reset()
      console.log("Done")
    },
    (error) =>{
      console.log(error)
    })
    
    // this.modal.close('Close click')
  }

  getPostFormData(): FormData{
    var postFormData = new FormData();
    postFormData.append('user_id',this.loaderService.userData.id)
    postFormData.append('post_title',this.postform['titleInput'].value);
    postFormData.append('post_gist',this.postform['gistInput'].value);
    postFormData.append('post_description',this.postform['descriptionInput'].value);
    postFormData.append('tech_stack',this.postform['techStack'].value);
    // postFormData.append('file',this.imageFile)
    return postFormData
  }


}

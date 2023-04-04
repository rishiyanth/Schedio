import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BACKEND_URL, CREATE_POST, EDIT_POST } from 'src/assets/constants/url';
import { techstack } from 'src/assets/datastore/techstack-data';
import { IPost } from 'src/assets/interfaces/post.model';
import { Techstack } from 'src/assets/interfaces/Techstack.model';
import { LoaderService } from 'src/services/loader/loader.service';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.scss']
})
export class PostformComponent implements OnInit {

  @Input() postData?: IPost;

  postForm !: FormGroup
  techstacks:Techstack[] = techstack;
  user: any = JSON.parse(localStorage.getItem('User')!)

  constructor(private http:HttpClient,private loaderService: LoaderService) { }

  ngOnInit(): void {

    this.postForm = new FormGroup({
      titleInput: new FormControl(this.postData?.post_title,[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      gistInput: new FormControl(this.postData?.post_gist,[Validators.required,Validators.minLength(1),Validators.maxLength(250)]),
      descriptionInput: new FormControl(this.postData?.post_description,[Validators.required,Validators.minLength(1),Validators.maxLength(3000)]),
      techStack : new FormControl("",[Validators.required]),
      status: new FormControl(this.postData?.status,[Validators.required]),
      collaborators: new FormControl("",[Validators.required])
      // file : new FormControl("")
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
    postFormData.append('user_id',this.user.id)
    postFormData.append('post_title',this.postform['titleInput'].value);
    postFormData.append('post_gist',this.postform['gistInput'].value);
    postFormData.append('post_description',this.postform['descriptionInput'].value);
    postFormData.append('tech_stack',this.postform['techStack'].value);
    // postFormData.append('file',this.imageFile)
    return postFormData
  }

  updatePost(){
    var postFormData: any = this.getPostFormData()

    this.http.put(BACKEND_URL+EDIT_POST+this.postData?.id,postFormData).subscribe((data)=>{
      console.log("Done", data)
    })
  }

}

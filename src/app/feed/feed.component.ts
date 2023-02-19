import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';
import { BACKEND_URL, CREATE_POST } from 'src/assets/constants/url';
import { LoaderService } from 'src/services/loader/loader.service';
import { IPost } from 'src/assets/interfaces/post.model';
import { PostService } from '../post/post.service';
import { techstack } from 'src/assets/datastore/techstack-data';
import { Techstack } from 'src/assets/interfaces/Techstack.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: IPost[] = []
  postForm !: FormGroup
  modal:any
  techstacks:Techstack[] = techstack;

  constructor(private loaderService:LoaderService,private modalService: NgbModal,config: NgbModalConfig,private http:HttpClient, private postService: PostService) {
    config.backdrop = 'static';
		config.keyboard = false;
   }

  ngOnInit(): void {
    this.loaderService.checkUser()
    this.loaderService.getUserData();
    this.postForm = new FormGroup({
      titleInput: new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      gistInput: new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(250)]),
      descriptionInput: new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(3000)]),
      techStack : new FormControl([""]),
      // postImage: new FormControl(null,Validators.required)
    })  

    this.postService.getAllPosts().subscribe((posts) => {
      // console.log(posts)
      this.posts = posts
    })
  }

  get postform(){return this.postForm.controls;}

  imageTemp = ''
  imageOriginal = ''

  openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true,size: 'lg' });
	}

  renderImage(imageURL: any): void{
    console.log("Received blob")
    console.log(imageURL)

    this.imageTemp = imageURL;

    // let blob = new Blob([value], {type: 'text/plain'});
    // this.imageTemp = URL.createObjectURL(blob)
  }

  resetImage(){
    this.imageTemp = ''
    this.imageOriginal = ''
  }

  uploadPost(){

    var postFormData: any = this.getPostFormData()
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
    return postFormData
  }

}

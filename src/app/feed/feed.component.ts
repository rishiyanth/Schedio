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

  postsAll: IPost[] = []
  posts: IPost[] = []
  postForm !: FormGroup
  modal:any
  techstacks:Techstack[] = techstack;
  searchText: string = "";

  constructor(private loaderService:LoaderService,private modalService: NgbModal,config: NgbModalConfig,
    private http:HttpClient, private postService: PostService, private router: Router) {
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
      file : new FormControl("")
      // postImage: new FormControl(null,Validators.required)
    })  

    this.postService.getAllPosts().subscribe((posts) => {
      // console.log(posts)
      this.posts = posts;
      this.postsAll = posts;
    })
  }

  get postform(){return this.postForm.controls;}

  imageTemp = ''
  imageOriginal = ''
  imageFile : any

  openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true,size: 'lg' });
	}

  renderImage(imageURL: any): void{
    console.log("Received file")
    console.log(imageURL)

    this.imageTemp = imageURL;
    this.imageFile = new File([this.imageTemp],"name");

    // let blob = new Blob([value], {type: 'text/plain'});
    // this.imageTemp = URL.createObjectURL(blob)
  }

  resetImage(){
    this.imageTemp = ''
    this.imageOriginal = ''
  }

  uploadPost(){

    var postFormData: any = this.getPostFormData()
    postFormData.append('file',this.imageTemp)
    console.log(postFormData.get("file"))
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
    postFormData.append('file',this.imageFile)
    return postFormData
  }

  // Search related function

  selectedTechStackId = ""
  currentSearchTerm: string = "";
  currentSearchItems: IPost[] = [];
  counter = 0;

  customSearchFn(term: string, item: IPost) {
    term = term.toLowerCase();
    // const termTitleCase = term.charAt(0).toUpperCase() + term.slice(1);
    return item.tech_stack.join("").toLowerCase().includes(term) || item.post_title.toLowerCase().indexOf(term) > -1
    // const techStackLowerCase = item.tech_stack.map((stack)=> stack.toLowerCase());
  }

  navigateToSelectedPost(){
    if(this.selectedTechStackId){
      this.router.navigate(["/post"],{queryParams:{id:this.selectedTechStackId}})
    }
  }

  filterOnEnter = ($event: KeyboardEvent): boolean => {
    if($event.key == "Enter"){
      // this.renderFilteredPosts()
      this.posts = this.currentSearchItems;
    }
    return true;
  }

  whileSearch = ($event: { term: string; items: IPost[]; }) => {
    this.currentSearchTerm = $event.term;
    this.currentSearchItems = []
    $event.items.forEach((item: IPost) => {
      this.currentSearchItems.push(item);
    })
  }

}

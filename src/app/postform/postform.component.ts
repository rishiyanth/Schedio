import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BACKEND_URL, CREATE_POST, EDIT_POST } from 'src/assets/constants/url';
import { techstack } from 'src/assets/datastore/techstack-data';
import { IPost } from 'src/assets/interfaces/post.model';
import { Techstack } from 'src/assets/interfaces/Techstack.model';
import { LoaderService } from 'src/services/loader/loader.service';
import { PostService } from '../post/post.service';
import { IProfile } from 'src/assets/interfaces/profile.model';
import { ProfileService } from '../profile/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.scss']
})
export class PostformComponent implements OnInit {

  @Input() postData?: IPost;

  postForm !: FormGroup
  techstacks:Techstack[] = techstack;
  currentSearchTerm: string = "";
  user: any = JSON.parse(localStorage.getItem('User')!)
  profilesAll: IProfile[] = []
  currentSearchProfiles: IProfile[] = [];


  constructor(private http:HttpClient,private loaderService: LoaderService, private postService: PostService, private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {

    this.postForm = new FormGroup({
      titleInput: new FormControl(this.postData?.post_title,[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      gistInput: new FormControl(this.postData?.post_gist,[Validators.required,Validators.minLength(1),Validators.maxLength(250)]),
      descriptionInput: new FormControl(this.postData?.post_description,[Validators.required,Validators.minLength(1),Validators.maxLength(3000)]),
      techStack : new FormControl("",[Validators.required]),
      status: new FormControl(this.postData?.status,[Validators.required]),
      collaborators: new FormControl("",[Validators.required]),
      // file : new FormControl("")
      // postImage: new FormControl(null,Validators.required)
    })

    this.profileService.getAllUserProfile().subscribe((profiles) =>{
      this.profilesAll = profiles
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
    postFormData.append('user_id',this.user.id);
    postFormData.append('id',this.postData!.id.toString());
    postFormData.append('post_title',this.postform['titleInput'].value);
    postFormData.append('post_gist',this.postform['gistInput'].value);
    postFormData.append('post_description',this.postform['descriptionInput'].value);
    postFormData.append('status',this.postform['status'].value);
    postFormData.append('tech_stack',this.postform['techStack'].value);
    postFormData.append('collaboraters',this.postform['collaborators'].value);
    
    // postFormData.append('file',this.imageFile)
    return postFormData
  }

  updatePost(){
    var postFormData: any = this.getPostFormData()
    for (const pair of postFormData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    this.http.put(BACKEND_URL+EDIT_POST,postFormData).subscribe((data)=>{
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        window.location.reload();
        this.router.navigateByUrl('feed');
      });
    })
  }

  getPostStackNames(tech_stack: any){
    // console.log("inside getpoststackname",this.postData?.tech_stack)
    this.postService.getPostStackNames(tech_stack).subscribe((data)=>{
      console.log(data)
      return data 
      // console.log(this.tech_stack_names)
    })
  }

  customSearchCollaboratorsFn(term: string, item: IProfile) {
    term = term.toLowerCase();
    // const termTitleCase = term.charAt(0).toUpperCase() + term.slice(1);
    return item.username!.toLowerCase().indexOf(term) > -1
    // const techStackLowerCase = item.tech_stack.map((stack)=> stack.toLowerCase());
  }

  whileSearchCollaborators = ($event: { term: string; items: IProfile[]; }) => {
    this.currentSearchTerm = $event.term;
    this.currentSearchProfiles = []
    $event.items.forEach((item: IProfile) => {
      this.currentSearchProfiles.push(item);
    })
  }

}

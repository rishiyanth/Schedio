import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { async, Observable } from 'rxjs';
import { IPost } from 'src/assets/interfaces/post.model';
import { IProfile } from 'src/assets/interfaces/profile.model';
import { LoaderService } from 'src/services/loader/loader.service';
import { LoaderComponent } from '../loader/loader.component';
import { PostService } from '../post/post.service';
import { ProfileService } from '../profile/profile.service';
import { statuscolors } from 'src/assets/constants/statuscolors';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss'],
})
export class PostdetailComponent implements OnInit {
  selectedPost?: IPost;
  selectedPostUserDetail?: IProfile;
  userDetail: any
  currentUser: any = JSON.parse(localStorage.getItem('User')!)

  isLiked = false;
  isSaved = false;
  isPostExists?: boolean
  sc = statuscolors
  statuscolor?: string
  profileImage = ""
  collaborators: any[] = []
  collaboratorsData: any = {}
  tech_stack_names: any
  delete_success: boolean = false
  delete_success_error: boolean = false


  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // this.loaderService.getUserProfile();
    // this.userDetail = localStorage.getItem('UserDetail')
    // this.userDetail = JSON.parse(this.userDetail)
    console.log(this.currentUser)
    this.route.queryParams.subscribe((params) => {
      this.postService.getSelectedPost(params['id']).subscribe({
        next:(postData)=>{
        this.selectedPost = postData[0];
        console.log(postData[0])
        this.statuscolor = this.sc.get(this.selectedPost!.status.toString())
        
        this.assignCollaborators()
        
        this.profileService
          .getUserProfile(this.selectedPost!.user)
          .subscribe((userData) => {
            this.selectedPostUserDetail = userData;
            this.assignProfileImage()
            this.assignPostImage()
          });
        },
        error:(err)=>{
          console.log(err)
          this.router.navigateByUrl("**")
        }
      });

      this.postService.getPostLikedStatus(params['id']).subscribe((data) => { 
        this.isLiked = data.liked
      })

    });

  }

  assignCollaborators() {
    let collaboratorsId = this.selectedPost?.collaboraters
    // console.log(collaboratorsId)
    collaboratorsId?.forEach((id)=>{
      this.profileService
          .getUserData(id)
          .subscribe((userData) => {
            this.profileService
                .getUserProfile(id)
                .subscribe((userProfile) => {
                  const data = {...userData, ...userProfile}
                  console.log(data)
                  this.collaborators.push(data)
            });
          });
      
      
    })
  }
  
  toggleLike(): void {
    this.isLiked = !this.isLiked;
    this.postService.likePost(this.selectedPost?.id as number).subscribe((data)=>{
    },
    (error: any)=>{
      console.log(error)
    }
  )
  }

  toggleSave(): void {
    this.isSaved = !this.isSaved;
  }

  deletePost(id: any): void {
    id = parseInt(id)
    this.postService.deleteMyPost(id).subscribe((res) => {
      this.delete_success = true
      this.router.navigateByUrl('/feed')
    },
    (err) =>{
      this.delete_success_error = true
    });

  }

  collaborate(id: any) {
    // console.log(this.loaderService.userProfile.id)
    // console.log(this.selectedPostUserDetail)
    // console.log("Id:"+id)
    this.postService.sendEmail(id); //sending email
  }

  navigateToUserProfile(id: number|undefined): void {
    if(id){
      this.router.navigate(['user'], {
        queryParams: { userId: id },
      });
    }
  }

  open(content: any) {
    this.modalService.open(content, {scrollable: true,size: 'xl' });
  }

  editPost(){
    
  }

  assignProfileImage(){
    if(this.selectedPostUserDetail?.profile_photo != undefined){
      this.profileImage = this.selectedPostUserDetail?.profile_photo;
    }
    else{
      this.profileImage =  "assets/images/profile-icon.png";
    }
  }

  assignPostImage(){
    if(this.selectedPost?.image_url != undefined){
      this.isPostExists = true
    }
    else{
      this.isPostExists = false
    }
  }

  // getPostStackNames(){
  //   console.log(this.selectedPost?.tech_stack)
  //   this.postService.getPostStackNames(this.selectedPost?.tech_stack!).subscribe((data)=>{
  //     this.tech_stack_names = data
  //     console.log(this.tech_stack_names)
  //   })
  // }


}

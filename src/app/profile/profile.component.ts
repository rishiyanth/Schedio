import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/services/loader/loader.service';
import { ProfileService } from './profile.service';
import { IProfile } from '../../assets/interfaces/profile.model';
import { PostService } from '../post/post.service';
import { IPost } from 'src/assets/interfaces/post.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  postsLiked: IPost[] = []
  user: any = JSON.parse(localStorage.getItem('User')!)

  constructor(
    private loaderService:LoaderService, 
    private profileService: ProfileService,
    private postService: PostService ,
    private router: Router,
    private modalService: NgbModal,

  ) {}

  profileData?: any = {};
  posts: IPost[] = [];
  profileImage: any;


  ngOnInit(): void {
    // this.loaderService.checkUser()
    this.profileService.getMyProfile().subscribe((profile) => {
      this.profileData = profile;
      console.log("Profile Data",this.profileData)
      this.assignProfileImage();
    });
    this.postService.getMyPosts().subscribe((posts) => {this.posts = posts;});
    this.postService.getLikedPosts().subscribe((posts)=>{
      this.postsLiked = posts;
      console.log("Posts Liked by user",posts)
    })
  }


  assignProfileImage(){
    if(this.profileData?.image_url != undefined){
      this.profileImage = this.profileData?.image_url;
    }
    else{
      this.profileImage =  "assets/images/profile-icon.png";
    }
  }

  editProfile(){
    this.router.navigateByUrl('editprofile')
  }

  userLiked(id:any):boolean{
    for (var post of this.postsLiked){
      if(post.id==id){
        return true
      }
    }
    return false
  }

  openModal(content: any, modalSize: string) {
    this.modalService.open(content, {scrollable: true,size: modalSize});
  }

}
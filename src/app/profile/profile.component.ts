import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/services/loader/loader.service';
import { ProfileService } from './profile.service';
import { IProfile } from '../../assets/interfaces/profile.model';
import { PostService } from '../post/post.service';
import { IPost } from 'src/assets/interfaces/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private loaderService:LoaderService, 
    private profileService: ProfileService,
    private postService: PostService 
  ) {}

  profileData?: any = {};
  posts: IPost[] = [];
  profileImage: any;


  ngOnInit(): void {
    // this.loaderService.checkUser()
    this.profileService.getMyProfile().subscribe((profile) => {this.profileData = profile;});
    this.postService.getMyPosts().subscribe((posts) => {this.posts = posts;});
    this.assignProfileImage();
  }

  assignProfileImage(){
    if(this.profileData?.profile_photo != undefined){
      this.profileImage = this.profileData?.profile_photo;
    }
    else{
      this.profileImage =  "assets/images/profile-icon.png";
    }
  }

}
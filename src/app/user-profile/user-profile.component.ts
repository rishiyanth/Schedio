import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'src/services/loader/loader.service';
import { ProfileService } from '../profile/profile.service';
import { IProfile } from '../../assets/interfaces/profile.model';
import { PostService } from '../post/post.service';
import { IPost } from 'src/assets/interfaces/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private loaderService:LoaderService, 
    private profileService: ProfileService,
    private postService: PostService,
    private route: ActivatedRoute,
  ) {}

  profileData?: IProfile = {};
  posts: IPost[] = [];
  userId:number = 0;

  isFollowed = false;

  ngOnInit(): void {
    // this.loaderService.checkUser()

    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      this.profileService.getUserProfile(this.userId).subscribe((profile) => {this.profileData = profile;});
      this.postService.getUserPosts(this.userId).subscribe((posts) => {this.posts = posts;});
    })
  }

  followUser(): void {
    this.isFollowed = true;
  }

  unfollowUser(): void {
    this.isFollowed = false;
  }
}

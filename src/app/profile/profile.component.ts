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

  profileData?: IProfile = {};
  posts: IPost[] = [];

  ngOnInit(): void {
    this.loaderService.checkUser()
    this.profileService.getMyProfile().subscribe((profile) => {this.profileData = profile;console.log(profile)});
    this.postService.getMyPosts().subscribe((posts) => {this.posts = posts; console.log(posts)});
  }
}
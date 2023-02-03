import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { async, Observable } from 'rxjs';
import { IPost } from 'src/assets/interfaces/post.model';
import { IProfile } from 'src/assets/interfaces/profile.model';
import { LoaderService } from 'src/services/loader/loader.service';
import { LoaderComponent } from '../loader/loader.component';
import { PostService } from '../post/post.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostdetailComponent implements OnInit {

  selectedPost?: IPost
  selectedPostUserDetail?: IProfile
  constructor(private route: ActivatedRoute,private postService: PostService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postService.getSelectedPost(params['id']).subscribe((postData) => {
        this.selectedPost = postData[0];
        this.profileService.getUserProfile(this.selectedPost.user_id).subscribe((userData) => {
          this.selectedPostUserDetail = userData;
        })
      })
    })

  }

  isLiked = false;
  isSaved = false;

  toggleLike(): void{
    this.isLiked = !this.isLiked;
  }

  toggleSave(): void{
    this.isSaved = !this.isSaved;
  }

  deletePost(id: number): void{
    this.postService.deleteMyPost(id).subscribe((res)=>{})
  }

}

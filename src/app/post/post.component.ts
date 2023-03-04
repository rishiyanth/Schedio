import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { IPost } from 'src/assets/interfaces/post.model';
import { PostService } from './post.service';
import { IProfile } from 'src/assets/interfaces/profile.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() postData?: IPost;
  userData?: IProfile;

  constructor(private profileService: ProfileService,private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.profileService.getUserProfile(this.postData!.user_id).subscribe((userData)=> this.userData = userData);
  }

  cropStatus = false;
  imageTemp = "assets/images/schedio_cover.jpg";
  imageOriginal = "assets/images/schedio_cover.jpg"

  isLiked = false;
  isSaved = false;

  toggleCropStatus(): void{
    this.cropStatus = !this.cropStatus;
  }

  renderImage(imageURL: any): void{
    console.log("Received blob")
    console.log(imageURL)

    this.imageTemp = imageURL;

    // let blob = new Blob([value], {type: 'text/plain'});
    // this.imageTemp = URL.createObjectURL(blob)
  }

  toggleLike(): void{
    this.isLiked = !this.isLiked;
    this.postService.likePost(this.postData?.id as number).subscribe((data)=>{
      // console.log(data)
      },
      (error: any)=>{
        console.log(error)
      }
    )
    // console.log("LIked "+ this.postData?.id)
  }

  toggleSave(): void{
    this.isSaved = !this.isSaved;
  }

  openPost(postId:any):void{
    this.router.navigate(["/post"],{queryParams:{id:postId}})
  }
  navigateToUserPage(): void{
    this.router.navigate(['user'],{ queryParams: { userId: this.postData?.user_id } });
  }

}

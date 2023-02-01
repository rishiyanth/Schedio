import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { IPost } from 'src/assets/interfaces/post.model';
import { PostService } from './post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() postData?: IPost;
  
  constructor(private profileService: ProfileService,private postService: PostService,private router: Router) { }

  ngOnInit(): void {
    // this.profileService.getMyProfile()
    // this.profileService.getUserProfile(2).subscribe((data)=> console.log(data));
  }

  cropStatus = false;
  imageTemp = "assets/images/rishidp.jpg";
  imageOriginal = "assets/images/rishidp.jpg"

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
  }

  toggleSave(): void{
    this.isSaved = !this.isSaved;
  }

  openPost(postId:any):void{
    this.router.navigate(["/post"],{queryParams:{id:postId}})
  }
}

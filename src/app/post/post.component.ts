import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { IPost } from 'src/assets/interfaces/post.model';
import { PostService } from './post.service';
import { IProfile } from 'src/assets/interfaces/profile.model';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { statuscolors } from 'src/assets/constants/statuscolors';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() postData?: IPost;
  @Input() liked?: boolean;
  @Input() saved?: boolean;
  userData?: IProfile;

  isLiked? = false
  isSaved? = false
  isPostExists? : boolean;
  statuscolor?: string
  sc = statuscolors
  profileImage = "";
  tech_stack_names: any

  constructor(
    private profileService: ProfileService,
    private postService: PostService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    // console.log(this.postData)
    this.profileService.getUserProfile(this.postData!.user).subscribe((userData)=> this.userData = userData);
    this.isLiked = this.liked;
    this.isSaved = this.saved;
    
    this.assignProfileImage();
    this.assignPostImage();
    this.statuscolor = this.sc.get(this.postData!.status.toString());
  }

  cropStatus = false;
  imageTemp = "assets/images/schedio_cover.jpg";
  imageOriginal = "assets/images/schedio_cover.jpg"


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
      },
      (error: any)=>{
        console.log(error)
      }
    )
  }

  toggleSave(): void{
    this.isSaved = !this.isSaved;
    this.postService.savePost(this.postData?.id as number).subscribe((data)=>{
    },
    (error: any)=>{
      console.log(error)
    }
  )
  }

  openPost(postId:any):void{
    this.router.navigate(["/post"],{queryParams:{id:postId}})
  }
  navigateToUserPage(): void{
    this.router.navigate(['/user'],{ queryParams: { userId: this.postData!.user} });
  }

  userLiked(): boolean{
    this.postService.getLikedPosts().subscribe((data)=>{
      console.log(data)
    })
    return false
  }

  userSaved():boolean{
    return false
  }

  assignProfileImage(){
    if(this.userData?.profile_photo != undefined){
      this.profileImage = this.userData?.profile_photo;
    }
    else{
      this.profileImage =  "assets/images/profile-icon.png";
    }
  }

  assignPostImage(){
    if(this.postData?.image_url != undefined){
      this.isPostExists = true
    }
    else{
      this.isPostExists = false
    }
  }

  // getPostStackNames(){
  //   console.log("inside getpoststackname",this.postData?.tech_stack)
  //   this.postService.getPostStackNames(this.postData?.tech_stack!).subscribe((data)=>{
  //     this.tech_stack_names = data
  //     console.log(this.tech_stack_names)
  //   })
  // }

}


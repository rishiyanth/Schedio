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

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostdetailComponent implements OnInit {

  selectedPost?: IPost
  selectedPostUserDetail?: IProfile
  constructor(
    private route: ActivatedRoute,
    private postService: PostService, 
    private profileService: ProfileService, 
    private loaderService: LoaderService, 
    private router: Router, 
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    
    this.loaderService.getUserProfile();
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

  collaborate(id: any){
    // console.log(this.loaderService.userProfile.id)
    // console.log(this.selectedPostUserDetail)
    // console.log("Id:"+id)
    this.postService.sendEmail(id) //sending email
  }

  navigateToUserPage(): void{
    this.router.navigate(['user'],{ queryParams: { userId: this.selectedPost?.user_id } });
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

}

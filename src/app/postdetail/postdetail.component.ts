import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { async, Observable } from 'rxjs';
import { IPost } from 'src/assets/interfaces/post.model';
import { LoaderService } from 'src/services/loader/loader.service';
import { LoaderComponent } from '../loader/loader.component';
import { PostService } from '../post/post.service';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostdetailComponent implements OnInit {

  selectedPost?: any
  selectedPostUserDetail?: any
  constructor(private route: ActivatedRoute,private postService: PostService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.postService.getSelectedPost(params['id']).subscribe((post) => {
        this.postService.getSelectedPostUserDetails(5).subscribe((res) =>{
          this.selectedPostUserDetail = res
          console.log(this.selectedPostUserDetail)
        })
        this.selectedPost = post
      })
    });
  }

  isLiked = false;
  isSaved = false;

  toggleLike(): void{
    this.isLiked = !this.isLiked;
  }

  toggleSave(): void{
    this.isSaved = !this.isSaved;
  }


}

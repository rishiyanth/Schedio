import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from 'src/assets/interfaces/post.model';
import { PostService } from '../post/post.service';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostdetailComponent implements OnInit {

  selectedPost?: IPost
  constructor(private route: ActivatedRoute,private postService: PostService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.postService.getSelectedPost(params['id']).subscribe((post) => {
        this.selectedPost = post
      })
    });
  }

}

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
  styleUrls: ['./postdetail.component.scss'],
})
export class PostdetailComponent implements OnInit {
  selectedPost?: IPost;
  selectedPostUserDetail?: IProfile;
  userDetail: any
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // this.loaderService.getUserProfile();
    // this.userDetail = localStorage.getItem('UserDetail')
    // this.userDetail = JSON.parse(this.userDetail)
    this.route.queryParams.subscribe((params) => {
      this.postService.getSelectedPost(params['id']).subscribe((postData) => {
        this.selectedPost = postData[0];
        this.profileService
          .getUserProfile(this.selectedPost.user_id)
          .subscribe((userData) => {
            this.selectedPostUserDetail = userData;
          });
      });
    });
  }

  isLiked = false;
  isSaved = false;
  collaborators: IProfile[] = [
    {
      id: 1,
      username: 'talion',
      first_name: 'Talion',
      last_name: 'Tark',
      user_bio: 'I am the Lord of Mordor',
      techstack: ['Angular', 'MongoDB', 'Node'],
      profile_photo: 'https://picsum.photos/id/18/500/500',
      email: 'talion@gmail.com',
      dob: new Date('2012-12-12'),
      user_gender: 'Male',
      phone_number: '+917012365234',
      country: 'Argentina',
      profession: 'Software Engineer',
      organisation: 'IBM',
      followers: [],
    },
    {
      id: 2,
      username: 'Lara',
      first_name: 'Lara',
      last_name: 'Croft',
      user_bio: 'Your all time favourite adventurer',
      techstack: ['Exploration', 'React'],
      profile_photo: 'https://picsum.photos/id/99/500/500',
      email: 'lara@gmail.com',
      dob: new Date('2021-06-22'),
      user_gender: 'Female',
      phone_number: '+917070705454',
      country: 'India',
      profession: 'Student',
      organisation: 'TCE',
      followers: [],
    },
    {
      id: 3,
      username: 'karma',
      first_name: 'karma',
      last_name: 'jane',
      user_bio: '',
      techstack: ['Angular', 'Vue', 'Django', 'MongoDB', 'React'],
      profile_photo: 'https://picsum.photos/id/118/500/500',
      email: 'karma@gmail.com',
      dob: new Date('2023-02-07'),
      user_gender: 'Female',
      phone_number: '+916352670545',
      country: 'Germany',
      profession: 'Software Engineer',
      organisation: 'BlueOps',
      followers: [],
    },
    {
      id: 4,
      username: 'talion',
      first_name: 'Talion',
      last_name: 'Tark',
      user_bio: 'I am the Lord of Mordor',
      techstack: ['Angular', 'MongoDB', 'Node'],
      profile_photo: 'https://picsum.photos/id/18/500/500',
      email: 'talion@gmail.com',
      dob: new Date('2012-12-12'),
      user_gender: 'Male',
      phone_number: '+917012365234',
      country: 'Argentina',
      profession: 'Software Engineer',
      organisation: 'IBM',
      followers: [],
    },
    {
      id: 5,
      username: 'Lara',
      first_name: 'Lara',
      last_name: 'Croft',
      user_bio: 'Your all time favourite adventurer',
      techstack: ['Exploration', 'React'],
      profile_photo: 'https://picsum.photos/id/99/500/500',
      email: 'lara@gmail.com',
      dob: new Date('2021-06-22'),
      user_gender: 'Female',
      phone_number: '+917070705454',
      country: 'India',
      profession: 'Student',
      organisation: 'TCE',
      followers: [],
    },
    {
      id: 6,
      username: 'karma',
      first_name: 'karma',
      last_name: 'jane',
      user_bio: '',
      techstack: ['Angular', 'Vue', 'Django', 'MongoDB', 'React'],
      profile_photo: 'https://picsum.photos/id/118/500/500',
      email: 'karma@gmail.com',
      dob: new Date('2023-02-07'),
      user_gender: 'Female',
      phone_number: '+916352670545',
      country: 'Germany',
      profession: 'Software Engineer',
      organisation: 'BlueOps',
      followers: [],
    },
  ];
  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }

  toggleSave(): void {
    this.isSaved = !this.isSaved;
  }

  deletePost(id: number): void {
    this.postService.deleteMyPost(id).subscribe((res) => {});
  }

  collaborate(id: any) {
    // console.log(this.loaderService.userProfile.id)
    // console.log(this.selectedPostUserDetail)
    // console.log("Id:"+id)
    this.postService.sendEmail(id); //sending email
  }

  navigateToUserProfile(id: number|undefined): void {
    if(id){
      this.router.navigate(['user'], {
        queryParams: { userId: id },
      });
    }
  }

  open(content: any) {
    this.modalService.open(content, {scrollable: true,size: 'xl' });
  }

  editPost(){
    
  }

}

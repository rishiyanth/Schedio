import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cropStatus = false;
  imageTemp = "assets/images/login_page.jpg";
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

}

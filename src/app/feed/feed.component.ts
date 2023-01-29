import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';
import { LoaderService } from 'src/services/loader/loader.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  postForm !: FormGroup
  modal:any

  constructor(private loaderService:LoaderService,private modalService: NgbModal,config: NgbModalConfig) {
    config.backdrop = 'static';
		config.keyboard = false;
   }

  ngOnInit(): void {
    this.loaderService.checkUser()
    this.postForm = new FormGroup({
      titleInput: new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      gistInput: new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(250)]),
      descriptionInput: new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(3000)]),
      // postImage: new FormControl(null,Validators.required)
    })  
  }

  get postform(){return this.postForm.controls;}

  imageTemp = ''
  imageOriginal = ''

  openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true,size: 'lg' });
	}

  renderImage(imageURL: any): void{
    console.log("Received blob")
    console.log(imageURL)

    this.imageTemp = imageURL;

    // let blob = new Blob([value], {type: 'text/plain'});
    // this.imageTemp = URL.createObjectURL(blob)
  }

  resetImage(){
    this.imageTemp = ''
    this.imageOriginal = ''
  }

  uploadPost(){

    console.log("OK post form collects data successfully")
    // this.modal.close('Close click')
  }

}

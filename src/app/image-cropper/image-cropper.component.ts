import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent, Dimensions, ImageTransform, LoadedImage, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

  @Input() receivedImage = "";
  @Input() originalImage = "";
  @Output() imageCropEvent = new EventEmitter<any>();
  @Output() imageFileEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();
  currentUser = JSON.parse(localStorage.getItem("User")!)
  filename: string = ""

  constructor() { }

  ngOnInit(): void {
    // console.log(this.currentUser) 
    let date = new Date().toJSON()
    this.filename = this.currentUser.username+ date
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  base: any ='';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log(event)
      this.base = event.base64;
      // console.log(event, base64ToFile(event.base64));
  }

  imageSubmit(): void{
    let blob = new Blob([base64ToFile(this.base)], {type: 'text/plain'});
    this.imageCropEvent.emit(URL.createObjectURL(blob));
    fetch(this.base)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], this.filename,{ type: "image/png" })
            // console.log(file)
            this.imageFileEvent.emit(file);
    })
    this.closeEvent.emit();
    // this.imageCropEvent.emit(base64ToFile(this.base));
  }

  imageLoaded() {
      this.showCropper = true;
      console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
      console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
      console.log('Load failed');
  }

  resetImage() {
      this.scale = 1;
      this.rotation = 0;
      this.canvasRotation = 0;
      this.transform = {};
  }

  onChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filename += file.name
      console.log(this.filename)
    }
  }

  zoomOut() {
      this.scale -= .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  zoomIn() {
      this.scale += .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  toggleContainWithinAspectRatio() {
      this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  urltoFile(url:any, filename: string, mimeType: any){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
  }

}

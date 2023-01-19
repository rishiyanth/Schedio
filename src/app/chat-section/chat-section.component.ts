import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-chat-section',
  templateUrl: './chat-section.component.html',
  styleUrls: ['./chat-section.component.scss']
})

export class ChatSectionComponent implements OnInit {

  contacts = [
    {
      name: 'Krishna Sameer',
      content: 'dei mama',
      lastTexted: 'wed'
    },
    {
      name: 'Rishiyanth',
      content: 'worst ra',
      lastTexted: 'tue'
    },
    {
      name: 'Chris Pratt',
      content: 'how you doing?',
      lastTexted: 'tue'
    },
    {
      name: 'Groot',
      content: 'Im Groot.Im Groot.Im Groot.Im Groot.Im Groot.Im Groot.',
      lastTexted: 'tue'
    },
    {
      name: 'Batman',
      content: 'Im Batman.',
      lastTexted: 'thurs'
    },
  
  ]

  constructor() { }

  ngOnInit(): void {
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

}

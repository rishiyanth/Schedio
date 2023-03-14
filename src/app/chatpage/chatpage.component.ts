import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements OnInit {

  @Input() chatProfile: any 

  constructor() { }

  ngOnInit(): void {
  }

}

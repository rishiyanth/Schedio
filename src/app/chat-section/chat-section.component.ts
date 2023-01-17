import { Component, OnInit } from '@angular/core';

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

}

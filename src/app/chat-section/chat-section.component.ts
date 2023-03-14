import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-section',
  templateUrl: './chat-section.component.html',
  styleUrls: ['./chat-section.component.scss']
})

export class ChatSectionComponent implements OnInit {

  chatProfile : any

  contacts = [
    {
      id:1,
      name: 'Krishna Sameer',
      content: 'dei mama',
      lastTexted: 'wed'
    },
    {
      id:2,
      name: 'Rishiyanth',
      content: 'worst ra',
      lastTexted: 'tue'
    },
    {
      id:3,
      name: 'Chris Pratt',
      content: 'how you doing?',
      lastTexted: 'tue'
    },
    {
      id:4,
      name: 'Groot',
      content: 'Im Groot.Im Groot.Im Groot.Im Groot.Im Groot.Im Groot.',
      lastTexted: 'tue'
    },
    {
      id:5,
      name: 'Batman',
      content: 'Im Batman.',
      lastTexted: 'thurs'
    },
  
  ]

  constructor() { }

  ngOnInit(): void {
  }

  openChat(id:any){
    this.contacts.filter((data)=>{
      if(data.id == id){
        this.chatProfile = data
      }
    })
  } 

}

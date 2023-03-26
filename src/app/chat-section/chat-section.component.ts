import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPost } from 'src/assets/interfaces/post.model';
import { IProfile } from 'src/assets/interfaces/profile.model';
import { ProfileService } from '../profile/profile.service';
import { TalkService } from 'src/services/chat/talk.service';
import Talk from 'talkjs';

@Component({
  selector: 'app-chat-section',
  templateUrl: './chat-section.component.html',
  styleUrls: ['./chat-section.component.scss']
})

export class ChatSectionComponent implements OnInit {
  private inbox!: Talk.Inbox;
  private session!: Talk.Session;
  currentUser?: IProfile = {};
  otherUsers?: IProfile[] = [];
  selectedUser?: IProfile;
  otherUser?: IProfile;
  otherSearchedUsers: IProfile[] = [];
  selectedTechStackId = ""
  currentSearchTerm: string = "";
  currentSearchItems: IProfile[] = [];
  counter = 0;


  @ViewChild('talkjsContainer') talkjsContainer!: ElementRef;
  constructor(private talkService: TalkService,private profileService: ProfileService){
  }

  async ngOnInit() {
    this.currentUser = await this.profileService.getMyProfile().toPromise();
    this.selectedUser = this.currentUser
    this.otherUsers = await this.profileService.getAllUserProfile().toPromise();
    this.otherSearchedUsers = this.otherUsers!
    this.createInbox();
  }

  async openChat(){
    if(this.selectedTechStackId){
      this.selectedUser = await this.profileService.getUserProfile(+this.selectedTechStackId).toPromise();
      console.log(this.selectedUser)
      this.createInbox()
    }
  }

  private async createInbox() {
    const session = await this.talkService.createCurrentSession(this.currentUser);
    // console.log(this.currentUser)
    this.inbox = await this.talkService.createInbox(session,this.selectedUser);
    this.inbox.mount(this.talkjsContainer.nativeElement);
  }

  

  whileSearch = ($event: { term: string; items: IProfile[]; }) => {
    this.currentSearchTerm = $event.term;
    this.currentSearchItems = []
    $event.items.forEach((item: IProfile) => {
      this.currentSearchItems.push(item);
    })
  }

  filterOnEnter = ($event: KeyboardEvent): boolean => {
    if($event.key == "Enter"){
      // this.renderFilteredPosts()
      this.otherSearchedUsers = this.currentSearchItems;
    }
    return true;
  }

}

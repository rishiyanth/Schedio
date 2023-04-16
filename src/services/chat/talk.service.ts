import { Injectable } from '@angular/core';
import { ProfileService } from 'src/app/profile/profile.service';
import { IProfile } from 'src/assets/interfaces/profile.model';
import Talk from 'talkjs';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class TalkService {

  currentUser!: Talk.User;  

  constructor() {
  }

  async createUser(applicationUser: any) {
    // console.log(applicationUser)
    await Talk.ready;
    return new Talk.User({
      id: applicationUser.id,
      name: applicationUser.username,
      photoUrl: applicationUser.photoUrl,
      role: 'default'
    });
  }

  async createCurrentSession(user: any) { 
    await Talk.ready;
    // const user = {
    //   id: 1,
    //   username: 'Alice',
    //   email: 'alice@example.com',
    //   photoUrl: 'https://bootstrapious.com/i/snippets/sn-chat/avatar.svg',
    //   welcomeMessage: 'Hey there! How are you? :-)',
    //   role: 'default'
    // };
    this.currentUser = await this.createUser(user);
    const session = new Talk.Session({
         appId: 't8oaKuOc',
         me: this.currentUser
    });
    return session;
  }

  private async getOrCreateConversation(session: Talk.Session, otherApplicationUser: any) {
    const otherUser = await this.createUser(otherApplicationUser);
    const conversation = session.getOrCreateConversation(Talk.oneOnOneId(this.currentUser, otherUser));
    conversation.setParticipant(this.currentUser);
    conversation.setParticipant(otherUser);
    return conversation;
  }

  async createInbox(session: Talk.Session,otherApplicationUser: any) {
    // const otherApplicationUser = {
    //   id: 2,
    //   username: 'Lara',
    //   email: 'sebastian@example.com',
    //   photoUrl: 'https://bootstrapious.com/i/snippets/sn-chat/avatar.svg',
    //   welcomeMessage: 'Hey, how can I help?',
    //   role: 'default'
    // };
    const conversation = await this.getOrCreateConversation(session, otherApplicationUser);
    const inbox = session.createInbox();
    inbox.select(conversation);
    return inbox;
 }
}

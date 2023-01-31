import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoaderService } from 'src/services/loader/loader.service';
import { ChatSectionComponent } from './chat-section/chat-section.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { NewuserComponent } from './newuser/newuser.component';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'newuser',component:NewuserComponent},
  {path:'feed',component:FeedComponent},
  {path:'profile',component:ProfileComponent},
  {path: 'chat', component:ChatSectionComponent},
  {path: 'post',component:PostdetailComponent},
  {path: '',component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


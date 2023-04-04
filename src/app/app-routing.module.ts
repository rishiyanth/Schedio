import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { LoaderService } from 'src/services/loader/loader.service';
import { ChatSectionComponent } from './chat-section/chat-section.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { NewuserComponent } from './newuser/newuser.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'newuser',component:NewuserComponent},
  {path:'feed',component:FeedComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'user',component:UserProfileComponent,canActivate:[AuthGuard]},
  {path: 'chat', component:ChatSectionComponent,canActivate:[AuthGuard]},
  {path: 'post',component:PostdetailComponent,canActivate:[AuthGuard]},
  {path: 'notifications',component:NotificationsComponent,canActivate:[AuthGuard]},
  {path: '',component: LoginComponent},
  { path: '**', pathMatch: 'full',component:PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


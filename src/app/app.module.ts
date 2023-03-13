import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { NewuserComponent } from './newuser/newuser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from '../interceptors/loader.interceptor';
import { FeedComponent } from './feed/feed.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChatSectionComponent } from './chat-section/chat-section.component';
import { CookieService } from 'ngx-cookie-service';
import {MatButtonModule} from '@angular/material/button';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { PostComponent } from './post/post.component';
import { SafePipe } from './safehtml.pipe';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewuserComponent,
    FeedComponent,
    LoaderComponent,
    SidebarComponent,
    LoaderComponent,
    ProfileComponent,
    ChatSectionComponent,
    ImageCropperComponent,
    PostComponent,
    SafePipe,
    PostdetailComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HttpClientModule,
    ImageCropperModule,
    MatButtonModule,
    NgSelectModule,
    NgOptionHighlightModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
   },
   CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

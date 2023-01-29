import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPost } from '../interfaces/post.model';
import { BACKEND_URL } from 'src/assets/constants/url';
import { CookieService } from 'ngx-cookie-service';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient, private cookieService: CookieService) {}
  
  token = new HttpHeaders().set('Authorization',this.cookieService.get('Token'))

  getMyPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(BACKEND_URL+"get-myposts/",{headers: this.token});
  }

  getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(BACKEND_URL+"get-allposts/");
  }

}

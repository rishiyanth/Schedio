import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPost } from 'src/assets/interfaces/post.model';
import { BACKEND_URL, DELETE_POST, GET_ALL_POSTS, GET_MY_POSTS, GET_POST_DATA, GET_POST_STACK_NAMES, GET_SELECTED_POST, GET_USER_DATA, LIKE_POST, POST_LIKED_BOOLEAN, SEND_EMAIL, USER_LIKED_POST } from 'src/assets/constants/url';
import { CookieService } from 'ngx-cookie-service';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService,
    private httpClientHandler: HttpClient,
    private httpBackendHandler: HttpBackend,
  ) {
    this.httpClientHandler = new HttpClient(httpBackendHandler);
  }
  
  token = new HttpHeaders().set('Authorization',this.cookieService.get('Token'))

  getMyPosts(): Observable<any[]> {
    return this.http.get<any[]>(BACKEND_URL+GET_MY_POSTS,{headers: this.token});
  }

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(BACKEND_URL+GET_ALL_POSTS);
  }

  getSelectedPost(id: any): Observable<any[]>{
    return this.http.get<any[]>(BACKEND_URL+GET_SELECTED_POST+id)
  }

  // getSelectedPostUserDetails(id:any){
  //   return this.http.get(BACKEND_URL+GET_USER_DATA+id)
  // }
  
  // Going to a user's profile page, we get his posts
  getUserPosts(id: any): Observable<any[]>{
    return this.http.get<any[]>(BACKEND_URL+GET_POST_DATA+id);
  }

  deleteMyPost(id:any): Observable<any> {
    return this.http.delete(BACKEND_URL+DELETE_POST+id);
  }

  likePost(id:number): Observable<any>{
    return this.httpClientHandler.get(BACKEND_URL+LIKE_POST+id,{headers:this.token});
  }

  savePost(id:number): Observable<any>{
    // return this.httpClientHandler.get(BACKEND_URL+LIKE_POST+id,{headers:this.token});
    return of(true);
  }

  sendEmail(id: number): Observable<any>{
    return this.httpClientHandler.get(BACKEND_URL+SEND_EMAIL+id,{headers:this.token});
  }

  getLikedPosts(): Observable<any>{
    return this.httpClientHandler.get(BACKEND_URL+USER_LIKED_POST,{headers:this.token});
  }

  getPostLikedStatus(id:any): Observable<any>{
    return this.httpClientHandler.get(BACKEND_URL+POST_LIKED_BOOLEAN+id,{headers:this.token});
  }

  getPostStackNames(arr: number[]): Observable<any>{
    // console.log({"tech_stack": arr})
    return this.httpClientHandler.post(BACKEND_URL+GET_POST_STACK_NAMES,{"tech_stack":arr});
  }
}

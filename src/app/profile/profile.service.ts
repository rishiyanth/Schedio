import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProfile } from 'src/assets/interfaces/profile.model';
import { BACKEND_URL, GET_ALL_USERS, GET_MY_PROFILE, GET_MY_USERNAME, GET_USER_DATA } from 'src/assets/constants/url';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  token = new HttpHeaders().set('Authorization',this.cookieService.get('Token'))

  getMyProfile(): Observable<any> {
    // console.log(this.token)
    return this.http.get<any>(BACKEND_URL+GET_MY_USERNAME,{headers: this.token});
  }

  getUserProfile(id: number): Observable<any> {
    return this.http.get<any>(BACKEND_URL + GET_USER_DATA+ `${id}`);
  }

  getAllUserProfile(): Observable<any[]>{
    return this.http.get<any[]>(BACKEND_URL + GET_ALL_USERS);
  }

}

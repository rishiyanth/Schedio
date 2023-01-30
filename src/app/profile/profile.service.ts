import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProfile } from '../interfaces/profile.model';
import { BACKEND_URL } from 'src/assets/constants/url';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  token = new HttpHeaders().set('Authorization',this.cookieService.get('Token'))

  getMyProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(BACKEND_URL+"get-mydata/",{headers: this.token});
  }

  getUserProfile(id: number): Observable<IProfile> {
    return this.http.get<IProfile>(BACKEND_URL + `user-post/${id}`,);
  }

}

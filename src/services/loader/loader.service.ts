import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { BACKEND_URL, GET_MY_PROFILE, GET_MY_USERNAME, USER_EXISTS } from 'src/assets/constants/url';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();
  userData:any
  userProfile: any
  status?: boolean
 
  constructor(private cookieservice: CookieService,private http: HttpClient,private router: Router) {
    
  }

  show() {
     this.isLoading.next(true);
  }

  hide() {
     this.isLoading.next(false);
  }

  // checkUser(){
  //   let logoutheader = new HttpHeaders().set('Authorization',this.cookieservice.get('Token'))
  //   this.http.get(BACKEND_URL+USER_EXISTS,{headers:logoutheader}).subscribe(
  //     (data:any)=>{
  //       // console.log(data)
  //       if(!data.user_exists)
  //         this.router.navigate(['login'])
  //     },
  //     (error)=>{
  //       this.router.navigate(['login'])
  //     }
  //   )
  // }

  checkUser(){
    let logoutheader = new HttpHeaders().set('Authorization',this.cookieservice.get('Token'))
    this.http.get(BACKEND_URL+USER_EXISTS,{headers:logoutheader}).subscribe(
      (data:any)=>{
        this.status = data.user_exists
        // console.log(data.user_exists)
      }
    );
    return this.status
  }

  checkLogin(){
    let logoutheader = new HttpHeaders().set('Authorization',this.cookieservice.get('Token'))
    this.http.get(BACKEND_URL+USER_EXISTS,{headers:logoutheader}).subscribe(
      (data:any)=>{
        // console.log(data)
        if(data.user_exists)
          this.router.navigate(['feed'])
      },
      (error)=>{
        this.router.navigate(['login'])
      }
    )
  }

  getUserData(){
    let logoutheader = new HttpHeaders().set('Authorization',this.cookieservice.get('Token'))
    this.http.get(BACKEND_URL+GET_MY_USERNAME,{headers:logoutheader}).subscribe(
      (data:any)=>{
        // console.log(logoutheader)
        console.log(data.email)
        this.userData = data
      },
      (error)=>{
        console.log(this.cookieservice.get('Token'))
        // this.router.navigate(['login'])
      }
    );
  }

  getUserProfile(){
    let logoutheader = new HttpHeaders().set('Authorization',this.cookieservice.get('Token'))
    this.http.get(BACKEND_URL+GET_MY_PROFILE,{headers:logoutheader}).subscribe(
      (data:any)=>{
        // console.log(logoutheader)
        console.log(data)
        this.userProfile = data
        return data
      },
      (error)=>{
        console.log(this.cookieservice.get('Token'))
        // this.router.navigate(['login'])
      }
    );
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { url } from 'src/assets/constants/url';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();
  userData:any
 
  constructor(private cookieservice: CookieService,private http: HttpClient,private router: Router) {
    
  }

  show() {
     this.isLoading.next(true);
  }

  hide() {
     this.isLoading.next(false);
  }

  checkUser(){
    let logoutheader = new HttpHeaders().set('Authorization',this.cookieservice.get('Token'))
    this.http.get(url+"user/",{headers:logoutheader}).subscribe(
      (data:any)=>{
        // console.log(data)
        if(!data.user_exists)
          this.router.navigate(['login'])
      },
      (error)=>{
        this.router.navigate(['login'])
      }
    )
  }

  checkLogin(){
    let logoutheader = new HttpHeaders().set('Authorization',this.cookieservice.get('Token'))
    this.http.get(url+"user/",{headers:logoutheader}).subscribe(
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
    this.http.get(url+"get-username/",{headers:logoutheader}).subscribe(
      (data:any)=>{
        this.userData = data
      },
      (error)=>{
        this.router.navigate(['login'])
      }
    );
  }
  
}

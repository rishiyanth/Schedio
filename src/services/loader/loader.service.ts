import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();
 
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
    this.http.get("http://localhost:8000/user/",{headers:logoutheader}).subscribe(
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
    this.http.get("http://localhost:8000/user/",{headers:logoutheader}).subscribe(
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
  
}

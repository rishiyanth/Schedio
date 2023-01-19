import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private cookieService: CookieService, private route: Router,private http: HttpClient) { }

  ngOnInit(): void {
  }

  logout(): void{
    let logoutheader = new HttpHeaders().set('Authorization',this.cookieService.get('Token'))
    // console.log(logoutheader.get('Authorization'))

    this.http.post("http://localhost:8000/logout/",{},{headers: logoutheader})
    .subscribe(()=>{

    })
    this.cookieService.delete('Token')
    // console.log(this.cookieService.get('Token'))
    this.route.navigate(['login'])
  }

}

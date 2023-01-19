import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private cookieService: CookieService, private route: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.cookieService.delete('Token')
    console.log(this.cookieService.get('Token'))
    this.route.navigate(['login'])
  }

}

import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/services/loader/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private loaderService:LoaderService) { }

  ngOnInit(): void {
    this.loaderService.checkUser()
  }

}

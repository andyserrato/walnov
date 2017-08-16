import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  normal:boolean;
  partner: boolean;
  premium:boolean;
  constructor() {

  }

  ngOnInit() {
    this.normal = false;
    this.partner = false;
    this.premium = true;
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  isNavBarHidden: boolean;
  searching: boolean = false;
  user: any;
  popover: boolean;

  constructor(location: Location, router: Router, private auth: AuthenticationService) {
    this.user= this.auth.isLoggedIn() ? this.auth.getUser() : false;
    router.events.subscribe((val) => {
      if (location.path().indexOf('social-login/success') !== -1) {
        this.isNavBarHidden = true;
      } else if (location.path().indexOf('social-login/failure') !== -1) {
        this.isNavBarHidden = true;
      } else if (location.isCurrentPathEqualTo('')) {
        this.isNavBarHidden = true;
      } else {
        this.isNavBarHidden = false;
      }
    });
  }

  ngOnInit() {

  }

}

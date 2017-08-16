import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  isNavBarHidden: boolean;
  searching: boolean = false;


  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      console.log('hola desde nav bar');
      console.log(location.path());
      this.isNavBarHidden = (location.isCurrentPathEqualTo('') ||
        location.isCurrentPathEqualTo('social-login/success') ||
        location.isCurrentPathEqualTo('/social-login/failure'));
    });
  }

  ngOnInit() {

  }

}

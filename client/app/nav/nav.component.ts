import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isNavBarHidden: boolean;

  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      this.isNavBarHidden = location.isCurrentPathEqualTo('');
    });
  }

  ngOnInit() {
  }

}

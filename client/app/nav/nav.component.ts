import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { SearchService } from '../services/search.service';
import { RepositorioService } from '../services/repositorio.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {RegisterPopoverService} from '../services/register-popover.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [SearchService]
})

export class NavComponent implements OnInit {
  searchTerm$ = new Subject<string>(); //Servicio buscador
  visible: boolean;
  isNavBarHidden: boolean;
  searching = false;
  idioma = false;
  user: any;
  profilePicture: string;
  constructor(location: Location,
              router: Router,
              private auth: AuthenticationService,
              private searchService: SearchService,
              private repositorio: RepositorioService,
              private popoverService: RegisterPopoverService) {
    this.user = this.auth.isLoggedIn() ? this.auth.getUser() : false;
    router.events.subscribe((val) => {
      if (location.path().indexOf('social-login/success') !== -1) {
        this.isNavBarHidden = true;
      } else if (location.path().indexOf('social-login/failure') !== -1) {
        this.isNavBarHidden = true;
      } else if (location.isCurrentPathEqualTo('')) {
        this.isNavBarHidden = true;
      } else if (location.path().indexOf('descarga-la-app') !== -1) {
        this.isNavBarHidden = true;
      } else {
        this.isNavBarHidden = false;
      }
    });
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.repositorio.results = results.results;
    });
  }

  ngOnInit() {
  }

  getProfilePicture(): string {
    this.profilePicture = 'https://lorempixel.com/22/22/cats';
    if (this.auth.isLoggedIn() && this.auth.getUser() && this.auth.getUser().perfil && this.auth.getUser().perfil.foto_perfil) {
      this.profilePicture = this.auth.getUser().perfil.foto_perfil;
    }
    return this.profilePicture;
  }

  popover() {
    if(!this.visible){
      this.popoverService.setVisible(true);
    }

  }

}

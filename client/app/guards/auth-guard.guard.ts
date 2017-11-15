import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot ) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    return true;
  }
}

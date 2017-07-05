import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  errorMessage: string;
  credentials: any = {};

  constructor (private _authenticationService: AuthenticationService, private _router: Router) {

  }

  signin() {
    this._authenticationService.signin(this.credentials).subscribe(result => this._router.navigate(['/']),
      error => this.errorMessage = error);
  }

  ngOnInit() {
  }

}

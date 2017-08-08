import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  message: string;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getSocialProfile().subscribe( user => {
      console.log(user);
      this.message = 'usuario logueado';
    });
  }

}

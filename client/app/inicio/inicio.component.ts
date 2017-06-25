import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  user: any;

  constructor (private _authenticationService: AuthenticationService) {
    console.log('Obteniendo el usuario');
    this._authenticationService.primerLogueoSocial()
      .subscribe(result  => console.log(result),
        error =>  console.log(error));

    this.user = _authenticationService.user;
    console.log(this.user);
  }

  ngOnInit() {
  }

}

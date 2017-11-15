import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {AlertService} from '../../../services/alert.service';
import {WindowService} from '../../../services/window.service';
import { TranslateService } from '../../../translate';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private alertService: AlertService,
              private windowService: WindowService, private translate: TranslateService ) { }

  ngOnInit() {
    this.authenticationService.getSocialProfile().subscribe( user => {
      let nombre = this.authenticationService.getUser().login;
      if (this.authenticationService.getUser().perfil && this.authenticationService.getUser().perfil.display_name) {
        nombre = this.authenticationService.getUser().perfil.display_name;
      }

      this.alertService.success(this.translate.instant('alert_bienvenido') + ' ' + nombre, true );
    },
      error => (this.alertService.error(this.translate.instant('alert_popover_error'))));

    this.closeWindowTimer();
  }

  closeWindowTimer() {
    window.setTimeout(() => {
      this.windowService.nativeWindow.close();
    }, 3000);
  }

}

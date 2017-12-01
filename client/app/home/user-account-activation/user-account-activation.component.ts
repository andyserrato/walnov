import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {RegisterPopoverService} from "../../services/register-popover.service";
import {TranslateService} from "../../translate/translate.service";

@Component({
  selector: 'app-user-account-activation',
  templateUrl: './user-account-activation.component.html',
  styleUrls: ['./user-account-activation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserAccountActivationComponent implements OnInit {
  temporaryToken: string;
  message: any;
  isActivated: boolean;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: AuthenticationService,
              private popOver: RegisterPopoverService,
              private translate: TranslateService) {
      this.temporaryToken = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.activateUser();
  }

  activateUser() {
    this.auth.activateAccount(this.temporaryToken).subscribe((respuesta) => {
      this.message = {
        text: this.translate.instant('home_account_activation_text'),
        buttonText: this.translate.instant('home_account_activation_button_text')
      };
      this.isActivated = true;
      this.popOver.redirectUrl = 'home';
    }, (error) => {
      let buttonText = this.translate.instant('home_account_activation_button_text_error');

      if (error.status === 401) {
        buttonText = this.translate.instant('home_account_activation_button_text')
      }

      this.message = {
        text: this.translate.instant(error.json().error),
        buttonText: buttonText
      };
      this.isActivated = false;
    });
  }

  navigate() {
    this.popOver.setVisible(true);
  }
}

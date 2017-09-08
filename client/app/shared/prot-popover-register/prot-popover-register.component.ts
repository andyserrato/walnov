import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertService} from '../../services/alert.service';
import { TranslateService } from '../../translate';

@Component({
  selector: 'app-prot-popover-register',
  templateUrl: './prot-popover-register.component.html',
  styleUrls: ['./prot-popover-register.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class ProtPopoverRegisterComponent implements OnInit {
  @Input() visible: boolean;
  @ViewChild('div') div: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('pass') pass: ElementRef;
  @ViewChild('user') user: ElementRef;
  @Input() direction: string;
  @Output() loged: EventEmitter<any>;
  @Output() focusOut: EventEmitter<any>;
  validateForm: FormGroup;
  view = 'register';
  loading = false;
  callbackURL = '/social-login/success';
  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private alertService: AlertService, private translate: TranslateService) {
    this.loged = new EventEmitter<any>();
    this.focusOut = new EventEmitter<any>();
    this.validateForm = fb.group({
      'mail': [null, Validators.compose([Validators.required, Validators.email])],
      'user': [null, Validators.required],
      'pass': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  onClick(event) {
    if (!this.div.nativeElement.contains(event.target) && this.visible) {
      this.focusOut.emit();
      this.view = 'register';
    }
  }

  changeView(str: string) {
    this.view = str;
  }

  register() {
    if (this.validateForm.valid) {
      this.loading = true;
      const user = {
        login: this.validateForm.controls['user'].value,
        password : this.validateForm.controls['pass'].value,
        email: this.validateForm.controls['mail'].value
      };
      this.authenticationService.signup(user).subscribe(result  => {
          console.log('Ruta buena' + user);
          localStorage.setItem('currentUser', JSON.stringify(result));
          this.visible = false;
          this.loged.emit();
          this.loading = false;
          this.alertService.success(this.translate.instant('alert_bienvenido') + ' ' + this.authenticationService.getUser().login);
        },
        error =>  {
          this.loading = false;
          this.alertService.error(error);
        });
      this.alertService.clearTimeOutAlert();
      // console.log(this.mail.nativeElement.value + ', ' + this.pass.nativeElement.value + ', ' + this.user.nativeElement.value);
      // console.log(this.user.nativeElement.value + ', ' + this.pass.nativeElement.value);
    }
  }

  login() {
    if (this.validateForm.controls['user'].valid && this.validateForm.controls['pass'].valid) {
      this.loading = true;
      this.authenticationService.login(this.validateForm.controls['user'].value, this.validateForm.controls['pass'].value).subscribe(
        result => {
          this.visible = false;
          this.loged.emit();
          this.loading = false;
          this.alertService.success(this.translate.instant('alert_bienvenido') + ' ' + this.authenticationService.getUser().login);
        },
        error =>  {
          this.loading = false;
          this.alertService.error(error);
        });
      this.alertService.clearTimeOutAlert();
      // console.log(this.user.nativeElement.value + ', ' + this.pass.nativeElement.value);
    }
  }

  doSocialLogin(url: string) {
    this.authenticationService.doSocialLogin(url + this.callbackURL);
    this.visible = false;
    this.loged.emit();
  }
}

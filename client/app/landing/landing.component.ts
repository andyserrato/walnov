import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {AlertService} from '../services/alert.service';
import {RegisterPopoverService} from '../services/register-popover.service';
import { TranslateService } from '../translate';
import { RepositorioService } from '../services/repositorio.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss', '../landing/styles/bootstrap.min.css', '../landing/styles/font-awesome.min.css', '../landing/styles/linearicons.css', '../landing/styles/owl.carousel.css', '../landing/styles/owl.theme.css', '../landing/styles/responsive.css', '../landing/styles/style.css']
})
export class LandingComponent implements OnInit {
  // visible: boolean;
  @ViewChild('div') div: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('pass') pass: ElementRef;
  @ViewChild('user') user: ElementRef;
  @Input() direction = 'down';
  @Output() loged: EventEmitter<any>;
  @Output() focusOut: EventEmitter<any>;
  validateForm: FormGroup;
  view = 'login';
  loading = false;
  callbackURL = '/social-login/success';

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private translate: TranslateService,
              private router: Router,
              private popoverService: RegisterPopoverService,
              private repositorio: RepositorioService) {
    this.loged = new EventEmitter<any>();
    this.focusOut = new EventEmitter<any>();
    this.validateForm = fb.group({
      'mail': [null, Validators.compose([Validators.required, Validators.email])],
      'user': [null, Validators.required],
      'pass': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    // this.popoverService.isVisible().subscribe(b => {
    //     this.visible = b ? true : false;
    // });
  }

  ngOnInit() {


  }

  // close() {
  //   this.popoverService.setVisible(false);
  //   this.view = 'register';
  // }

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
        // todo no se debe loguear el usuario de inmediato
          localStorage.setItem('currentUser', JSON.stringify(result));
          // this.visible = false;
          this.loged.emit();
          this.loading = false;
          this.router.navigate(['/home']);
          this.alertService.success(this.translate.instant('alert_bienvenido') + ' ' + this.authenticationService.getUser().login);
        },
        error =>  {
          if (error.tipo === this.repositorio.emailDuplicado) {
            console.log('email duplicado');
          } else if (error.tipo === this.repositorio.nombreUsuarioDuplicado) {
            console.log('nombre usuario duplicado');
          }
          this.loading = false;

        });
      this.alertService.clearTimeOutAlert();
    }
  }

  login() {
    if (this.validateForm.controls['user'].valid && this.validateForm.controls['pass'].valid) {
      this.loading = true;
      this.authenticationService.login(this.validateForm.controls['user'].value, this.validateForm.controls['pass'].value).subscribe(
        result => {
          // this.visible = false;
          this.loged.emit();
          this.loading = false;
          this.router.navigate(['/home']);
          this.alertService.success(this.translate.instant('alert_bienvenido') + ' ' + this.authenticationService.getUser().login);
        },
        error =>  {
          this.loading = false;
          this.alertService.error(error);
        });
      this.alertService.clearTimeOutAlert();
    }
  }

  doSocialLogin(url: string) {
    // console.log(this.loged);
    this.authenticationService.doSocialLogin(url + this.callbackURL);
  
    this.loged.emit();
    // console.log(this.loged);
    // if(this.authenticationService.isLoggedIn()) this.router.navigate(['/home']);
  }

  getBackColor(categoria) {
      return categoria.color;
  }
}

import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {AlertService} from '../services/alert.service';
import {RegisterPopoverService} from '../services/register-popover.service';
import { TranslateService } from '../translate';
import { RepositorioService } from '../services/repositorio.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss', '../landing/styles/bootstrap.min.css', '../landing/styles/font-awesome.min.css', '../landing/styles/linearicons.css', '../landing/styles/owl.carousel.css', '../landing/styles/owl.theme.css', '../landing/styles/responsive.css', '../landing/styles/style.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  @ViewChild('div') div: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('pass') pass: ElementRef;
  @ViewChild('user') user: ElementRef;
  @Input() direction = 'down';
  @Output() loged: EventEmitter<any>;
  @Output() focusOut: EventEmitter<any>;
  validateForm: FormGroup;
  view = 'register';
  loading = false;
  callbackURL = '/social-login/success';
  private subscription: Subscription;
  showAlert = false;
  alertMessage = '';
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
  }

  ngOnInit() {

  }

  changeView(str: string) {
    this.view = str;
  }

  register() {
    this.showAlert = false;
    if (this.validateForm.valid) {
      this.loading = true;
      const user = {
        login: this.validateForm.controls['user'].value,
        password : this.validateForm.controls['pass'].value,
        email: this.validateForm.controls['mail'].value
      };
      this.authenticationService.signup(user).subscribe(result  => {
          this.loading = false;
          this.router.navigate(['/home']);
          this.alertService.success(this.translate.instant('alert_cuenta_registrada'), true);
        },
        error =>  {
          if (error.tipo === this.repositorio.emailDuplicado) {
            this.alertMessage = this.translate.instant('alert_email_ya_existe');
            this.showAlert = true;
          } else if (error.tipo === this.repositorio.nombreUsuarioDuplicado) {
            this.alertMessage = this.translate.instant('alert_user_name_ya_existe');
            this.showAlert = true;
          }
          this.loading = false;
        });
    }
  }

  login() {
    this.showAlert = false;
    if (this.validateForm.controls['user'].valid && this.validateForm.controls['pass'].valid) {
      this.loading = true;
      this.authenticationService.login(this.validateForm.controls['user'].value, this.validateForm.controls['pass'].value).subscribe(
        result => {
          this.loged.emit();
          this.loading = false;
          this.router.navigate(['/home']);
          this.alertService.success(this.translate.instant('alert_bienvenido') + ' ' + this.authenticationService.getUser().login);
        },
        error =>  {
          this.loading = false;
          this.alertMessage = error;
          this.showAlert = true;
        });
      this.alertService.clearTimeOutAlert();
    }
  }

  doSocialLogin(url: string) {
    this.authenticationService.doSocialLogin(url + this.callbackURL);
    this.subscription = this.checkforUser().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
    this.loged.emit();
  }

  getBackColor(categoria) {
      return categoria.color;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  checkforUser(): Observable<boolean> {
    return Observable
      .interval(1000)
      .flatMap(() => {
        return Observable.of(this.authenticationService.isLoggedIn());
      });
  }

  close() {
    this.showAlert = false;
  }
}

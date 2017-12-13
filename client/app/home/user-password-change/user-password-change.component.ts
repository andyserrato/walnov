import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../validators/password-validation';
import {AlertService} from '../../services/alert.service';
import {TranslateService} from '../../translate';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserPasswordChangeComponent implements OnInit {
  form: FormGroup;
  temporaryToken: string;

  constructor(fb: FormBuilder,
              private alertService: AlertService,
              private translate: TranslateService,
              private auth: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
    this.form = fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });

    this.temporaryToken = route.snapshot.paramMap.get('token');
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.controls.password.valid && this.form.controls.confirmPassword.valid) {
      this.auth.passwordChange(this.temporaryToken, this.form.controls.password.value).subscribe((respuesta) => {
        this.alertService.success(respuesta.message, true);
        this.router.navigate(['/home']);
      }, (error) => {
        this.alertService.warning(error);
      });
    }
  }
}

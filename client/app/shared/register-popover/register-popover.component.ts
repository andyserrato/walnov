import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {WindowService} from '../../services/window.service';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-register-popover',
  templateUrl: './register-popover.component.html',
  styleUrls: ['./register-popover.component.scss']
})
export class RegisterPopoverComponent implements OnInit {
  registerForm: FormGroup;
  @Input() textoBoton: string;
  @Input() estilosBoton: string;
  @Input() disabledBoton: boolean;
  @Input() callbackURL: string;
  popoverDisplay: boolean;
  loading = false;
  submitted = false;
  user = new User();
  private windowHandle: any = null;
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'minlength': 'Email must be at least 4 characters long.',
      'maxlength': 'Email cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'password': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'login': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
  };


  constructor(private fb: FormBuilder, private userService: UserService, private authenticacion: AuthenticationService) {
    // this.user = new User();
    this.textoBoton = 'Publicar';
  }

  ngOnInit() {
    this.buildForm();
    this.popoverDisplay = true;
  }

  togglePopover() {
    this.popoverDisplay = this.popoverDisplay ? false : true;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.userService.create(this.registerForm.value)
      .subscribe(
        data => {
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  registerFacebook() {
    this.loading = true;
    this.userService.createByFaceBook()
      .subscribe(
        data => {
          this.loading = false;
        } ,
        error => {
          this.loading = false;

        }
      );
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      'email': [this.user.email, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.email
      ]],
      'login': [this.user.login, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]]
    });
  }

  doSocialLogin(url: string) {
    this.authenticacion.doSocialLogin(url + this.callbackURL);
  }

}

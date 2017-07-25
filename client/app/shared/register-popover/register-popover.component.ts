import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register-popover',
  templateUrl: './register-popover.component.html',
  styleUrls: ['./register-popover.component.scss']
})
export class RegisterPopoverComponent implements OnInit {
  registerForm: FormGroup;
  textoBoton: string;
  popoverDisplay: boolean;
  loading = false;
  submitted = false;
  user = new User();
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


  constructor(private fb: FormBuilder, private userService: UserService) {
    // this.user = new User();
    this.textoBoton = 'Publicar';
  }

  ngOnInit() {
    this.buildForm();
    this.popoverDisplay = false;
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
          console.log(error);
          this.loading = false;
        });
  }

  registerFacebook() {
    this.loading = true;
    this.userService.createByFaceBook()
      .subscribe(
        data => {
          this.loading = false;
          console.log('SUCCESS');
          console.log(data);
        } ,
        error => {
          this.loading = false;
          console.log('Ha ocurrido un error');

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

}

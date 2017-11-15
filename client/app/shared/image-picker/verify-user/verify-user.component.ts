import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from "../../../services/authentication.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {
  @Output() canceled: EventEmitter<any>;
  @Output() verified: EventEmitter<any>;
  userForm: FormGroup;
  constructor(private auth: AuthenticationService) {
    this.canceled = new EventEmitter<any>();
    this.verified = new EventEmitter<any>();
   }

  ngOnInit() {
  }

   inicializarFrom() {
    this.userForm = new FormGroup({
      nombre : new FormControl(),
      apellidos: new FormControl(),
      fechaNacimiento: new FormControl(),
      idioma: new FormControl(),
      pais: new FormControl()
    });
   }

  verify() {
    this.verified.emit();
  }

  cancel() {
    this.canceled.emit();
  }

  user(): any {
    return this.auth.getUser();
  }

}

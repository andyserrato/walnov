import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationComponent } from './authentication.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule
  ],
  providers: [AuthenticationService],
  declarations: [AuthenticationComponent, SigninComponent, SignupComponent]
})
export class AuthenticationModule { }

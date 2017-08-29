import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';;
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './user-account.component';
import { CardUserAccountNavigateComponent } from './card-user-account-navigate/card-user-account-navigate.component';
import { UserAccountDataProfileComponent } from './user-account-data-profile/user-account-data-profile.component';
import { UserAccountInteresesComponent } from './user-account-intereses/user-account-intereses.component';
import { UserAccountPreferencesComponent } from './user-account-preferences/user-account-preferences.component';
import { UserAccountPremiumComponent } from './user-account-premium/user-account-premium.component';
import { ProfileHeaderComponent } from './user-account-data-profile/profile-header/profile-header.component';
import { UserAccountRoutingModule } from './user-account.routing';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    UserAccountComponent,
    CardUserAccountNavigateComponent,
    UserAccountDataProfileComponent,
    UserAccountInteresesComponent,
    ProfileHeaderComponent,
    UserAccountPreferencesComponent,
    UserAccountPremiumComponent
  ]
})
export class UserAccountModule { }

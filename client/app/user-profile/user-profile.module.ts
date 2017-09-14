import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';;
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserContentChatstoriesComponent } from './user-content/user-content-chatstories/user-content-chatstories.component';
import { UserContentContinuacionesComponent } from './user-content/user-content-continuaciones/user-content-continuaciones.component';
import { UserContentHistoriasComponent } from './user-content/user-content-historias/user-content-historias.component';
import { UserContentRelatosComponent } from './user-content/user-content-relatos/user-content-relatos.component';
// import { UserCardComponent } from './user-card/user-card.component';
import { UserContentComponent } from './user-content/user-content.component';
import { UserProfileRoutingModule } from './user-profile.routing';
import { SharedModule } from '../shared/shared.module';
import { UserContentWallsComponent } from './user-content/user-content-walls/user-content-walls.component';
@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    UserProfileComponent,
    UserContentChatstoriesComponent,
    UserContentContinuacionesComponent,
    UserContentHistoriasComponent,
    UserContentRelatosComponent,
    UserContentWallsComponent,
    // UserCardComponent,
    UserContentComponent
  ]
})
export class UserProfileModule { }

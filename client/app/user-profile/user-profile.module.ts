import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './user-profile.component';
import {UserContentChatstoriesComponent} from './user-content/user-content-chatstories/user-content-chatstories.component';
import {UserContentContinuacionesComponent} from './user-content/user-content-continuaciones/user-content-continuaciones.component';
import {UserContentHistoriasComponent} from './user-content/user-content-historias/user-content-historias.component';
import {UserContentRelatosComponent} from './user-content/user-content-relatos/user-content-relatos.component';
import {UserContentComponent} from './user-content/user-content.component';
import {UserProfileRoutingModule} from './user-profile.routing';
import {SharedModule} from '../shared/shared.module';
import {UserContentWallsComponent} from './user-content/user-content-walls/user-content-walls.component';
import {UserFollowersComponent} from './user-followers/user-followers.component';

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
    UserContentComponent,
    UserFollowersComponent
  ]
})
export class UserProfileModule {
}

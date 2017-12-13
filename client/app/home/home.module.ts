import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {CardHomeNavigateComponent} from './card-home-navigate/card-home-navigate.component';
import {HomeGuardadoComponent} from './home-guardado/home-guardado.component';
import {HomeMisChatstoriesComponent} from './home-mis-chatstories/home-mis-chatstories.component';
import {HomeMisRelatosComponent} from './home-mis-relatos/home-mis-relatos.component';
import {HomeRecienteComponent} from './home-reciente/home-reciente.component';
import {GuardadoChatstoriesComponent} from './home-guardado/guardado-chatstories/guardado-chatstories.component';
import {GuardadoRelatosComponent} from './home-guardado/guardado-relatos/guardado-relatos.component';
import {GuardadoWallsComponent} from './home-guardado/guardado-walls/guardado-walls.component';
import {NuevoUserComponent} from './home-reciente/nuevo-user/nuevo-user.component';
import {RecienteNotificacionComponent} from './home-reciente/reciente-notificacion/reciente-notificacion.component';
import {HomeRoutingModule} from './home.routing';
import {SharedModule} from '../shared/shared.module';
import {HomeBuscadorComponent} from './home-buscador/home-buscador.component';
import {PaymentModule} from '../payments/payment.module';
import {UserAccountActivationComponent} from './user-account-activation/user-account-activation.component';
import {UserPasswordChangeComponent} from './user-password-change/user-password-change.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PaymentModule
  ],
  declarations: [
    HomeComponent,
    CardHomeNavigateComponent,
    HomeGuardadoComponent,
    HomeMisChatstoriesComponent,
    HomeMisRelatosComponent,
    HomeRecienteComponent,
    GuardadoChatstoriesComponent,
    GuardadoRelatosComponent,
    GuardadoWallsComponent,
    NuevoUserComponent,
    RecienteNotificacionComponent,
    HomeBuscadorComponent,
    UserAccountActivationComponent,
    UserPasswordChangeComponent

  ]
})
export class HomeModule {
}

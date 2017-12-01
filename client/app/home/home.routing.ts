import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {HomeGuardadoComponent} from './home-guardado/home-guardado.component';
import {HomeMisChatstoriesComponent} from './home-mis-chatstories/home-mis-chatstories.component';
import {HomeMisRelatosComponent} from './home-mis-relatos/home-mis-relatos.component';
import {HomeRecienteComponent} from './home-reciente/home-reciente.component';
import {HomeBuscadorComponent} from './home-buscador/home-buscador.component';
import {GuardadoWallsComponent} from './home-guardado/guardado-walls/guardado-walls.component';
import {GuardadoRelatosComponent} from './home-guardado/guardado-relatos/guardado-relatos.component';
import {GuardadoChatstoriesComponent} from './home-guardado/guardado-chatstories/guardado-chatstories.component';
import {UserAccountActivationComponent} from './user-account-activation/user-account-activation.component';
import {AuthGuard} from "../guards/auth-guard.guard";

const routes: Routes = [{
  path: 'home',
  component: HomeComponent,
  children: [
    {path: 'actividad-reciente', component: HomeRecienteComponent},
    {path: 'mis-relatos', component: HomeMisRelatosComponent},
    {path: 'mis-chatstories', component: HomeMisChatstoriesComponent},
    {
      path: 'guardado', component: HomeGuardadoComponent, children: [
      {path: 'walls', component: GuardadoWallsComponent},
      {path: 'relatos', component: GuardadoRelatosComponent},
      {path: 'chatstories', component: GuardadoChatstoriesComponent},
      {path: '', redirectTo: '/home/guardado/walls', pathMatch: 'full'}
    ]
    },
    {path: 'mis-walls', redirectTo: '/home/actividad-reciente', pathMatch: 'full'},
    {path: 'buscador', component: HomeBuscadorComponent},
    {path: 'activate/:id', component: UserAccountActivationComponent, canActivate: [AuthGuard] },
    {path: '', redirectTo: '/home/actividad-reciente', pathMatch: 'full'}

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

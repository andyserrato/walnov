import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { UserContentChatstoriesComponent } from './user-content/user-content-chatstories/user-content-chatstories.component';
import { UserContentContinuacionesComponent } from './user-content/user-content-continuaciones/user-content-continuaciones.component';
import { UserContentHistoriasComponent } from './user-content/user-content-historias/user-content-historias.component';
import { UserContentRelatosComponent } from './user-content/user-content-relatos/user-content-relatos.component';
import { UserContentWallsComponent } from './user-content/user-content-walls/user-content-walls.component';

const routes: Routes = [{
  path: 'user-profile/:id',
  component: UserProfileComponent,
  children: [
    { path: 'walls', component: UserContentWallsComponent },
    { path: 'historias', component: UserContentHistoriasComponent },
    { path: 'continuaciones', component: UserContentContinuacionesComponent },
    { path: 'chatstories', component: UserContentChatstoriesComponent },
    { path: 'relatos', component: UserContentRelatosComponent },
    //{ path: '', redirectTo: 'user-profile/:id/walls', pathMatch: 'full'}
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }

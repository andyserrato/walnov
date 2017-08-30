import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeGuardadoComponent } from './home-guardado/home-guardado.component';
import { HomeMisChatstoriesComponent } from './home-mis-chatstories/home-mis-chatstories.component';
import { HomeMisRelatosComponent } from './home-mis-relatos/home-mis-relatos.component';
import { HomeRecienteComponent } from './home-reciente/home-reciente.component';



const routes: Routes = [{
  path: 'home',
  component: HomeComponent,
  children: [
    { path: 'actividad-reciente', component: HomeRecienteComponent },
    { path: 'mis-relatos', component: HomeMisRelatosComponent },
    { path: 'mis-chatstories', component: HomeMisChatstoriesComponent },
    { path: 'guardado', component: HomeGuardadoComponent },
    { path: '', redirectTo: '/home/actividad-reciente', pathMatch: 'full'}

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

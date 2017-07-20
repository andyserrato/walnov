import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { InicioComponent } from './inicio/inicio.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CrearWallComponent } from './crear-wall/crear-wall.component';
import {LandingComponent} from './landing/landing.component';
import { CrearChatstoryComponent } from './chatstory/crear-chatstory/crear-chatstory.component';

const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'inicio', component: InicioComponent}, //canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'crear-wall', component: CrearWallComponent},
    { path: 'crear-chatstory', component: CrearChatstoryComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }

    // otherwise redirect to home
    /*{ path: '**', redirectTo: '' }*/
];

export const routing = RouterModule.forRoot(appRoutes);

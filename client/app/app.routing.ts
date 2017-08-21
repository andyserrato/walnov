import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { InicioComponent } from './inicio/inicio.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CrearWallComponent } from './crear-wall/crear-wall.component';
import { VisorWall } from './visor-wall/visor-wall.component';
import {LandingComponent} from './landing/landing.component';
import {CrearChatstoryStep1Component} from './chatstory/crear-chatstory-step-1/crear-chatstory-step-1.component';
import { Walls } from './walls/walls.component';
import { ListadoWalls } from './walls/listado-walls.component';
import { CrearChatstoryComponent } from './chatstory/crear-chatstory/crear-chatstory.component';
import { BuscadorRelatosComponent } from './relatos/buscador-relatos/buscador-relatos.component';
import { ListadoChatstoriesComponent } from './chatstory/listado-chatstories/listado-chatstories.component';
import { VerChatstoryComponent } from './chatstory/ver-chatstory/ver-chatstory.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CrearRelatoComponent } from './relatos/crear-relato/crear-relato.component';
import { PricingComponent} from './pricing/pricing.component';
import {SuccessComponent} from './shared/social-login/success/success.component';
import {FailureComponent} from './shared/social-login/failure/failure.component';


const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'home', component: HomeComponent },
    { path: 'inicio', component: InicioComponent}, //canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'chatstories', component: ListadoChatstoriesComponent },
    { path: 'relatos', component: BuscadorRelatosComponent },
    { path: 'walls/listado-walls', component: ListadoWalls },
    { path: 'walls', component: Walls,
        children: [
          { path: 'ver-wall', component: VisorWall },
          { path: 'crear-wall', component: CrearWallComponent },
        ]
    },
    { path: 'user-profile', component: UserProfileComponent},
    { path: 'crear-relato', component: CrearRelatoComponent},
    { path: 'social-login/success', component: SuccessComponent},
    { path: 'social-login/failure', component: FailureComponent},

    { path: 'crear-chatstory', component: CrearChatstoryComponent },
    { path: 'chatstory/:id', component: VerChatstoryComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent },
    { path: 'pricing', component: PricingComponent },

    // otherwise redirect to home
    /*{ path: '**', redirectTo: '' }*/
];

export const routing = RouterModule.forRoot(appRoutes);

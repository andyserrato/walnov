import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { InicioComponent } from "./inicio/inicio.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'inicio', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
 
    // otherwise redirect to home
    /*{ path: '**', redirectTo: '' }*/
];
 
export const routing = RouterModule.forRoot(appRoutes);

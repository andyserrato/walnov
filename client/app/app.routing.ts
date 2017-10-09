import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {HomeModule} from './home/home.module';
import {AuthGuard} from './guards/auth-guard.guard';
import {InicioComponent} from './inicio/inicio.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CrearWallComponent} from './crear-wall/crear-wall.component';
import {VisorWall} from './visor-wall/visor-wall.component';
import {LandingComponent} from './landing/landing.component';
import {LandingMobileComponent} from './landing/landing-mobile/landing-mobile.component';
import {CrearChatstoryStep1Component} from './chatstory/crear-chatstory-step-1/crear-chatstory-step-1.component';
import {Walls} from './walls/walls.component';
import {ListadoWalls} from './walls/listado-walls.component';
import {CrearChatstoryComponent} from './chatstory/crear-chatstory/crear-chatstory.component';
import {BuscadorRelatosComponent} from './relatos/buscador-relatos/buscador-relatos.component';
import {ListadoChatstoriesComponent} from './chatstory/listado-chatstories/listado-chatstories.component';
import {VerChatstoryComponent} from './chatstory/ver-chatstory/ver-chatstory.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserProfileModule} from './user-profile/user-profile.module';
import {CrearRelatoComponent} from './relatos/crear-relato/crear-relato.component';
import {PricingPremiumComponent} from './pricing/pricing-premium/pricing-premium.component';
import {PricingPartnerComponent} from './pricing/pricing-partner/pricing-partner.component';
import {PricingPremiumPruebaComponent} from './pricing/pricing-premium/pricing-premium-prueba/pricing-premium-prueba.component';
import {PricingPremiumCheckoutComponent} from './pricing/pricing-premium/pricing-premium-checkout/pricing-premium-checkout.component';
import {ContactoComponent} from './contacto/contacto.component';
import {SuccessComponent} from './shared/social-login/success/success.component';
import {FailureComponent} from './shared/social-login/failure/failure.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {UserAccountModule} from './user-account/user-account.module';
import {VerRelatoComponent} from './shared/ver-relato/ver-relato.component';
import {RelatoComponent} from './relatos/relato/relato.component';

const appRoutes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'descarga-la-app', component: LandingMobileComponent},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'inicio', component: InicioComponent}, //canActivate: [AuthGuard] },
  {path: 'contacto', component: ContactoComponent},
  {path: 'pricing-premium', component: PricingPremiumComponent},
  {path: 'pricing-premium/prueba', component: PricingPremiumPruebaComponent},
  {path: 'pricing-premium/confirma-tu-plan', component: PricingPremiumCheckoutComponent},
  {path: 'pricing-partner', component: PricingPartnerComponent},
  {path: 'chatstories', component: ListadoChatstoriesComponent},
  {path: 'relatos', component: BuscadorRelatosComponent},
  {path: 'walls/listado-walls', component: ListadoWalls},
  {
    path: 'walls', component: Walls,
    children: [
      {path: 'ver-wall', component: VisorWall},
      {path: 'crear-wall', component: CrearWallComponent},
    ]
  },
  {path: 'user-profile/:id', loadChildren: './user-profile/user-profile.module#UserProfileModule'},
  {path: 'user-account', loadChildren: './user-account/user-account.module#UserAccountModule'},
  {path: 'crear-relato/:id', component: CrearRelatoComponent},
  {path: 'social-login/success', component: SuccessComponent},
  {path: 'social-login/failure', component: FailureComponent},

  {path: 'crear-chatstory/:id', component: CrearChatstoryComponent},
  {path: 'relato/:id', component: RelatoComponent},
  {path: 'chatstory/:id', component: VerChatstoryComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},


  // otherwise redirect to home
  /*{ path: '**', redirectTo: '' }*/
];

export const routing = RouterModule.forRoot(appRoutes);

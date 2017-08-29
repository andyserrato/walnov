import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAccountComponent } from './user-account.component';
import { UserAccountDataProfileComponent } from './user-account-data-profile/user-account-data-profile.component';
import { UserAccountPreferencesComponent } from './user-account-preferences/user-account-preferences.component';
import { UserAccountPremiumComponent } from './user-account-premium/user-account-premium.component';



const routes: Routes = [{
  path: 'user-account',
  component: UserAccountComponent,
  children: [
    { path: 'datos', component: UserAccountDataProfileComponent },
    { path: 'preferencias', component: UserAccountPreferencesComponent },
    { path: 'premium', component: UserAccountPremiumComponent },
    { path: '', redirectTo: '/user-account/datos', pathMatch: 'full'}
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule { }

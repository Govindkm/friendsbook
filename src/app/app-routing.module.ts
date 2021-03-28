import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './components/friends/friends.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AllusersComponent } from './components/network/allusers/allusers.component';
import { NetworkComponent } from './components/network/network.component';
import { SingleuserComponent } from './components/network/singleuser/singleuser.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {path:'', component:HomeComponent, pathMatch:'full', canActivate:[AuthGuardService]},
  {path:'login', component:LoginComponent},
  {path:'home', redirectTo:''},
  {path:'register', component:RegisterComponent},
  {path:'reset', component:ResetPasswordComponent},
<<<<<<< Updated upstream
  {path:'network', component:NetworkComponent},
  {path:'friends', component:FriendsComponent},
  {path:'settings', component:SettingsComponent},
  {path:'logout', component:LogoutComponent}
=======
  {path:'network', component:NetworkComponent,canActivate:[AuthGuardService] ,children:[
    {path:'', component:AllusersComponent},
    {path:':user', component:SingleuserComponent}
  ]},
  {path:'friends', component:FriendsComponent, canActivate:[AuthGuardService]},
  {path:'settings', component:SettingsComponent, canActivate:[AuthGuardService]},
  {path:'logout', component:LogoutComponent, canActivate:[AuthGuardService]},
  {path:"**", redirectTo:'login'}
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

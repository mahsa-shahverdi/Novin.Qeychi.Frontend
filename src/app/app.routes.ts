import { Routes } from '@angular/router';
import { AdminLoginComponent } from './+pages/admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './+pages/admin/admin-register/admin-register.component';
import { DashboardComponent } from './+pages/admin/dashboard/dashboard.component';
import { PublicLoginComponent } from './+pages/public/public-login/public-login.component';
import { PublicRegisterComponent } from './+pages/public/public-register/public-register.component';
import { ProfileComponent } from './+pages/private/profile/profile.component';
import { HomeComponent } from './+pages/public/home/home.component';
import { NotFoundComponent } from './+pages/public/not-found/not-found.component';

export const routes: Routes = [
  {path:'admin-login', component:AdminLoginComponent},
  {path:'admin-register', component:AdminRegisterComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'public-login', component:PublicLoginComponent},
  {path:'public-register', component:PublicRegisterComponent},
  {path:'profile', component:ProfileComponent},
  {path:'home', component:HomeComponent},
  {path:'not-found', component:NotFoundComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'**', redirectTo:'/not-found'}
];

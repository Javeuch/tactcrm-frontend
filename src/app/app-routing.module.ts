import { ExtraOptions, RouterModule, Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { NgModule, Injectable } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './pages/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthProvider } from './pages/auth/services/auth-session.service';
import { AccountService } from './pages/auth/services/account.service';



export const routes: Routes = [
  {// lazy load pages module
    /*tuto: Voici un exemple sur un chargement en lazy . 
    Ici le module PagesModule est chargé en lazy. 
    On ne l'a pas chargé  lors du chargement du AppModule comme 
    on a fait avec les autres compos.*/
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },


  {// load acount component login / logout etc ...
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      // {
      //   path: 'register',
      //   component: NbRegisterComponent,
      // },
      {
        // Ici on reutilise le compo LoginComponent pour le logout
        path: 'logout',
        component: LoginComponent,
        data:{
          isLogout:true,
        }

      },
      // {
      //   path: 'request-password',
      //   component: NbRequestPasswordComponent,
      // },
      // {
      //   path: 'reset-password',
      //   component: NbResetPasswordComponent,
      // },
    ],
  },
  //remove to check routing errors
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

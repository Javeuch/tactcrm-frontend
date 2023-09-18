import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { AuthProvider } from './auth-session.service';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../../utils/app.constants';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
      private accountService: AccountService, 
      private router: Router, 
      private httpClient:HttpClient,
      private authServerProvider: AuthProvider) {}

  login(credentials, callback?) {
    const cb = callback || function() {};

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          this.accountService.identity(true)
          .then(account => {
            resolve(account);
          });
          return cb();
        },
        err => {//
          this.logout();
          reject(err);
          return cb(err);
        }
      );
    });
  }

  // login(credentials:any){
  //   this.authServerProvider.login(credentials)
  //   .subscribe(Response=>{
  //     if(Response.ok){ // check if success
  //       this.accountService.fetch()
  //       .subscribe(res=>{

  //       },
  //       error=>{
  //         console.log(error);
  //       });
  //     }
  //   },
  //   err=>{
  //     console.log(err);
  //   });
  // }

  logout(redirect?:boolean) {
    this.authServerProvider.logout().subscribe(null, null, () => {
      if(redirect){
        this.router.navigate(['auth/login']);
      }
    });
  }
}

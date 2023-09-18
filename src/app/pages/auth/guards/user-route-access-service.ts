import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../services/account.service';


@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {}
  canActivate(): boolean | Promise<boolean> {
    return this.checkLogin(); // true OR false
  }

  checkLogin(): Promise<boolean> {
    return this.accountService.identity().then(account => {
        if(account){
          return account.admin; 
        }else{
          this.router.navigate(['auth/login']);
            return false;
        }
    });
  }

}



// only for client routes

@Injectable({ providedIn: 'root' })
export class ClientRouteAccessService implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {}

  canActivate(): boolean | Promise<boolean> {
    return this.checkLogin(); // true OR false
  }

  checkLogin(): Promise<boolean> {
    return this.accountService.identity().then(account => {
      /*tuto: verifier l'authentification */
        if(account){ 
          /*tuto: verifier l' autorisation * */
            return !account.admin;
        }else{
          this.router.navigate(['auth/login']);
            return false;
        }
    });
  }

}

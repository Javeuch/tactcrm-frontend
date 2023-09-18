import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { AuthProvider } from '../services/auth-session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AccountService } from '../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';


interface IUser{
    username:string;
    password:string;
}

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {

    user: IUser;
    authenticationError : boolean;
    errMessage: any;

    constructor(
        _nbAuthService: NbAuthService,
        private _acccountService: AccountService,
        private _autService: AuthProvider,
        _cd: ChangeDetectorRef,
        _router:Router,
        private loginService: LoginService,
        private activatedRoute: ActivatedRoute,

    ){
        super(_nbAuthService, {},_cd, _router )

        this.activatedRoute.data.subscribe(data=>{
            if(data.isLogout){
                this.logout();
            }
        });
    }
    
    // loginnn() {
    //    this.loginService.login(this.user).then(res=>{
    //        console.log("login result");
    //        console.log(res);
    //    })
    //   }
    login(){
        this.loginService.login(this.user)
        .then((account)=>{
            this.authenticationError = false;
            this.redirectConnextedUser(account);
        })
        .catch((err:HttpErrorResponse)=>{
            this.errMessage = err.error.message;
            this.authenticationError = true;
        });
    }

    logout(){
        this.loginService.logout(true);
    }

    redirectConnextedUser(account){
        if(account.admin===true){
            this.router.navigate(['']);
        }else{
            console.log("client context");
            
            this.router.navigate(['pages/factures/client/mes-factures']);
        }   
    }

    getAccountData(){
        this._acccountService.fetch()
        .subscribe(res=>{
            console.log(res);
        });
    }
}
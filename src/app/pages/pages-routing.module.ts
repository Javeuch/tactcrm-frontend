import { RouterModule, Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NgModule, Injectable } from '@angular/core';

import { PagesComponent } from './pages.component';
import { IOTDashboardComponent } from './dashboard/dashboard.component';
// import { DashboardComponent } from './e-commerce/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { UserRouteAccessService, ClientRouteAccessService } from './auth/guards/user-route-access-service';
import { AccountService } from './auth/services/account.service';
import { of, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utilisateur } from '../shared/models/utilisateur.model';
import { UtilisateurService } from './utilisateur/utilisateur.service';
import { IStats } from '../shared/models/stats.model';
import { DashboardComponent } from './e-commerce/dashboard.component';

@Injectable({ providedIn: 'root' })
export class LayoutResolve implements Resolve<Utilisateur> {
  constructor(
    private service: AccountService,
    private router:Router
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Utilisateur> {
    /*tuto: from i ci va nous permettre d'utiliser un Promise 
    // en tant que Observable .*/
    return from(this.service.identity(true))
    .pipe(map(res=>{
      if(res){
        return res;
      }else{
        this.router.navigate(['auth/login']);
        return null;
      }
    }));
  }
}


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  resolve:{
    // isadmin: LayoutResolve,
    currentUser: LayoutResolve,
  },
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'iot-dashboard',
      component: IOTDashboardComponent,
    },
    {
      path: 'utilisateurs',
      loadChildren: () => import('./utilisateur/utilisateur.module')
      .then(m => m.UtilisateurModule),
      canActivate: [UserRouteAccessService], // test this guard
    },
    {
      path: 'type-depenses',
      loadChildren: () => import('./type-depense/type-depense.module')
      .then(m => m.TypeDepenseModule),
    canActivate: [UserRouteAccessService],
    },
    {
      path: 'type-paiements',
      loadChildren: () => import('./type-paiement/type-paiement.module')
      .then(m => m.TypePaiementModule),
    canActivate: [UserRouteAccessService],
    },
    {
      path: 'taxes',
      loadChildren: () => import('./taxe/taxe.module')
      .then(m => m.TaxeModule),
    canActivate: [UserRouteAccessService],
    },
    {
      path: 'devises',
      loadChildren: () => import('./devise/devise.module')
      .then(m => m.DeviseModule),
    canActivate: [UserRouteAccessService],
    },
    {
      path: 'contrats',
      loadChildren: () => import('./contrat/contrat.module')
      .then(m => m.ContratModule),
    },
    {
      path: 'factures',
      loadChildren: () => import('./facture/facture.module')
      .then(m => m.FactureModule),
    },
    {
      path: 'articles',
      loadChildren: () => import('./article/article.module')
      .then(m => m.ArticleModule),
    canActivate: [UserRouteAccessService],
    },
    {
      path: 'depenses',
      loadChildren: () => import('./depense/depense.module')
      .then(m => m.DepenseModule),
    canActivate: [UserRouteAccessService],
    },
    // {
    //   path: 'layout',
    //   loadChildren: () => import('./layout/layout.module')
    //     .then(m => m.LayoutModule),
    // },
    // {
    //   path: 'forms',
    //   loadChildren: () => import('./forms/forms.module')
    //     .then(m => m.FormsModule),
    // },
    // {
    //   path: 'ui-features',
    //   loadChildren: () => import('./ui-features/ui-features.module')
    //     .then(m => m.UiFeaturesModule),
    // },
    // {
    //   path: 'modal-overlays',
    //   loadChildren: () => import('./modal-overlays/modal-overlays.module')
    //     .then(m => m.ModalOverlaysModule),
    // },
    // {
    //   path: 'extra-components',
    //   loadChildren: () => import('./extra-components/extra-components.module')
    //     .then(m => m.ExtraComponentsModule),
    // },
    // {
    //   path: 'maps',
    //   loadChildren: () => import('./maps/maps.module')
    //     .then(m => m.MapsModule),
    // },
    // {
    //   path: 'charts',
    //   loadChildren: () => import('./charts/charts.module')
    //     .then(m => m.ChartsModule),
    // },
    // {
    //   path: 'editors',
    //   loadChildren: () => import('./editors/editors.module')
    //     .then(m => m.EditorsModule),
    // },
    // {
    //   path: 'tables',
    //   loadChildren: () => import('./tables/tables.module')
    //     .then(m => m.TablesModule),
    // },
    // {
    //   path: 'miscellaneous',
    //   loadChildren: () => import('./miscellaneous/miscellaneous.module')
    //     .then(m => m.MiscellaneousModule),
    // },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

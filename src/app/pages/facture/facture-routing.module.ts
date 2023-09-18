import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { FactureComponent } from './facture.component';
// import { CreateOrEditFactureComponent } from './create-or-edit-facture.component';
import { ResolvePagingParams } from '../../shared/utils/resolve-paging-params.service';
import { IFacture, Facture, FactureView, IFactureView } from '../../shared/models/facture.model';
import { FactureService } from './facture.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { FactureClientComponent } from './client/facture-client.component';
import { ViewFactureComponent } from './client/view-facture.component';
import { UserRouteAccessService, ClientRouteAccessService } from '../auth/guards/user-route-access-service';

@Injectable({ providedIn: 'root' })
export class FactureResolve implements Resolve<IFacture> {
  constructor(private service: FactureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFacture> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Facture>) => response.ok),
        map((utilisateur: HttpResponse<Facture>) => utilisateur.body)
      )
    }
    return of(new Facture());
  }
}

@Injectable({ providedIn: 'root' })
export class FactureViewResolve implements Resolve<IFactureView> {
  constructor(private service: FactureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFactureView> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.findOneForViewById(id).pipe(
        filter((response: HttpResponse<FactureView>) => response.ok),
        map((utilisateur: HttpResponse<FactureView>) => utilisateur.body)
      )
    }
    return of(new FactureView());
  }
}
export const routes :Routes = [
    // {
    //     path: '',
    //     component:FactureComponent,
    //     resolve:{
    //         pagingParams: ResolvePagingParams
    //     },
    //     data:{
    //         defaultSort: 'id,asc',
    //     },
    //     canActivate: [UserRouteAccessService],
    // },
    // {
    //     path:'new',
    //     component: CreateOrEditFactureComponent,
    //     canActivate: [UserRouteAccessService],
    //     data:{
    //       title: 'Ajouter Facture',
    //     }
    // },
    // {
    //     path:':id/edit',
    //     component: CreateOrEditFactureComponent,
    //     resolve:{
    //         facture:FactureResolve
    //     },
    //     data:{
    //       title: 'Editer Facture',
    //     },
    //     canActivate: [UserRouteAccessService],
    // },
    {
      path: 'client',
      children:[
        {
          path:'mes-factures',
          component: FactureClientComponent,
          resolve:{
              pagingParams: ResolvePagingParams
          },
          data:{
              defaultSort: 'id,asc',
          },
        canActivate: [ClientRouteAccessService],

        },
        {
          path:':id/view',
          component: ViewFactureComponent,
          resolve:{
            facture:FactureViewResolve
        },
        canActivate: [ClientRouteAccessService],
        },
      ],
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FactureRoutingModule { }

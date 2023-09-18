import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { CreateOrEditContratComponent } from './create-or-edit-contrat.component';
import { IContrat, Contrat } from '../../shared/models/contrat.model';
import { ContratService } from './contrat.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ResolvePagingParams } from '../../shared/utils/resolve-paging-params.service';
import { ContratClientComponent } from './client/contrat-client.component';
import { ViewContratComponent } from './client/view-contrat.component';
import { UserRouteAccessService, ClientRouteAccessService } from '../auth/guards/user-route-access-service';

@Injectable({ providedIn: 'root' })
export class ContratResolve implements Resolve<IContrat> {
  constructor(private service: ContratService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContrat> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Contrat>) => response.ok),
        map((utilisateur: HttpResponse<Contrat>) => utilisateur.body)
      )
    }
    return of(new Contrat());
  }
}

export const routes :Routes = [
    // {
    //     path: '',
    //     component:ContratComponent,
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
    //     component: CreateOrEditContratComponent,
    //     canActivate: [UserRouteAccessService],
    //     data:{
    //       title: 'Ajouter Contrat',
    //     }
    // },
    // {
    //     path:':id/edit',
    //     component: CreateOrEditContratComponent,
    //     resolve:{
    //         contrat: ContratResolve
    //     },
    //     canActivate: [UserRouteAccessService],
    //     data:{
    //       title: 'Editer Contrat',
    //     }
    // },
    {
      path: 'client',
      children:[
        {
          path:'mes-contrats',
          component: ContratClientComponent,
          resolve:{
              pagingParams: ResolvePagingParams,
          },
          data:{
              defaultSort: 'id,asc',
          },
        canActivate: [ClientRouteAccessService],

        },
        {
          path:':id/view',
          component: ViewContratComponent,
          resolve:{
            contrat:ContratResolve,
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
export class ContratRoutingModule { }

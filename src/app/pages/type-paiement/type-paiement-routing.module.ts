import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TypePaiementComponent } from './type-paiement.component';
import { CreateOrEditTypePaiementComponent } from './create-or-edit-type-paiement.component';
import { ITypePaiement, TypePaiement } from '../../shared/models/type-paiement.model';
import { TypePaiementService } from './type-paiement.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ResolvePagingParams } from '../../shared/utils/resolve-paging-params.service';

@Injectable({ providedIn: 'root' })
export class TypePaiementResolve implements Resolve<ITypePaiement> {
  constructor(private service: TypePaiementService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITypePaiement> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TypePaiement>) => response.ok),
        map((utilisateur: HttpResponse<TypePaiement>) => utilisateur.body)
      )
    }
    return of(new TypePaiement());
  }
}

export const routes :Routes = [
    {
        path: '',
        component:TypePaiementComponent,
        resolve:{
          pagingParams: ResolvePagingParams
        },
        data:{
            defaultSort: 'id,asc',
        }
    },
    {
        path:'new',
        component: CreateOrEditTypePaiementComponent,
        data:{
          title: 'Ajouter Type Paiement',
        }
    },
    {
        path:':id/edit',
        component: CreateOrEditTypePaiementComponent,
        resolve:{
          typePaiement:TypePaiementResolve
        },
        data:{
          title: 'Editer Type Paiement',
        }

    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TypePaiementRoutingModule { }

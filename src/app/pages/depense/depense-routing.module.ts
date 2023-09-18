import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DepenseComponent } from './depense.component';
import { CreateOrEditDepenseComponent } from './create-or-edit-depense.component';
import { DepenseService } from './depense.service';
import { IDepense, Depense } from '../../shared/models/depense.model';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ResolvePagingParams } from '../../shared/utils/resolve-paging-params.service';

@Injectable({ providedIn: 'root' })
export class DepenseResolve implements Resolve<IDepense> {
  constructor(private service: DepenseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDepense> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Depense>) => response.ok),
        map((utilisateur: HttpResponse<Depense>) => utilisateur.body)
      )
    }
    return of(new Depense());
  }
}

export const routes :Routes = [
    {
        path: '',
        component:DepenseComponent,
        resolve:{
            pagingParams: ResolvePagingParams
        },
        data:{
            defaultSort: 'id,asc',
        }
    },
    {
        path:'new',
        component: CreateOrEditDepenseComponent,
        data:{
          title: 'Ajouter Depense',
        }
    },
    {
        path:':id/edit',
        component: CreateOrEditDepenseComponent,
        resolve:{
            depense: DepenseResolve,
        },
        data:{
          title: 'Editer Depense',
        }
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DepenseRoutingModule { }

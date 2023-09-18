import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TaxeComponent } from './taxe.component';
import { CreateOrEditTaxeComponent } from './create-or-edit-taxe.component';
import { ITaxe, Taxe } from '../../shared/models/taxe.model';
import { TaxeService } from './taxe.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ResolvePagingParams } from '../../shared/utils/resolve-paging-params.service';

@Injectable({ providedIn: 'root' })
export class TaxeResolve implements Resolve<ITaxe> {
  constructor(private service: TaxeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITaxe> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Taxe>) => response.ok),
        map((utilisateur: HttpResponse<Taxe>) => utilisateur.body)
      )
    }
    return of(new Taxe());
  }
}

export const routes :Routes = [
    {
        path: '',
        component:TaxeComponent,
        resolve:{
            pagingParams: ResolvePagingParams
        },
        data:{
            defaultSort: 'id,asc',
        }
    },
    {
        path:'new',
        component: CreateOrEditTaxeComponent,
        data:{
          title: 'Ajouter Taxe',
        }
    },
    {
        path:':id/edit',
        component: CreateOrEditTaxeComponent,
        resolve:{
            taxe:TaxeResolve,
        },
        data:{
          title: 'Editer Taxe',
        }
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TaxeRoutingModule { }

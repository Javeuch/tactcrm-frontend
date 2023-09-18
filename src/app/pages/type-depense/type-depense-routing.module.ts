import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TypeDepenseComponent } from './type-depense.component';
import { CreateOrEditTypeDepenseComponent } from './create-or-edit-type-depense.component';
import { TypeDepenseService } from './type-depense.service';
import { ITypeDepense, TypeDepense } from '../../shared/models/type-depense.model';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ResolvePagingParams } from '../../shared/utils/resolve-paging-params.service';
import { FormsModule } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class TypeDepenseResolve implements Resolve<ITypeDepense> {
  constructor(private service: TypeDepenseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITypeDepense> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TypeDepense>) => response.ok),
        map((utilisateur: HttpResponse<TypeDepense>) => utilisateur.body)
      )
    }
    return of(new TypeDepense());
  }
}
export const routes :Routes = [
    {
        path: '',
        component:TypeDepenseComponent,
        resolve:{
            pagingParams: ResolvePagingParams
        },
        data:{
            defaultSort: 'id,asc',
        }
    },
    {
        path:'new',
        component: CreateOrEditTypeDepenseComponent,
        data:{
          title: 'Ajouter type depense',
        }
    },
    {
        path:':id/edit',
        component: CreateOrEditTypeDepenseComponent,
        resolve:{
            typeDepense: TypeDepenseResolve,
        },
        data:{
          title: 'Editer type depense',
        }
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes), FormsModule],
    exports: [RouterModule],
})
export class TypeDepenseRoutingModule { }

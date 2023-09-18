import { HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Devise, IDevise } from '../../shared/models/devise.model';
import { ResolvePagingParams } from '../../shared/utils/resolve-paging-params.service';
import { CreateOrEditDeviseComponent } from './create-or-edit-devise.component';
import { DeviseComponent } from './devise.component';
import { DeviseService } from './devise.service';

@Injectable({ providedIn: 'root' })
export class DeviseResolve implements Resolve<IDevise> {
  constructor(private service: DeviseService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDevise> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Devise>) => response.ok),
        map((utilisateur: HttpResponse<Devise>) => utilisateur.body)
      )
    }
    return of(new Devise());
  }
}

export const routes: Routes = [
  {
    path: '',
    component: DeviseComponent,
    resolve: {
      pagingParams: ResolvePagingParams
    },
    data: {
      defaultSort: 'id,asc',
    }
  },
  {
    path: 'new',
    component: CreateOrEditDeviseComponent,
    data: {
      title: 'Ajouter Devise',
    }
  },
  {
    path: ':id/edit',
    component: CreateOrEditDeviseComponent,
    resolve: {
      devise: DeviseResolve,
    },
    data: {
      title: 'Editer Devise',
    }
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviseRoutingModule { }

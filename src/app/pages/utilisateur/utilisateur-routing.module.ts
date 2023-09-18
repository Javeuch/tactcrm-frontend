import { NgModule, Injectable } from '@angular/core';
 import { UtilisateurComponent } from './utilisateur.component';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ResolvePagingParams } from '../../shared/utils/resolve-paging-params.service';
import { UtilisateurService } from './utilisateur.service';
import { Observable, of } from 'rxjs';
import { IUtilisateur, Utilisateur } from '../../shared/models/utilisateur.model';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { CreateOrUpdateUtilisateurComponent } from './create-or-edit-utilisateur.component';
import { FormsModule } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ClientResolve implements Resolve<IUtilisateur> {
  constructor(private service: UtilisateurService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUtilisateur> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Utilisateur>) => response.ok),
        map((utilisateur: HttpResponse<Utilisateur>) => utilisateur.body)
      )
    }
    return of(new Utilisateur());
  }
}



export const routes: Routes = [
  {
    path: '',
    component: UtilisateurComponent,
    resolve:{
        pagingParams: ResolvePagingParams
    },
    data: {
        defaultSort: 'id,asc',
    },
},
{
  path: 'new',
  component: CreateOrUpdateUtilisateurComponent,
  data:{
    title: 'Ajouter Client',
  }
},
{
    path: ':id/edit',
    component: CreateOrUpdateUtilisateurComponent,
    resolve: {
      client: ClientResolve
    },
    data:{
      title: 'Editer Client',
    }
}
];
@NgModule({
    imports: [RouterModule.forChild(routes), FormsModule],
    exports: [RouterModule],
})
export class UtilisateurRoutingModule { }

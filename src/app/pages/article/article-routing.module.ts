import { NgModule, Injectable } from "@angular/core";
import {
  Routes,
  RouterModule,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { ArticleComponent } from "./article.component";
import { CreateOrEditArticleComponent } from "./create-or-edit-article.component";
import { IArticle, Article } from "../../shared/models/article.model";
import { Observable, of } from "rxjs";
import { filter, map } from "rxjs/operators";
import { HttpResponse } from "@angular/common/http";
import { ArticlesService } from "./article.service";
import { ResolvePagingParams } from "../../shared/utils/resolve-paging-params.service";

@Injectable({ providedIn: "root" })
export class ArticleResolve implements Resolve<IArticle> {
  constructor(private service: ArticlesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IArticle> {
    const id = route.params["id"] ? route.params["id"] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Article>) => response.ok),
        map((utilisateur: HttpResponse<Article>) => utilisateur.body)
      );
    }
    return of(new Article());
  }
}
export const routes: Routes = [
  {
    path: "",
    component: ArticleComponent,
    resolve: {
      pagingParams: ResolvePagingParams,
    },
    data: {
      defaultSort: "id,asc",
    },
  },
  {
    path: "new",
    component: CreateOrEditArticleComponent,
    data: {
      title: "Editer Article",
    },
  },
  {
    path: ":id/edit",
    component: CreateOrEditArticleComponent,
    resolve: {
      article: ArticleResolve,
    },
    data: {
      title: "Editer Article",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}

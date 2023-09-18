import { Component, OnInit, ViewChild } from "@angular/core";
import { ArticlesService } from "./article.service";
import { Article, IArticle } from "../../shared/models/article.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ITEMS_PER_PAGE } from "../../utils/app.constants";
import {
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from "primeng/table";

@Component({
  selector: "ngx-article",
  templateUrl: "article.component.html",
})
export class ArticleComponent implements OnInit {
  @ViewChild("dt") dataTable: Table;

  articlesList: Article[];

  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    private articlesService: ArticlesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  ngOnInit() {}

  loadAll(event?: any) {
    this.page--;
    if (event) {
      if (event.page) {
        this.page = event.page;
      }
    }
    this.articlesService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IArticle[]>) => {
          let content = res.headers.get("Link");
          this.paginateArticle(res.body, res.headers);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  protected paginateArticle(data: IArticle[], headers: HttpHeaders) {
    this.links = this.parseLink(headers.get("link"));
    this.totalItems = parseInt(headers.get("X-Total-Count"), 10);
    this.articlesList = data;
  }

  protected onError(errorMessage: string) {
    alert(errorMessage);
  }

  sort() {
    const result = [this.predicate + "," + (this.reverse ? "asc" : "desc")];
    if (this.predicate !== "id") {
      result.push("id");
    }
    return result;
  }

  create() {
    this.router.navigate(["new"], { relativeTo: this.activatedRoute });
  }

  edit(id: number) {
    this.router.navigate([id, "edit"], { relativeTo: this.activatedRoute });
  }

  parseLink(header: string): any {
    if (header.length === 0) {
      throw new Error("input must not be of zero length");
    }

    // Split parts by comma
    const parts: string[] = header.split(",");
    const links: any = {};

    // Parse each part into a named link
    parts.forEach((p) => {
      const section: string[] = p.split(";");

      if (section.length !== 2) {
        throw new Error('section could not be split on ";"');
      }

      const url: string = section[0].replace(/<(.*)>/, "$1").trim();
      const queryString: any = {};

      url.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        ($0, $1, $2, $3) => (queryString[$1] = $3)
      );

      let page: any = queryString.page;

      if (typeof page === "string") {
        page = parseInt(page, 10);
      }

      const name: string = section[1].replace(/rel="(.*)"/, "$1").trim();
      links[name] = page;
    });
    return links;
  }
  notify(severity: string, title: string, message: string) {
    this.messageService.add({
      severity: severity,
      summary: title,
      detail: message,
    });
  }

  onDeleteConfirm(id:number){
    this.articlesService.delete(id)
    .subscribe(res=>{
        this.loadAll();
    }
    ,err=>{
        this.messageService.add({
            severity:'error',
            summary: 'suppression impossible',
            detail:'erreur lors du suppression (verifier que ce article n\'est pas utilisé)'
        });
    });
}

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir supprimer cet article ?",
      accept: () => {
        this.onDeleteConfirm(id);
      },
      reject: () => {
        this.loadAll();
      },
    });
  }
}

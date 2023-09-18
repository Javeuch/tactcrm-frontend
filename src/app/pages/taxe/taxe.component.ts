import { Component, OnInit, ViewChild } from '@angular/core';
import { TaxeService } from './taxe.service';
import { Table } from 'primeng/table';
import { Taxe, ITaxe } from '../../shared/models/taxe.model';
import { Subscription } from 'rxjs';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ITEMS_PER_PAGE } from '../../utils/app.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'ngx-Taxe',
    templateUrl: 'taxe.component.html',
})

export class TaxeComponent implements OnInit {



    typePaiementsList: Taxe[];

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
        private _taxeService: TaxeService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
        this.page = data.pagingParams.page;
        this.previousPage = data.pagingParams.page;
        this.reverse = data.pagingParams.ascending;
        this.predicate = data.pagingParams.predicate;
    });
}

    ngOnInit() {

    }
    loadAll(event?:any) {
      this.page--;
      if(event){
        if(event.page){
          this.page = event.page;
        }
      }
        this._taxeService
          .query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
          })
          .subscribe(
            (res: HttpResponse<ITaxe[]>) => {
              let content = res.headers.get('Link');
              this.paginateTypePaiement(res.body, res.headers);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
          );
    }


    protected paginateTypePaiement(data: ITaxe[], headers: HttpHeaders) {
        this.links = this.parseLink(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.typePaiementsList = data;
      }

      protected onError(errorMessage: string) {
        alert(errorMessage);
      }

      sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
          result.push('id');
        }
        return result;
      }


      create(){
        this.router.navigate(['new'], {relativeTo: this.activatedRoute});
      }

    edit(id:number){
      this.router.navigate([id, 'edit'], {relativeTo: this.activatedRoute});
    }

    parseLink(header: string): any {
        if (header.length === 0) {
            throw new Error('input must not be of zero length');
        }

        // Split parts by comma
        const parts: string[] = header.split(',');
        const links: any = {};

        // Parse each part into a named link
        parts.forEach(p => {
            const section: string[] = p.split(';');

            if (section.length !== 2) {
                throw new Error('section could not be split on ";"');
            }

            const url: string = section[0].replace(/<(.*)>/, '$1').trim();
            const queryString: any = {};

            url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => (queryString[$1] = $3));

            let page: any = queryString.page;

            if (typeof page === 'string') {
                page = parseInt(page, 10);
            }

            const name: string = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[name] = page;
        });
        return links;
    }
    notify(severity: string, title: string, message: string) {
      this.messageService.add({ severity: severity, summary: title, detail: message });
    }
    onDeleteConfirm(id: number): void {
      this._taxeService.delete(id).subscribe(response => {
        this.notify('success', 'success', 'Type paiement  est supprimé');
        this.loadAll();
      },
      (res: HttpErrorResponse) => this.onError("Supprimer consultation dabord "+res.message)

      );
  }

  delete(id: number) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this.onDeleteConfirm(id);
        },
        reject: () =>{
          this.loadAll();
        }
    });
}
}

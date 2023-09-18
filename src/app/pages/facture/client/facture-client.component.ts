import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Table } from 'primeng/table';
import { IFacture } from '../../../shared/models/facture.model';
import { FactureService } from '../facture.service';
import { ITEMS_PER_PAGE } from '../../../utils/app.constants';
import { AccountService } from '../../auth/services/account.service';

@Component({
    selector: 'ngx-facture-client',
    templateUrl: 'facture-client.component.html'
})

export class FactureClientComponent implements OnInit {


    facturesList: IFacture[];

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
        private factureService : FactureService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private accountService: AccountService,
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

    ngOnInit() { }


    loadAll(event?:any){
        this.accountService.getAuthenticatedUser()
        .subscribe(usr=>{
            if(usr){
                this.loadClientFactures(usr.id, event);
            }
        });
    }

    loadClientFactures(clientId:number, event?:any){

        this.page--;
        if(event.page){
            this.page=event.page;
        }
        this.factureService
        .findByClientId(clientId,{
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        })
        .subscribe(
            (res: HttpResponse<IFacture[]>) => {
              let content = res.headers.get('Link');
              this.paginateFacturesClients(res.body, res.headers);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
          );
    }

    protected paginateFacturesClients(data: IFacture[], headers: HttpHeaders) {
        console.log(data);
        this.links = this.parseLink(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.facturesList = data;
      }

    view(id:number){
        this.router.navigate(['..',id, 'view'], {relativeTo: this.activatedRoute});
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
}

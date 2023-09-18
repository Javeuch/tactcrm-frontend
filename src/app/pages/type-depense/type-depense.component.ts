import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeDepenseService } from './type-depense.service';
import { ITypeDepense } from '../../shared/models/type-depense.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ITEMS_PER_PAGE } from '../../utils/app.constants';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'ngx-type-depense',
    templateUrl: 'type-depense.component.html'
})

export class TypeDepenseComponent implements OnInit {



    typeDepensesList: ITypeDepense[];

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
        private typeDepenseService : TypeDepenseService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private messageService : MessageService,

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
        this.page--;
        if(event){
            if (event.page){
                this.page = event.page;
            }
        }
        this.typeDepenseService
        .query({
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort()
        })
        .subscribe(
          (res: HttpResponse<ITypeDepense[]>) => {
            let content = res.headers.get('Link');
            this.paginateTypesDepenses(res.body, res.headers);
          },
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    protected paginateTypesDepenses(data: ITypeDepense[], headers: HttpHeaders) {
        this.links = this.parseLink(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.typeDepensesList = data;
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

    delete(id:number){
        this.confirmationService.confirm({
            message: "voulez vous continuez",
            accept:()=>{this.deleteEntity(id)},
            reject:()=>{this.loadAll()},
        });
    }

    deleteEntity(id:number){
        this.typeDepenseService.delete(id)
        .subscribe(res=>{
            this.loadAll();
        },err=>{
            this.messageService.add({
                severity:'error',
                summary: 'suppression impossible',
                detail:'erreur lors du supression (verifier que ce type depense n\'est pas utilisé)'
            });
        });
    }

}

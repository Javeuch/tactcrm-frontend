import { Component, OnInit } from '@angular/core';
import { ITaxe, Taxe } from '../../shared/models/taxe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TaxeService } from './taxe.service';

@Component({
    selector: 'ngx-create-or-edit-taxe',
    templateUrl: 'create-or-edit-taxe.component.html'
})

export class CreateOrEditTaxeComponent implements OnInit {
    model: ITaxe;
    routeData:any;
    title:string;

    constructor(
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private messageService : MessageService,
        private taxeService : TaxeService,

    ) {
        this.model = new Taxe();
    }

    ngOnInit() {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.title = data.title;
            if(data.taxe){
                this.model = data.taxe;
            }
        });
    }
    backToList(){
        if (this.model.id) {
        this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
        }else{
          this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        }
    }

    save(){
        if(this.model.id){
            this.taxeService.update(this.model).subscribe(res=>{
                this.notify('success', 'success', 'taxe bien modifié');
                this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
            });
        }else{
            this.taxeService.create(this.model)
            .subscribe(res=>{
                this.notify('success', 'success', 'taxe bien enrgistreé');
                this.router.navigate(['..'], {relativeTo: this.activatedRoute});
            });
        }
    }

    checkResponse(response: any){
        if(response.status===201){
            this.messageService.add({severity:'success', summary: 'Success Message', detail:'taxe ajouté'});
        }else{
            this.messageService.add({severity:'error', summary: 'Success Message', detail:'not submited'});
        }
    }

    notify(severity:string, title:string, message:string){
        this.messageService.add({severity:severity, summary:title, detail:message});
    }
}
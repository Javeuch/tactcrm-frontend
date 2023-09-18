import { Component, OnInit } from '@angular/core';
import { ITypePaiement, TypePaiement } from '../../shared/models/type-paiement.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TypePaiementService } from './type-paiement.service';

@Component({
    selector: 'ngx-create-or-edit-type-paiement',
    templateUrl: 'create-or-edit-type-paiement.component.html'
})

export class CreateOrEditTypePaiementComponent implements OnInit {
    model: ITypePaiement;
    routeData:any;
    title: string;

    constructor(
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private messageService : MessageService,
        private typePaiementService : TypePaiementService,

    ) {
        this.model = new TypePaiement();
    }

    ngOnInit() {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.title =  data.title;
            if(data.typePaiement){
                this.model = data.typePaiement;
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
            this.typePaiementService.update(this.model).subscribe(res=>{
                this.notify('success', 'success', 'Type Paiement bien modifié');
                this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
            });
        }else{
            this.typePaiementService.create(this.model)
            .subscribe(res=>{
                this.notify('success', 'success', 'Type Paiement bien enrgistrer');
                this.router.navigate(['..'], {relativeTo: this.activatedRoute});
            });
        }
    }

    checkResponse(response: any){
        if(response.status===201){
            this.messageService.add({severity:'success', summary: 'Success Message', detail:'type paiement ajouté'});
        }else{
            this.messageService.add({severity:'error', summary: 'Success Message', detail:'error'});
        }
    }

    notify(severity:string, title:string, message:string){
        this.messageService.add({severity:severity, summary:title, detail:message});
    }

}
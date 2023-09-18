import { Component, OnInit } from '@angular/core';
import { ITypeDepense, TypeDepense } from '../../shared/models/type-depense.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { AdresseService } from '../utilisateur/adresse.service';
import { TypeDepenseService } from './type-depense.service';

@Component({
    selector: 'ngx-create-or-edit-type-depense',
    templateUrl: 'create-or-edit-type-depense.component.html'
})

export class CreateOrEditTypeDepenseComponent implements OnInit {

    model: ITypeDepense;
    routeData:any;
    title: string;
    constructor(
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private messageService : MessageService,
        private typeDepenseService : TypeDepenseService,

    ) {
        this.model = new TypeDepense();
    }

    ngOnInit() {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.title = data.title;
            if(data.typeDepense){
                this.model = data.typeDepense;
            }
        });
    }
    backToList(){
        this.router.navigate(['..'], {relativeTo: this.activatedRoute});
    }
    save(){
        if(this.model.id){
            this.typeDepenseService.update(this.model).subscribe(res=>{
                this.notify('success', 'success', 'Type Depense bien modifié');
                this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
            });
        }else{
            this.typeDepenseService.create(this.model)
            .subscribe(res=>{
                this.notify('success', 'success', 'Type Depense bien enrgistrer');
                this.router.navigate(['..'], {relativeTo: this.activatedRoute});
            });
        }
    }

    checkResponse(response: any){
        if(response.status===201){
            this.messageService.add({severity:'success', summary: 'Success Message', detail:'utilisateur ajouté'});
        }else{
            this.messageService.add({severity:'error', summary: 'Success Message', detail:'not submited'});
        }
    }

    notify(severity:string, title:string, message:string){
        this.messageService.add({severity:severity, summary:title, detail:message});
    }



}
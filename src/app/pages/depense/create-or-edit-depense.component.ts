import { TypePaiementService } from './../type-paiement/type-paiement.service';
import { ITypeDepense } from './../../shared/models/type-depense.model';
import { DeviseService } from './../devise/devise.service';
import {  IDevise } from './../../shared/models/devise.model';
import { IDepense, Depense } from './../../shared/models/depense.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepenseService } from './depense.service';
import { MessageService } from 'primeng/api';
import { TypeDepenseService } from '../type-depense/type-depense.service';
import { ITypePaiement } from '../../shared/models/type-paiement.model';



@Component({
  selector: 'ngx-create-or-edit-depense',
  templateUrl: 'create-or-edit-depense.component.html',
})
export class CreateOrEditDepenseComponent implements OnInit {


  
  
  model: IDepense;
  routeData: any;
  title: string;

  devise: IDevise[];
  selectedDevise:IDevise;

  
  typeDepense: ITypeDepense[];
  selectedTypeDepense: ITypeDepense;

  typePayement: ITypePaiement[];
  selectedTypePayement: ITypePaiement;


 
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private depenseService: DepenseService,
    private deviseService: DeviseService,
    private typeDepenseService: TypeDepenseService,
    private typePaiementService: TypePaiementService


  ) {
    this.model = new Depense();
  }

  ngOnInit() { //cycle de vie appelé par Angular pour indiquer que la création du composant est terminé

    this.routeData = this.activatedRoute.data.subscribe(data => {
        this.title =  data.title;
        if(data.depense){
            this.model = data.depense;
        }
    });
    this.loadDevises();
    this.loadTypeDepense();
    this.loadTypePaiement();
  }
  loadDevises(){
    this.deviseService.getAsList()
    .subscribe(res=>{
        this.devise = res.body;
        if(this.model.id){
            this.selectedDevise = this.devise.find(e=>e.id===this.model.deviseId);
        }
    });
  }
  loadTypeDepense(){
    this.typeDepenseService.getAsList()
    .subscribe(res=>{
        this.typeDepense = res.body;
        if(this.model.id){
            this.selectedTypeDepense = this.typeDepense.find(e=>e.id===this.model.typeDepenseId);
        }
    });
  }

  loadTypePaiement(){
    this.typePaiementService.getAsList()
    .subscribe(res=>{
        this.typePayement = res.body;
        if(this.model.id){
            this.selectedTypePayement = this.typePayement.find(e=>e.id===this.model.typePaiementId);
        }
    });
  }

  
  

  save() {
    this.model.deviseId = this.selectedDevise.id;
    this.model.typeDepenseId = this.selectedTypeDepense.id;
    this.model.typePaiementId = this.selectedTypePayement.id;

    if (this.model.id) {
      this.depenseService.update(this.model).subscribe(res => {
        this.notify('success', 'success', 'Dépense bien modifié');  //Alert box succés de l'opératoion
        this.router.navigate(['../..'], { relativeTo: this.activatedRoute }); //redirection
      });
    } else {
      this.depenseService.create(this.model)
        .subscribe(res => {
          this.notify('success', 'success', 'Dépense bien enrgistrer'); //Alert box succés de l'opératoion
          this.router.navigate(['..'], { relativeTo: this.activatedRoute });
        });
    }
}

  checkResponse(response: any) {
    if (response.status === 201) {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'type Paiement ajouté' });//Alert box succés de l'opératoion
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'not submited' });//Alert box error de l'opératoion
    }
  }

  notify(severity: string, title: string, message: string) {
    this.messageService.add({ severity: severity, summary: title, detail: message });
  }
  backToList(){
    if (this.model.id) {
    this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
    }else{
      this.router.navigate(['..'], {relativeTo: this.activatedRoute});
    }
}







}

import { Component, OnInit } from '@angular/core';
import { IDevise, Devise } from '../../shared/models/devise.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DeviseService } from './devise.service';

@Component({
  // nom du selecteur demandé par le client : --------------------------------------------------------------------------------
    selector: 'ngx-create-or-edit-devise',
    templateUrl: 'create-or-edit-devise.component.html'
})

export class CreateOrEditDeviseComponent implements OnInit {

  // OnInit : Une méthode de rappel qui est appelée immédiatement après le
  //* le détecteur de changement par défaut a vérifié la directive
  //* propriétés liées aux données pour la première fois,
  //* et avant que l'un des enfants de vue ou de contenu ait été vérifié.
  //* Il n'est appelé qu'une seule fois lorsque la directive est instanciée.

    model: IDevise;
    routeData:any;
    title: string;

    constructor(
     private router: Router,
     private activatedRoute:ActivatedRoute,
     private messageService: MessageService,
     private DeviseService: DeviseService,

    ) {
        this.model = new Devise();
    }

    ngOnInit() {
  // c'est un cycle de vie appelé par Angular pour indiqué que la création du composant est faite !---------------------------
        this.routeData = this.activatedRoute.data.subscribe(data => {
            if(data.devise) {
                this.model = data.devise;
            }
        });
    }
//pop up d'alerte "SUCESS" creation  de "Devise"------------------------------------------------------------------------------
    save() {
        if (this.model.id) {
          this.DeviseService.update(this.model).subscribe(res => {
            this.notify('success', 'success', 'Devise bien modifiée');
            this.router.navigate(['../..'], { relativeTo: this.activatedRoute });
          });
        } else {
          this.DeviseService.create(this.model)
            .subscribe(res => {
              this.notify('success', 'success', 'devise bien enregistrée');
              this.router.navigate(['../'], { relativeTo: this.activatedRoute });
            });
        }
      }

      checkResponse(response: any) {
        if (response.status === 201) {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Devise ajoutée' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erreur Message', detail: 'Erreur identifiée' });
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
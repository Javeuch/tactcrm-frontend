import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IContrat, Contrat } from '../../../shared/models/contrat.model';
import { IUtilisateur } from '../../../shared/models/utilisateur.model';
import { MessageService } from 'primeng/api';
import { ContratService } from '../contrat.service';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
@Component({
    selector: 'ngx-view-contrat',
    templateUrl: 'view-contrat.component.html',
    encapsulation:ViewEncapsulation.None
})
export class ViewContratComponent implements OnInit {
    model: IContrat;
    routeData:any;
    utilisateurs: IUtilisateur[];
    selectedUtilisateur:IUtilisateur;
    constructor(
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private messageService : MessageService,
        private contratService : ContratService,
        private utilisateurService: UtilisateurService

    ) {
        this.model = new Contrat();
    }

    ngOnInit() {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            if(data.contrat){
                this.model = data.contrat;
            }
        });
    }
}
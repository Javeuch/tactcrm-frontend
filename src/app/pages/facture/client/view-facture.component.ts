import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IFacture, Facture, FactureView, IFactureView } from '../../../shared/models/facture.model';
import { IUtilisateur, Utilisateur } from '../../../shared/models/utilisateur.model';
import { ITypePaiement, TypePaiement } from '../../../shared/models/type-paiement.model';
import { IDevise, Devise } from '../../../shared/models/devise.model';
import { ITaxe, Taxe } from '../../../shared/models/taxe.model';
import { IDetailsFacture, DetailsFacture } from '../../../shared/models/details-facture.model';
import { IArticle, Article } from '../../../shared/models/article.model';
import { IFactureResult, FactureCalculationService } from '../facture-calcule.service';
import { FactureService } from '../facture.service';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { TypePaiementService } from '../../type-paiement/type-paiement.service';
import { DeviseService } from '../../devise/devise.service';
import { TaxeService } from '../../taxe/taxe.service';
import { DetailsFactureService } from '../details-facture.service';
import { ArticlesService } from '../../article/article.service';
import { Adresse } from '../../../shared/models/adresse.model';

@Component({
    selector: 'ngx-view-facture',
    templateUrl: 'view-facture.component.html',
    encapsulation:ViewEncapsulation.None
})
export class ViewFactureComponent implements OnInit {
    model: IFactureView;
    routeData:any;
    utilisateurs: IUtilisateur[];
    typePaiements: ITypePaiement[];
    devises: IDevise[];
    taxes: ITaxe[];
    detailsFacturesList: IDetailsFacture[];
    articles: IArticle[];
    selectedTaxe:ITaxe;
    selectedTypePaiement:ITypePaiement;
    selectedDevise:IDevise;
    selectedUtilisateur:IUtilisateur;
    selectedArticle: IArticle;
    
    factureResult: IFactureResult;
    detailFactureModel:IDetailsFacture;

    userModel:IUtilisateur;
    constructor(
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private messageService : MessageService,
        private factureService : FactureService,
        private utilisateurService: UtilisateurService,
        private typePaiementService: TypePaiementService,
        private deviseService: DeviseService,
        private taxeService: TaxeService,
        private detailFactureService: DetailsFactureService,
        private articleService:ArticlesService,
        private confirmationService: ConfirmationService,
        private calculationService: FactureCalculationService,
    ) {
        this.model = new FactureView();
        this.model.clientAdressDTO = new Adresse();
        this.model.typePaiementDTO = new TypePaiement();
        this.model.utilisateurDTO = new Utilisateur();
        this.model.deviseDTO = new Devise();
        this.detailFactureModel = new DetailsFacture();
        this.selectedArticle = new Article();
        this.selectedArticle.taxeDto = new Taxe();
        this.factureResult = {
            totalHt:0,
            totalTaxes:0,
            totalTtc:0,
        }

    }

    ngOnInit() {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            if(data.facture){
                this.model = data.facture;
                console.log(this.model);
                this.loadDetailFactures();
            }
        });
    }


    checkResponse(response: any){
        if(response.status===201){
            this.messageService.add({severity:'success', summary: 'Success Message', detail:'facture ajouté'});
        }else{
            this.messageService.add({severity:'error', summary: 'Success Message', detail:'not submited'});
        }
    }

    notify(severity:string, title:string, message:string){
        this.messageService.add({severity:severity, summary:title, detail:message});
    }

    loadDetailFactures(){
        if(this.model.id){
            this.detailFactureService.getDetailsFactureByFactureId(this.model.id)
            .subscribe(res=>{
                this.detailsFacturesList = res.body;
                if(this.detailsFacturesList.length>0){
                    this.factureResult = {
                        totalHt:0,
                        totalTaxes:0,
                        totalTtc:0,
                    }
                    this.factureResult = this.calculate(this.detailsFacturesList);
                }
            });
        }
    }
    loadUser(id:number){
        
    }

    calculate(detailFacture: IDetailsFacture[]):IFactureResult{
        return this.calculationService.calculate(detailFacture);
    }

}
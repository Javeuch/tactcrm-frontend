import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { IStats } from '../../shared/models/stats.model';
import { IMasterTypeDTO } from '../../shared/models/master-typeDTO.model';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  model:IStats;
  factureTypePaiementPieSource:IMasterTypeDTO[];
  depenseTypeDepensePieSource:IMasterTypeDTO[];

  constructor(private utilisateurService: UtilisateurService){
    this.factureTypePaiementPieSource = [];
    this.depenseTypeDepensePieSource = [];
    this.model = {
      countClient:0,
      countProduitVendue:0,
      sumDepense:0,
      sumProfit:0,
    }
    utilisateurService.getStats().subscribe(res=>{
     this.model = res.body;
    });
    this.fillPieCharts();
  }
  ngOnInit(): void {
  }

  fillPieCharts(){
    this.utilisateurService.getPieChartData().subscribe(res=>{
      this.factureTypePaiementPieSource = res.body.factureByTypePaiement;
      this.depenseTypeDepensePieSource = res.body.depenseByTypeDepense;
      // to do add depense/type depense datas ource here
    });
  }




}

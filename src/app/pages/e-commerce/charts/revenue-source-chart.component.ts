import { Component, OnDestroy, Input, OnChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { IPieChartOutput } from '../../../shared/models/pie-chart-output.model';
import { IMasterTypeDTO } from '../../../shared/models/master-typeDTO.model';
import { from } from 'rxjs';

@Component({
  selector: 'ngx-revenue-source-chart',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class RevenueSourceChartComponent implements OnChanges, OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  pieColors = ["primaryLight","infoLight","successLight","danger","warning"];

  @Input() sourceData: IMasterTypeDTO[]; 
  colors:any;

  // colors.primaryLight, colors.infoLight, colors.successLight
  constructor(
    private theme: NbThemeService,
    private utilisateurService:UtilisateurService
    ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.sourceData = [];
      const colors: any = config.variables;
      this.colors = config.variables;
      const chartjs: any = config.variables.chartjs;
          this.data = {
            labels: [],
            datasets: [{
              data: [],
              backgroundColor: [],
            }],
          };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }
  /** Spreadoperator (...), va copier le contenu d'une table et le copier dans une autre. 
   * Il remplace en fait d'utiliser un foreach : avec un push. Apres on filitre grace a l'operator map */
  // INPUT
   //sourceData =  [
  //   {
  //     libele:'lib1',
  //     utilisation: 10
  //   },
  //   {
  //     libele:'lib1',
  //     utilisation: 10
  //   },
  //   {
  //     libele:'lib1',
  //     utilisation: 10
  //   },
  // ]
// OUTPUT
  // [lib1, lib2, lib3]



  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(this.sourceData.length>0){
      this.data = {
        labels: [...this.sourceData.map(ds=>ds.libelle)],//// spread operator: 
        datasets: [{
          data: [...this.sourceData.map(ds=>ds.utilisations)],
          // Le nombre de types depense est dynamique, on ne peut pas affecter des code couleurs statiques.
          // Afin de varier les couleurs, On utilisé un random basé sur le tableau pieColors
          backgroundColor: [...this.sourceData.map(ds=>this.colors[this.pieColors[Math.floor(Math.random() * this.pieColors.length)]])],
        }],
      };
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}

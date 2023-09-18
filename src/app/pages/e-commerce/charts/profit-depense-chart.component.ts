import { Component, OnDestroy, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { ChartComponent } from 'angular2-chartjs';

interface ILineChartData{
    labels:string[];
    datasets:{
      data:number[],
      label:string,
      backgroundColor:any,
      borderColor:any,
    }[];
  }
@Component({
  selector: 'ngx-profit-depense-chart',
  template: `
    <chart #chart type="line" [data]="lineChartData" (onChange)="fillChartData($event)" [options]="options"></chart>
  `,
})
export class ProfitDepenseChartComponent implements OnDestroy, OnInit, AfterViewInit {
  lineChartData: ILineChartData;
  options: any;
  themeSubscription: any;
  @ViewChild('chart') chart:ChartComponent;

  constructor(private theme: NbThemeService,
    private utilisateurService: UtilisateurService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

/* ces valeurs sont lié au theme qu'on a utilisé ici */
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.lineChartData = {
        labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: 'Depense',
          backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
          borderColor: colors.danger,
        }, {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: 'Profit',
          backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
          borderColor: colors.info,
        },
        ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
      this.fillChartData();
    });
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.fillChartData();
  }

  fillChartData(event?:any){

    this.utilisateurService.getLineChartData().subscribe(res=>{
      let cdata = res.body; // resulttat [serieDepense[], serieProfit[]]
      cdata.sumDepenseByMonth.forEach(dep=>{
        this.lineChartData.datasets.
        filter(ds=>ds.label==='Depense')[0]
        .data[dep.mois-1] = dep.montant;
      });
      /**
       * data[dep.mois-1]: se positionner sur e mois courant afin de remplacer 0 par 
       * la valeur recupérée de la db
       */

      cdata.sumProfitByMonth.forEach(prof=>{
        this.lineChartData.datasets.
        filter(ds=>ds.label==='Drofit')[0]
        .data[prof.mois-1] = prof.montant;
      });
      
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}

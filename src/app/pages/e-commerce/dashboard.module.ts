import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'angular2-chartjs';




import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { UtilsModule } from '../../shared/utils.module';
import { ProfitDepenseChartComponent } from './charts/profit-depense-chart.component';
import { RevenueSourceChartComponent } from './charts/revenue-source-chart.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    UtilsModule,
  ],
  declarations: [
    DashboardComponent,
    
    ProfitDepenseChartComponent,
    RevenueSourceChartComponent,
  ],
  providers: [
  ],
})
export class DashboardModule { }

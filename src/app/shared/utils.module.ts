import { NgModule } from '@angular/core';
import { ValidationMessagesComponent } from './components/validation-messages.component';
import { CommonModule } from '@angular/common';
import { StatusCardComponent } from '../pages/dashboard/status-card/status-card.component';
import { NbCardModule } from '@nebular/theme';
import { DescriptionCardComponent } from '../pages/dashboard/status-card/description-card.component ';
import { ChartjsLineComponent } from '../pages/charts/chartjs/chartjs-line.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';


@NgModule({
    imports: [
        CommonModule,//ng if 
        NbCardModule,
        NgxChartsModule,
        ChartModule
    ],
    declarations: [
        ValidationMessagesComponent,
        DescriptionCardComponent,
        StatusCardComponent,
        ChartjsLineComponent
    ],
    exports: [
        ValidationMessagesComponent,
        DescriptionCardComponent,
        StatusCardComponent,
        ChartjsLineComponent
    ],
    providers: [],
})
export class UtilsModule { }

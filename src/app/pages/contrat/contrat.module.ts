
import { NgModule } from '@angular/core';
import { ContratRoutingModule } from './contrat-routing.module';
// import { ContratComponent } from './contrat.component';
// import { CreateOrEditContratComponent } from './create-or-edit-contrat.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { UtilsModule } from '../../shared/utils.module';
import { CommonModule } from '@angular/common';
import { ContratClientComponent } from './client/contrat-client.component';
import { ViewContratComponent } from './client/view-contrat.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [
        FormsModule,
        ContratRoutingModule,
        CommonModule,
        TableModule,
        PaginatorModule,
        DropdownModule,
        UtilsModule
    ],
    exports: [],
    declarations: [
        // ContratComponent,
        ContratClientComponent,
        ViewContratComponent,
        ],
    providers: [],
})
export class ContratModule { }

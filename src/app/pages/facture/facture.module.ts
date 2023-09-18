
import { NgModule } from '@angular/core';
import { FactureRoutingModule } from './facture-routing.module';

import { TableModule } from 'primeng/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../../shared/utils.module';
import { DropdownModule } from 'primeng/dropdown';
import { FactureClientComponent } from './client/facture-client.component';
import { ViewFactureComponent } from './client/view-facture.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FactureRoutingModule,
        TableModule,
        PaginatorModule,
        UtilsModule,
        DropdownModule

    ],
    exports: [],
    declarations: [

        FactureClientComponent,
        ViewFactureComponent],
    providers: [],
})
export class FactureModule { }

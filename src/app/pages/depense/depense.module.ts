import { DepenseService } from './depense.service';

import { NgModule } from '@angular/core';
import { DepenseRoutingModule } from './depense-routing.module';

import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { UtilsModule } from '../../shared/utils.module';
import { PaginatorModule } from 'primeng/paginator';
import {CreateOrEditDepenseComponent} from './create-or-edit-depense.component';
import { CommonModule } from '@angular/common';
import { DepenseComponent } from './depense.component';

@NgModule({
    imports: [
        FormsModule,
        DepenseRoutingModule,
        TableModule,
        PaginatorModule,
        DropdownModule,
        UtilsModule,
        CommonModule
    ],
    exports: [],
    declarations: [CreateOrEditDepenseComponent, DepenseComponent],
    providers: [DepenseService],
})
export class DepenseModule { }

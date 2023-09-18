
import { NgModule } from '@angular/core';
import { DeviseRoutingModule } from './devise-routing.module';
import { DeviseComponent } from './devise.component';

import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../../shared/utils.module';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { CreateOrEditDeviseComponent } from './create-or-edit-devise.component';
import { DeviseService } from './devise.service';

@NgModule({
    imports: [
        FormsModule,
        DeviseRoutingModule,
        CommonModule,
        TableModule,
        PaginatorModule,
        UtilsModule
    ],
    exports: [],
    declarations: [DeviseComponent, CreateOrEditDeviseComponent],
    providers: [DeviseService],
})
export class DeviseModule { }

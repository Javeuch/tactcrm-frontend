import { NgModule } from '@angular/core';

import { TypeDepenseComponent } from './type-depense.component';
import { TypeDepenseRoutingModule } from './type-depense-routing.module';
import { CreateOrEditTypeDepenseComponent } from './create-or-edit-type-depense.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../../shared/utils.module';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        TypeDepenseRoutingModule,
        TableModule,
        PaginatorModule,
        UtilsModule
    ],
    exports: [],
    declarations: [TypeDepenseComponent, CreateOrEditTypeDepenseComponent],
    providers: [],
})
export class TypeDepenseModule { 
    
}

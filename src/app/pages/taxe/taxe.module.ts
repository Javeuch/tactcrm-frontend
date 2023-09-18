
import { NgModule } from '@angular/core';
import { TaxeRoutingModule } from './taxe-routing.module';
import { TaxeComponent } from './taxe.component';
import { CreateOrEditTaxeComponent } from './create-or-edit-taxe.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../../shared/utils.module';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        TaxeRoutingModule,
        TableModule,
        PaginatorModule,
        UtilsModule
    ],
    exports: [],
    declarations: [TaxeComponent, CreateOrEditTaxeComponent],
    providers: [],
})
export class TaxeModule { }

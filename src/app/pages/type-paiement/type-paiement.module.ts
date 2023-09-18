 import { TypePaiementComponent } from './type-paiement.component';
import { CreateOrEditTypePaiementComponent } from './create-or-edit-type-paiement.component';
import { TypePaiementRoutingModule } from './type-paiement-routing.module';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../../shared/utils.module';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TypePaiementRoutingModule,
        TableModule,
        PaginatorModule,
        UtilsModule
    ],
    exports: [],
    declarations: [TypePaiementComponent, CreateOrEditTypePaiementComponent],
    providers: [],
})
export class TypePaiementModule { }

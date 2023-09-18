import { NgModule } from '@angular/core';
import { UtilisateurComponent } from './utilisateur.component';
import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { UtilisateurService } from './utilisateur.service';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrUpdateUtilisateurComponent } from './create-or-edit-utilisateur.component';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../../shared/utils.module';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        UtilisateurRoutingModule,
        TableModule,
        PaginatorModule,
        UtilsModule,
    ],
    exports: [

    ],
    declarations: [UtilisateurComponent,CreateOrUpdateUtilisateurComponent],
    providers: [
        UtilisateurService
    ],
})
export class UtilisateurModule { }

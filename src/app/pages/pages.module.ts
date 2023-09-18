import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule as IOTDashboardModule } from './dashboard/iot-dashboard.module';
import { DashboardModule as DashboardModule } from './e-commerce/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TypeDepenseModule } from './type-depense/type-depense.module';
import { CommonModule } from '@angular/common';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ThemeModule,
    NbMenuModule,
    IOTDashboardModule,
    DashboardModule,
    MiscellaneousModule,
    UtilisateurModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    TypeDepenseModule,
    DropdownModule,
    
  ],
  declarations: [
    PagesComponent,
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class PagesModule {
}

import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbCheckboxModule } from '@nebular/theme';


@NgModule({
        imports:[
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            NbCheckboxModule
        ],
        declarations: [
            LoginComponent,
        ],
        exports:[LoginComponent]
})
export class AuthModule{

}
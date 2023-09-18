import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
  <p-toast position="bottom-right" [style]="{marginTop: '80px'}"></p-toast>
  <p-confirmDialog header="Confirmation" icon="pi pi-exclamation-triangle"></p-confirmDialog>
    <ngx-one-column-layout [showSideBar]="isAdmin">
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  isAdmin:boolean;
  constructor(private activatedRoute:ActivatedRoute){
    this.activatedRoute.data.subscribe(data=>{
      if(data.currentUser){
        this.isAdmin = data.currentUser.admin;
      }
    })
  }
}

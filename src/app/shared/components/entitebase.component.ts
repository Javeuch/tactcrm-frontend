import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';


export class EntiteBaseComponent implements OnInit {

    constructor(
        private messageService:MessageService
    ) {

    }

    ngOnInit() { }

    notify(severity:string, title:string, message:string){
        this.messageService.add({severity: severity, summary: title, detail: message});
    }
}
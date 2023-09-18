import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IArticle, Article } from '../../shared/models/article.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ArticlesService } from './article.service';
import { ITaxe } from '../../shared/models/taxe.model';
import { TaxeService } from '../taxe/taxe.service';
import { Dropdown } from 'primeng/dropdown';

@Component({
    selector: 'ngx-create-or-edit-article',
    templateUrl: 'create-or-edit-article.component.html'
})

export class CreateOrEditArticleComponent implements OnInit, AfterViewInit {
   
    @ViewChild("taxepicker") taxePicker: Dropdown;
    model: IArticle;
    routeData:any;
    taxes: ITaxe[];
    selectedTaxe:ITaxe;
    title: string;


    constructor(
        private router: Router,
        private activatedRoute:ActivatedRoute,
        private messageService : MessageService,
        private articleService : ArticlesService,
        private taxeService: TaxeService

    ) {
        this.model = new Article();
    }


    ngOnInit() {
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.title =  data.title;
            if(data.article){
                this.model = data.article;
            }
        });
        this.loadTaxes();
    }

    ngAfterViewInit(): void {
    //    this.taxePicker.selectedOption = this.selectedTaxe;
    }

    save(){

        this.model.taxeId = this.selectedTaxe.id;
        if(this.model.id){// edit
            this.articleService.update(this.model).subscribe(res=>{
                this.notify('success', 'success', 'article bien modifié');
                this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
            });
        }else{//create
            this.articleService.create(this.model)
            .subscribe(res=>{
                this.notify('success', 'success', 'article bien enrgistrer');
                this.router.navigate(['..'], {relativeTo: this.activatedRoute});
            });
        }
    }
    backToList(){
        if (this.model.id) {
        this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
        }else{
          this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        }
    }
    
    checkResponse(response: any){
        if(response.status===201){
            this.messageService.add({severity:'success', summary: 'Success Message', detail:'article ajouté'});
        }else{
            this.messageService.add({severity:'error', summary: 'Success Message', detail:'not submited'});
        }
    }

    notify(severity:string, title:string, message:string){
        this.messageService.add({severity:severity, summary:title, detail:message});
    }

    loadTaxes(){
        this.taxeService.getAsList()
        .subscribe(res=>{
            this.taxes = res.body;
            if(this.model.id){
                this.selectedTaxe = this.taxes.find(e=>e.id===this.model.taxeId);
            }
        });
    }

}
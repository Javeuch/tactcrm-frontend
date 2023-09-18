import { Adresse } from './../../shared/models/adresse.model';
import { UtilisateurService } from './utilisateur.service';
import { AdresseService } from './adresse.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { IUtilisateur,Utilisateur } from './../../shared/models/utilisateur.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'create-or-update-utilisateur',
  templateUrl: './create-or-edit-utilisateur.component.html'
})
export class CreateOrUpdateUtilisateurComponent implements OnInit {

  model: IUtilisateur;
  routeData: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private messageService: MessageService,
    private utilisateurService: UtilisateurService,
    private adresseService: AdresseService
  ) {
    this.model = new Utilisateur();
    this.model.adresse = new Adresse();
  }

  ngOnInit() {

    this.routeData = this.activatedRoute.data.subscribe(data => {
      if (data.client) {
        this.model = data.client;
        this.model.password = "";
        this.model.adresse = new Adresse();

        if (data.client.adresseid) {
          this.adresseService.find(data.client.adresseid)
            .subscribe(res => {
              this.model.adresse = res.body;
            });
        }
      }
    });

  }


  save() {
    // console.log(this.selectedSpecialite);
    if (this.model.id) {
      this.utilisateurService.update(this.model).subscribe(res => {
        this.notify('success', 'success', 'utilisateur bien modifié');
        this.router.navigate(['../..'], { relativeTo: this.activatedRoute });
      });
    } else {
      // console.log(this.model);
      // console.log(this.selectedSpecialite.id);
      this.utilisateurService.create(this.model)
        .subscribe(res => {
          this.notify('success', 'success', 'utilisateur bien enrgistrer');
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        });
    }
  }

  checkResponse(response: any) {
    if (response.status === 201) {
      this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'utilisateur ajouté' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Success Message', detail: 'not submited' });
    }
  }

  notify(severity: string, title: string, message: string) {
    this.messageService.add({ severity: severity, summary: title, detail: message });
  }
  backToList(){
    if (this.model.id) {
    this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
    }else{
      this.router.navigate(['..'], {relativeTo: this.activatedRoute});
    }
}


}

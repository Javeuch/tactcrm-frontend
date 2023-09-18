import { IUtilisateur } from './utilisateur.model';
import { ITypePaiement } from './type-paiement.model';
import { IAdresse } from './adresse.model';
import { IDevise } from './devise.model';

export interface IFacture{
    id?: number;
    dateFacturation: Date;
    numeroFacture: string;
    utilisateurId: number;
    deviseId: number;
    taxeId: number;
    typePaiementId: number;
    taxe_nom: string;

    utilisateur_nom: string;

    type_paiement_nom: string; 
}
export interface IFactureView{
    id?: number;
    dateFacturation: Date;
    numeroFacture: string;
    utilisateurId: number;
    deviseId: number;
    taxeId: number;
    typePaiementId: number;
    taxe_nom: string;
    utilisateurDTO:IUtilisateur;
    typePaiementDTO:ITypePaiement;
    clientAdressDTO: IAdresse;
    deviseDTO:IDevise;

}

export class Facture implements IFacture{
    id?: number;
    dateFacturation: Date;
    numeroFacture: string;
    utilisateurId: number;
    deviseId: number;
    taxeId: number;
    typePaiementId: number;
    taxe_nom: string;
    utilisateur_nom: string;
    type_paiement_nom: string;
}

export class FactureView implements IFactureView{
    id?: number;
    dateFacturation: Date;
    numeroFacture: string;
    utilisateurId: number;
    deviseId: number;
    taxeId: number;
    typePaiementId: number;
    taxe_nom: string;
    utilisateurDTO: IUtilisateur;
    typePaiementDTO: ITypePaiement;
    clientAdressDTO: IAdresse;
    deviseDTO: IDevise;
}
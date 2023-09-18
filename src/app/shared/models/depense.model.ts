import { ITaxe } from './taxe.model';
import { ITypePaiement } from './type-paiement.model';
import { ITypeDepense } from './type-depense.model';
import { IDevise } from './devise.model';



export interface IDepense{

    id?:number;
    nom:string;
    dateDepense:Date;
    description: string;
    montant: number;
    typePaiementId: number;
    typeDepenseId: number;
    deviseId: number;
    typePaiement: ITypePaiement;
    typeDepense: ITypeDepense;
    devise: IDevise;

}

export class Depense implements IDepense{
    id?: number;
    nom: string;
    dateDepense: Date;
    description: string;
    montant: number;
    typePaiementId: number;
    typeDepenseId: number;
    deviseId: number;
    typePaiement: ITypePaiement;
    typeDepense: ITypeDepense;
    devise: IDevise;

}
import { Adresse, IAdresse } from './adresse.model';

export interface IUtilisateur {

    id:number;
    nom: string;
    prenom: string;
    login: string;
    password: string;
    email: string;
    telephone: string;
    isAdmin: boolean;
    adresseId:number;
    adresse: IAdresse;
}

export class Utilisateur implements IUtilisateur{
    id: number;
    nom: string;
    prenom: string;
    login: string;
    password: string;
    email: string;
    telephone: string;
    isAdmin: boolean;
    adresseId:number;
    adresse: IAdresse;
}
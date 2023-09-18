export interface IDevise{

    id?:number;
    nom:string;
    symbole: string;
}

export class Devise implements IDevise{
    id?: number;
    nom: string;
    symbole:string;
}
export interface ITaxe{

    id?:number;
    nom: string;
    taux:number;
}

export class Taxe implements ITaxe{
    id?: number;
    nom: string;
    taux: number;
}
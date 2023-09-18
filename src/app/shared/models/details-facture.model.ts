import { ITaxe } from './taxe.model';


export interface IDetailsFacture{
    id?: number;
    prixFactureHt: number;
    quantite: number;
    factureId: number;
    articleId: number;
    articleDesignation: string;
    taxeDto: ITaxe;
}

export class DetailsFacture implements IDetailsFacture{
    id?: number;
    prixFactureHt: number;
    quantite: number;
    factureId: number;
    articleId: number;
    articleDesignation: string;
    taxeDto: ITaxe;
}
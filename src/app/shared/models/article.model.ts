import { ITaxe } from './taxe.model';

export interface IArticle{

    id?:number;
    designation:string;
    prixVente:number;
    taxeId:number;
    taxeDto: ITaxe;
}

export class Article implements IArticle{
    id?: number;
    designation: string;
    prixVente:number;
    taxeId:number;
    taxeDto: ITaxe;
}
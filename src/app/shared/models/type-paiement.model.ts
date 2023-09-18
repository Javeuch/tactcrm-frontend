export interface ITypePaiement{

    id?:number;
    nom:string;
    description:string;
}

export class TypePaiement implements ITypePaiement{
    id?: number;
    nom: string;
    description: string;

}
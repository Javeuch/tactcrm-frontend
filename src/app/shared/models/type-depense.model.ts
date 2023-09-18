export interface ITypeDepense{

    id?:number;
    nom: string;
    description:string;
}

export class TypeDepense implements ITypeDepense{
    id?: number;
    nom: string;
    description: string;

}
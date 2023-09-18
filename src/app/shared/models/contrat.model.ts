
export interface IContrat{
    id?:number;
    sujet:string;
    dateDebut:Date;
    dateFin:Date;
    description:string;
    typeContrat:string;
    utilisateurId: number;
}

export class Contrat implements IContrat{
    id?: number;
    sujet: string;
    dateDebut: Date;
    dateFin: Date;
    description: string;
    typeContrat: string;
    utilisateurId: number;

}
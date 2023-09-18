export interface IAdresse{

    id:number;
    rue: string;
    localite: string;
    ville: string;
    pays: string;
    utilisaterId:number;
}

export class Adresse implements IAdresse{
    id: number;
    rue: string;
    localite: string;
    ville: string;
    pays: string;
    utilisaterId: number;
}
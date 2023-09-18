export interface IMasterTypeDTO{
    utilisations:number;
    libelle:string;
    
}

export class MasterTypeDTO implements IMasterTypeDTO{
    utilisations: number;
    libelle: string;
}
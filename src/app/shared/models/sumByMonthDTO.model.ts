export interface ISumByMonthDTO{
    mois:number;
    montant:number;
}

export class SumByMonthDTO implements ISumByMonthDTO{
    
    mois: number;
    montant: number;
}
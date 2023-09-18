export interface IStats{

    countProduitVendue:number;
    countClient:number;
    sumDepense:number;
    sumProfit:number;
}

export class Stats implements IStats{
    countProduitVendue: number;
    countClient: number;
    sumDepense: number;
    sumProfit: number;
}
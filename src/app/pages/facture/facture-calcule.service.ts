import { Injectable } from '@angular/core';
import { IDetailsFacture } from '../../shared/models/details-facture.model';

export interface IFactureResult{
    totalHt:number;
    totalTaxes: number;
    totalTtc:number;
}
@Injectable({providedIn: 'root'})
export class FactureCalculationService {
    constructor(
        
    ) { }

    calculate(detailsFacturesList: IDetailsFacture[]):IFactureResult{
        let output:IFactureResult = {
            totalHt: 0,
            totalTaxes: 0,
            totalTtc:0
        };
        detailsFacturesList.forEach(itm=>{

            output.totalHt+= itm.prixFactureHt*itm.quantite;
            output.totalTaxes += itm.prixFactureHt*itm.quantite*(itm.taxeDto.taux/100);
            output.totalTtc += itm.prixFactureHt*itm.quantite*((itm.taxeDto.taux/100)+1);
        });

        return output;
    }

}
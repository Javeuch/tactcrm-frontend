import { IMasterTypeDTO } from './master-typeDTO.model';

export interface IPieChartOutput{
    factureByTypePaiement:IMasterTypeDTO[];

    depenseByTypeDepense:IMasterTypeDTO[];
}

export class PieChartOutput implements IPieChartOutput{
    factureByTypePaiement: IMasterTypeDTO[];
    depenseByTypeDepense: IMasterTypeDTO[];

}
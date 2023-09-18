import { SumByMonthDTO } from './sumByMonthDTO.model';

export interface ILineChartOutput{
    sumProfitByMonth:SumByMonthDTO[];
    sumDepenseByMonth:SumByMonthDTO[];
}

export class LineChartOutput implements ILineChartOutput{
    sumProfitByMonth: SumByMonthDTO[];
    sumDepenseByMonth: SumByMonthDTO[];

}
import { N3rgyConsumptionSummary } from "./N3rgyTypes";


export type DataSummaryTableInput = {
    electricitySummaryData: N3rgyConsumptionSummary[],
    gasSummaryData: N3rgyConsumptionSummary[]
}
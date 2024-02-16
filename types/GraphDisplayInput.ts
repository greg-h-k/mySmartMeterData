import { N3rgyConsumptionSummary } from "./N3rgyTypes";

export type GraphDisplayInput = {
    isLoading: boolean,
    isDataMissing: boolean,
    chartData: N3rgyConsumptionSummary[],
    themeColors: object
}
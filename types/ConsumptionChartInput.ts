import { N3rgyConsumptionSummary } from "./N3rgyTypes";

export type ConsumptionChartInput = {
    data: N3rgyConsumptionSummary[],
    x_accessor: string,
    y_accessor: string,
    themeColors: any
}
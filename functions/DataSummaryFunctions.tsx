import { N3rgyConsumptionResponse, N3rgyConsumptionSummary } from "../types/N3rgyTypes";
import { DataConsumptionValue } from "../types/DataSummaryTypes";

import moment from 'moment';


export const normalizeTimestamps = (data: N3rgyConsumptionResponse): DataConsumptionValue[] => {
    const normalizedData = new Array<DataConsumptionValue>;
    data["values"].forEach(element => {
        // subtract 30 mins to adjust for API windows
        normalizedData.push({timestamp: moment(element.timestamp).subtract(30, 'minutes'), value: element.value})
    });

    return normalizedData;
}

export const summarizeConsumptionData = (data: DataConsumptionValue[], summaryKey: string) => {
    const summaryMapData = new Map<string, number>();

    for (const {timestamp, value} of data){
        var timeGroup = moment(timestamp).format(summaryKey)
        summaryMapData.set(timeGroup, (summaryMapData.get(timeGroup) || 0) + value);
    }

    let obj = new Array<N3rgyConsumptionSummary>();
    summaryMapData.forEach((_value, key) => {
        // round total to 2dp 
        obj.push({'x': key, 'y': Math.round(_value * 100) / 100})
    })
    return obj;
}

export function getEarliestDateFromSummaryData(data: N3rgyConsumptionSummary[]) {
    return new Date(Math.min(...data.map(item => Date.parse(item.x.toString()))));
}

export function getLatestDateFromSummaryData(data: N3rgyConsumptionSummary[]) {
    return new Date(Math.max(...data.map(item => Date.parse(item.x.toString()))));
}
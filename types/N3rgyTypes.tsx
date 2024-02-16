
export type N3rgyConsumptionResponse = {
    resource: string, 
    responseTimestamp: string,
    start: string, 
    end: string
    granularity: string,
    values: [{timestamp: string, value: number}],
    availableCacheRange: {start: string, end: string},
    unit: string
}
  
export type N3rgyConsumptionSummary = {
    x: string, 
    y: number
}
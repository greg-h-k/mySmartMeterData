import * as React from 'react';
import { DataTable } from 'react-native-paper';

const _ = require('lodash.get')

import { N3rgyConsumptionSummary } from '../types/N3rgyTypes';
import { DataSummaryTableInput } from '../types/DataSummaryTableInput';

export function DataSummaryTable({electricitySummaryData, gasSummaryData}: DataSummaryTableInput) {
 
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title >Date</DataTable.Title>
        <DataTable.Title>Electricity Consumption (kWh)</DataTable.Title>
        <DataTable.Title>Gas Consumption (cubic meters)</DataTable.Title>
      </DataTable.Header>

      {electricitySummaryData.map((item: N3rgyConsumptionSummary, index: number) => (
        <DataTable.Row key={index}>
          <DataTable.Cell>{item.x}</DataTable.Cell>
          <DataTable.Cell>{item.y}</DataTable.Cell>
          {/* lodash.get function will try to retrieve y attribute, if not found will return null */}
          <DataTable.Cell>{_(gasSummaryData[index], 'y', null)}</DataTable.Cell>
        </DataTable.Row>
      ))}


    </DataTable>
  );
};

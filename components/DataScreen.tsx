import React, { useEffect, useState } from 'react';
import {View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import moment from 'moment';

import { DataSummaryTable } from './DataSummaryTable';

import { N3rgyConsumptionResponse, N3rgyConsumptionSummary } from '../types/N3rgyTypes';
import { DataConsumptionValue } from '../types/DataSummaryTypes';
import { storeObject, 
  storeValue, 
  loadData
} from '../functions/DataStorageFunctions';
import { getConsumptionData } from '../functions/N3rgyApiFunctions';
import { summarizeConsumptionData, normalizeTimestamps } from '../functions/DataSummaryFunctions';
import { GraphDisplay } from './GraphDisplay';
import { GraphContainer } from './GraphContainer';
import { GraphParameters } from './GraphParameters';

import { 
  electricityDataStoredKey,
  gasDataStoredKey,
  electricityLastUpdatedStoredKey,
  gasLastUpdatedStoredKey,
  serialNumberStoredKey
 } from '../Variables';


const TODAY = moment().format('YYYYMMDD');
const earliestDate = moment().subtract(90, 'days').format('YYYYMMDD');


export function DataScreen({ route, navigation, ...props }: any) {

  // variables to control loading spinner
  const [isElectricityLoading, setElectricityLoading] = useState(true);
  const [isGasLoading, setGasLoading] = useState(true);

  /*
  The raw data is retrieved at 30 minute time intervals. We want to be 
  able to summarize the data at different levels of granularity and allow
  the user to select this. 
  The summary key state holds this group by level information. 
  */
  const [summaryKey, setSummaryKey] = useState('YYYY-MM-DD');

  /*
  We retrieve data from API for last 90 days (the max allowed). 
  We want to be able to show subsets of the data to allow zooming in
  on certain time periods, relative to the current date. 
  The date key state holds the number of data points to show working back 
  from the latest. 
  So with the default summaryKey aggregating by day, and default dateKey 
  of 90, the last 90 days of data are shown. 
  */
  const [dateKey, setDateKey] = useState('7');


  // state to hold the raw API response
  const [rawElectricityResponse, setRawElectricityResponse] = useState<N3rgyConsumptionResponse>();
  const [rawGasResponse, setRawGasResponse] = useState<N3rgyConsumptionResponse>();
  
  /*
  After retrieving data from API, we must pass it through a normalizing function. This is because the API
  uses lagging time windows which are not intuative. So we push back times by 30 mins. 
  The normalization function returns just the list of data values, rather than the full response. 
  We store this output as state here. 
  */
  const [rawElectricityData, setRawElectricityData] = useState<DataConsumptionValue[]>(new Array<DataConsumptionValue>);
  const [rawGasData, setRawGasData] = useState<DataConsumptionValue[]>(new Array<DataConsumptionValue>);

  /*
  Summarized data is stored as separate state so that we can support easy switching between different summary level 
  aggregations. So if user changes summaryKey, we can use the original data values to re-compute data 
  at the new summary level. 
  */
  const [summaryElectricityData, setSummaryElectricityData] = useState<N3rgyConsumptionSummary[]>(new Array<N3rgyConsumptionSummary>);
  const [summaryGasData, setSummaryGasData] = useState<N3rgyConsumptionSummary[]>(new Array<N3rgyConsumptionSummary>);


  // flags for if no data was returned by the API
  const [electricityDataMissing, setElectricityDataMissing] = useState(false);
  const [gasDataMissing, setGasDataMissing] = useState(false);


  const refreshElectricityConsumptionData = (authToken: string, startDate: string, endDate: string) => {
    getConsumptionData(authToken, 'electricity', startDate, endDate).then(returnedData => {
      if (returnedData != null) {
        // data was retrieved from the api
        // adjust data so that time windows better reflect what you might expect
        const normalizedData = normalizeTimestamps(returnedData);
        setRawElectricityData(normalizedData);
        setSummaryElectricityData(summarizeConsumptionData(normalizedData, summaryKey));
        storeObject(electricityDataStoredKey, normalizedData);
        storeValue(electricityLastUpdatedStoredKey, TODAY);
      } else {
        // no data returned from the API
        setElectricityDataMissing(true);
      }
      // either way set loading to false
      setElectricityLoading(false);
    })
  }

  const refreshGasConsumptionData = (authToken: string, startDate: string, endDate: string) => {
    getConsumptionData(authToken, 'gas', startDate, endDate).then(returnedData => {
      if (returnedData != null) {
        // data was retrieved from the api
        // adjust data so that time windows better reflect what you might expect
        const normalizedData = normalizeTimestamps(returnedData);
        setRawGasData(normalizedData);
        setSummaryGasData(summarizeConsumptionData(normalizedData, summaryKey));
        storeObject(gasDataStoredKey, normalizedData);
        storeValue(gasLastUpdatedStoredKey, TODAY);
      } else {
        // no data returned from the API
        setGasDataMissing(true);
      }
      // either way set loading to false
      setGasLoading(false);
    })
  }


  useEffect(() => {
   
    /*
    Try loading the last updated date information. If no stored data is found, 
    then need to call API and store data. 
    If date key is found, check to see if it is todays date. 
    If it is, then data has already been refreshed today, so to prevent excessive API calls, just use the 
    stored data that is available. 
    If it is not from today, trigger a refresh. 
    */
    // electricity 
    loadData(electricityLastUpdatedStoredKey).then(lastUpdatedDate => {
      if (lastUpdatedDate == TODAY) {
        // data was saved today so we can re-use it 
        loadData(electricityDataStoredKey).then(loadedData => {
          if (loadedData != null) {
            setRawElectricityData(loadedData);
            setSummaryElectricityData(summarizeConsumptionData(loadedData, summaryKey));
            console.log("loaded electricity raw data")
            setElectricityLoading(false);
          } else {
            console.log("electricity saved data key not found");
            refreshElectricityConsumptionData(props.serialNumber, earliestDate, TODAY);
          }
        })
      } else {
        // there was no saved data or it was from before today 
        refreshElectricityConsumptionData(props.serialNumber, earliestDate, TODAY);
      }
    })

    // gas
    loadData(gasLastUpdatedStoredKey).then(lastUpdatedDate => {
      if (lastUpdatedDate == TODAY) {
        // data was saved today so we can re-use it 
        loadData(gasDataStoredKey).then(loadedData => {
          if (loadedData != null) {
            setRawGasData(loadedData);
            setSummaryGasData(summarizeConsumptionData(loadedData, summaryKey));
            console.log("loaded gas raw data")
            setGasLoading(false);
          } else {
            console.log("gas saved data key not found");
            refreshGasConsumptionData(props.serialNumber, earliestDate, TODAY);
          }
        })
      } else {
        // there was no saved data or it was from before today 
        refreshGasConsumptionData(props.serialNumber, earliestDate, TODAY);
      }
    })

    
    // you can only navigate to the data screen after entering 
    // a valid serial number. So store the number for future 
    // use 
    storeValue(serialNumberStoredKey, props.serialNumber)

    // we watch the serial number prop so if user enters a new one it will trigger a re-run
  }, [props.serialNumber]);

  useEffect(() => {
    setSummaryElectricityData(summarizeConsumptionData(rawElectricityData, summaryKey));
    setSummaryGasData(summarizeConsumptionData(rawGasData, summaryKey));

    // watch summary and date key, if either changes, need to update the stored summary data 
  }, [summaryKey, dateKey])

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
    <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
      <View style={style.container}>

        <GraphParameters summaryKey={summaryKey} setSummaryKey={setSummaryKey} dateKey={dateKey} setDateKey={setDateKey} />

        <GraphContainer title='Electricity consumption (kWh)'>
          <GraphDisplay 
            isLoading={isElectricityLoading}
            isDataMissing={electricityDataMissing}
            /* date key holds number of data points to show depending on selected metric (day, week, hour). 
            Use negative index to select most recent (indexes from end of list) */
            chartData={summaryElectricityData.slice(-dateKey)}
            themeColors={props.themeColors}
          />
        </GraphContainer>

        <GraphContainer title='Gas consumption (cubic meters)'>
          <GraphDisplay 
            isLoading={isGasLoading}
            isDataMissing={gasDataMissing}
            chartData={summaryGasData.slice(-dateKey)}
            themeColors={props.themeColors}
          />
        </GraphContainer>

        <GraphContainer title='Consumption table'>
          <DataSummaryTable electricitySummaryData={summaryElectricityData.slice(-dateKey)} gasSummaryData={summaryGasData.slice(-dateKey)} />
        </GraphContainer>
      
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};
 
const style = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
  },
});
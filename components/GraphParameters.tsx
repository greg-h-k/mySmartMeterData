import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

import { GraphParametersInput } from '../types/GraphParametersInput';

export const GraphParameters = ({summaryKey, setSummaryKey, dateKey, setDateKey}: GraphParametersInput) => {

    /*
    This sets values and labels for when data is being shown at 30 minute summary level. 
    So for example, when showing data half hourly and user selects Last 90 days, that 
    means there are 90*24*2=4320 points to show and this value is used to set the dateKey
    */
    const dateKeyHalfHourButtons = [
        {
            value: '4320',
            label: 'Last 90 days',
        },
        {
            value: '1440',
            label: 'Last 30 days',
        },
        { 
            value: '336', 
            label: 'Last 7 days' 
        },
        {
            value: '48',
            label: 'Latest day'
        }
        ]

    const dateKeyDayButtons = [
        {
            value: '90',
            label: 'Last 90 days',
        },
        {
            value: '30',
            label: 'Last 30 days',
        },
        { 
            value: '7', 
            label: 'Last 7 days' 
        }
        ]

        const dateKeyWeekButtons = [
            {
                value: '12',
                label: 'Last 12 weeks',
            },
            {
                value: '4',
                label: 'Last 4 weeks',
            },
            { 
                value: '2', 
                label: 'Last 2 weeks' 
            }
            ]

    const buttons = () => {
        if (summaryKey == 'YYYY-MM-DD HH') {
            return dateKeyHalfHourButtons
        } else if (summaryKey == 'YYYY-MM-DD') {
            return dateKeyDayButtons
        } else {
            return dateKeyWeekButtons
        }
    }

    return (
        <View style={style.container}>
            {/* Buttons for controlling the summary aggregation level  */}
            <SegmentedButtons
                value={summaryKey}
                onValueChange={setSummaryKey}
                buttons={[
                    {
                    value: 'YYYY-MM-DD HH',
                    label: 'Hour',
                    },
                    {
                    value: 'YYYY-MM-DD',
                    label: 'Day',
                    },
                    { 
                    value: 'YYYY-WW', 
                    label: 'Week' 
                    },
                ]}
                />

            {/* Buttons for controlling the number of data points to show  */}
            <SegmentedButtons
                value={dateKey}
                onValueChange={setDateKey}
                buttons={buttons()}
                />

        </View>
        
    )
};

const style = StyleSheet.create({
    container: {
        padding: 20
    },
  });
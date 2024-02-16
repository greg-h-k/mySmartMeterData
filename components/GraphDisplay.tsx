import { ScrollView, ActivityIndicator } from "react-native";

import { Text } from "react-native-paper";

import { ConsumptionChart } from "./ConsumptionChart";
import { GraphDisplayInput } from "../types/GraphDisplayInput";


export const GraphDisplay = ({ isLoading, isDataMissing, chartData, themeColors }: GraphDisplayInput) => {

    return (
        <ScrollView horizontal={true}>
            <ActivityIndicator animating={isLoading} />
            {isDataMissing && 
                <Text>
                    No data returned. Please allow time from registering your smart meter for 
                    data to be collected and try again later. Also, ensure you have internet 
                    access and try again later. 
                </Text>
            } 
            {(!isDataMissing && !isLoading) &&
                <ConsumptionChart data={chartData} x_accessor='x' y_accessor='y' themeColors={themeColors} />
            }
        </ScrollView>
    )
}

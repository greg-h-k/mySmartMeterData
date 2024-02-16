import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

import { 
    VictoryLine,
    VictoryChart, 
    VictoryVoronoiContainer,
    VictoryTooltip,
    VictoryAxis, 
    VictoryTheme } from 'victory-native';

import { ConsumptionChartInput } from '../types/ConsumptionChartInput';

export const ConsumptionChart = ({data, x_accessor, y_accessor, themeColors}: ConsumptionChartInput) => {

    const windowDimensions = Dimensions.get('window');
    const screenDimensions = Dimensions.get('screen');

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
      });
    
      useEffect(() => {
        const subscription = Dimensions.addEventListener(
          'change',
          ({window, screen}) => {
            setDimensions({window, screen});
          },
        );
        return () => subscription?.remove();
      });
    

    return(
        <VictoryChart
                // domainPadding will add space to each side of VictoryBar to
                // prevent it from overlapping the axis
                domainPadding={40}
                width={dimensions.window.width}
                theme={VictoryTheme.material}
                containerComponent={<VictoryVoronoiContainer
                    labels={({ datum }) => `${datum.x}, ${datum.y}`}
                    labelComponent={<VictoryTooltip 
                        style={{ backgroundColor: themeColors.colors.secondary }}
                        />}
                  />}
            >
                <VictoryAxis
                    tickFormat={x => x}
                    fixLabelOverlap={true}
                    style={{
                        axis: {
                            stroke: themeColors.colors.secondary
                        },
                        tickLabels: {
                            fill: themeColors.colors.secondary
                        },
                        grid: {
                            stroke: 'none'
                        }
                    }}
                    
                />
                <VictoryAxis
                    dependentAxis
                    style={{
                        axis: {
                            stroke: themeColors.colors.secondary
                        },
                        tickLabels: {
                            fill: themeColors.colors.secondary
                        },
                        grid: {
                            stroke: 'none'
                        }
                    }}
                />

                <VictoryLine
                    data={data}
                    // data accessor for x values 
                    x={x_accessor}
                    // data accessor for y values
                    y={y_accessor}
                    labels={({ datum }: any) => data.length <= 14 ? `${datum.y}` : null}
                    style={{
                        data: {
                            stroke: themeColors.colors.primary
                        },
                        labels: {
                            fill: themeColors.colors.tertiary
                        }
                    }}
                    
                />
            </VictoryChart>
    )

}
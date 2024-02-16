import { VictoryThemeDefinition } from "victory";

const darkTheme = require('./dark-theme.json');

export const graphDarkTheme: VictoryThemeDefinition = {
    axis: {
        style: {
            axis: {
                fill: 'transparent',
                stroke: darkTheme.colors.secondary
            }
        }
    }
}
import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
  MD3LightTheme,
  MD3DarkTheme,
  PaperProvider,
  adaptNavigationTheme
} from 'react-native-paper';
import merge from 'deepmerge';

import { loadValue } from './functions/DataStorageFunctions';
import { serialNumberStoredKey } from './Variables'; 

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

import { PreferencesContext } from './PreferencesContext';

import { PageHeader } from './components/PageHeader';
import { BottomTabNavigator } from './components/BottomTabNavigator';
import { StartDialog } from './components/StartDialog';

const darkThemeColors = require('./theme/dark-theme.json');
const lightThemeColors = require('./theme/light-theme.json');


LogBox.ignoreLogs([
  "Require cycle: node_modules/victory",
]);

export default function App () {

  const [isThemeDark, setIsThemeDark] = React.useState(true);
  const [serialNumber, setSerialNumber] = React.useState("");

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  let themeColors = isThemeDark ? darkThemeColors : lightThemeColors;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark
    }),
    [toggleTheme, isThemeDark]
  );

  useEffect(() => {
    loadValue(serialNumberStoredKey).then(loadedSerialNumber => {
      if (loadedSerialNumber != null) {
        setSerialNumber(loadedSerialNumber);
      }
    })
  }, [])


  const [dialogVisible, setDialogVisible] = React.useState(true);

  const hideDialog = () => setDialogVisible(false);


  return (

    <PreferencesContext.Provider value={preferences}>
      
      <PaperProvider theme={theme}>
      
          <NavigationContainer theme={theme}>

                <StatusBar barStyle={isThemeDark ? 'light-content': 'dark-content'} />
              
                <PageHeader showStartDialog={setDialogVisible} />
                <StartDialog visible={dialogVisible} hideDialog={hideDialog} />
                <BottomTabNavigator serialNumber={serialNumber} setSerialNumber={setSerialNumber} themeColors={themeColors} />

            </NavigationContainer>
        
      </PaperProvider>
    </PreferencesContext.Provider>
  )
  
};
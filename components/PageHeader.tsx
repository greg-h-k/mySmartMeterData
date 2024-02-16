import React from "react";
import { Image, StyleSheet } from 'react-native';
import { useTheme, Appbar, Icon, Switch, IconButton } from 'react-native-paper';
import { PreferencesContext } from '../PreferencesContext';

const logoImage = require('../assets/favicon.png');

export const PageHeader = ({showStartDialog}: any) => {

    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

    return (

        <Appbar.Header
            theme={{
                colors: {
                primary: theme?.colors.surface,
                },
            }}
            style={{ margin: 10 }}
        >
            <Image source={logoImage} style={styles.image} />
            <Appbar.Content title='mySmartMeterData' style={styles.title} />
            <Icon source="theme-light-dark" size={20} />
            
            <Switch
                color={'green'}
                value={isThemeDark}
                onValueChange={toggleTheme}
                style={{ justifyContent: 'flex-end'}}
            />
            <IconButton
                icon='help'
                onPress={() => showStartDialog(true)}
                style={{ justifyContent: 'flex-end'}}
            />
        </Appbar.Header>  
        
    )
}

const styles = StyleSheet.create({
    title: {
        paddingLeft: 10,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 18,
    }
  }); 
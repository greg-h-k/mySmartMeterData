import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import { Button, Card, TextInput, HelperText, Text, Divider } from 'react-native-paper';

import { isSerialNumberValid } from '../functions/SerialNumberFunctions';
import { FontAwesome, Octicons } from '@expo/vector-icons';

import { PreferencesContext } from '../PreferencesContext';
import * as Linking from 'expo-linking';

export const SetupGuide = ({navigation, ...props}: any) => {

    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
    const iconColor = isThemeDark ? "white" : "black";
    

    return (

        <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>

            <ScrollView style={styles.container}>

                <Text variant="bodyLarge">
                    Use this app to easily access, visualize and understand your smart meter data. 
                    Data is pulled from the n3rgy service and electricity & gas consumption 
                    data will be displayed. 
                    There is a time lag from data being collected from your meter, so data for the 
                    latest day may not be complete. 
                </Text>

                <Divider style={{ margin: 10 }} />

                <Card style={styles.card}>
                    <Card.Title 
                        title="1. Sign up to n3rgy" 
                        titleVariant="headlineSmall" 
                        titleNumberOfLines={5}
                        subtitle="In order for this app to access your data, you must sign up to the n3rgy service. This will enable data collection from your smart meter."
                        subtitleNumberOfLines={20}
                        subtitleVariant="bodyMedium"
                        left={({ size }) => <FontAwesome name="sign-in" size={size} color={iconColor} onPress={() => Linking.openURL('https://data.n3rgy.com/consumer-sign-up')} />}
                    />
                </Card>

                <Card style={styles.card}>
                    <Card.Title 
                        title="2. Provide your Meter Point Administration Number (MPAN)" 
                        titleVariant="headlineSmall" 
                        titleNumberOfLines={5}
                        subtitle="During sign up with n3rgy, you will need to provide your MPAN number. Your MPAN is usually shown on your bill as a block prepended with an 'S'. The MPAN is the lower number in this block consisting of just numbers." 
                        subtitleNumberOfLines={20}
                        subtitleVariant="bodyMedium"
                        left={({ size }) => <Octicons name="number" size={size} color={iconColor} />}
                    />
                </Card>

                <Card style={styles.card}>
                    <Card.Title 
                        title="3. Provide your smart meter serial number (IHD)" 
                        titleVariant="headlineSmall" 
                        titleNumberOfLines={5}
                        subtitle="When registering with n3rgy, you also input your IHD serial number. This is a 16 character string visible on the back of your smart meter in home display. After registering with n3rgy, enter your IHD serial number below to retrieve and view your data. You will need to wait after registering for data to become available." 
                        subtitleNumberOfLines={20}
                        subtitleVariant="bodyMedium"
                        left={({ size }) => <FontAwesome name="tachometer" size={size} color={iconColor} />}
                    />
                    <Card.Content style={{ marginLeft: 50,  marginRight: 50 }}>
                        <HelperText type='error' visible={!isSerialNumberValid(props.serialNumber)} >Serial number should be 16 characters and only contain letters and numbers</HelperText>
                        <TextInput 
                            label="IHD Serial Number" 
                            value={props.serialNumber}
                            onChangeText={text => props.setSerialNumber(text.toUpperCase())}
                        />
                        <Card.Actions>
                            <Button 
                                mode="contained" 
                                disabled={!isSerialNumberValid(props.serialNumber)}
                                onPress={() => navigation.navigate('Data')}
                            >
                                Enter
                            </Button>
                        </Card.Actions>
                    </Card.Content>
                    
                </Card>
                
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    card: {
        marginBottom: 10
    }
});
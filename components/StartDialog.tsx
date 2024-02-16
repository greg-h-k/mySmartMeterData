import { ScrollView } from 'react-native';
import { Button, Dialog, Portal, List } from 'react-native-paper';
import * as Linking from 'expo-linking';


export const StartDialog = ({visible, hideDialog}: any) => {

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} style={{ 
            flex: 0.5, 
            flexDirection: 'column', 
            //backgroundColor: 'white',
            padding: 10,
            margin: 20
            }} >
                <Dialog.ScrollArea>
                    <ScrollView contentContainerStyle={{paddingHorizontal: 0}}>
                        <Dialog.Title>Get Started</Dialog.Title>
                        <Dialog.Content>
                            <List.Item
                                title='Overview'
                                descriptionNumberOfLines={10}
                                description='This app makes your smart meter data available for analysis and tracking. This is possible through the service provided by n3rgy'
                            />
                            <List.Item
                                title='Already registered?'
                                descriptionNumberOfLines={10}
                                description='If you have already registered, you can go straight to entering the serial number from your smart meter display unit to access your data' 
                            />
                            <List.Item
                                title='Sign-up'
                                descriptionNumberOfLines={10}
                                description="If you haven't registered, visit the n3rgy consumer sign up page where you can choose to sign up to the service. After registering, you may need to wait 24 hours before your data becomes visible"
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                mode='contained'
                                onPress={() => Linking.openURL('https://data.n3rgy.com/consumer-sign-up')}
                            >
                                n3rgy sign-up
                            </Button>
                            <Button 
                                mode='contained'
                                onPress={() => hideDialog()}>Dismiss
                            </Button>
                        </Dialog.Actions>
                    </ScrollView>
                </Dialog.ScrollArea>
            </Dialog>
        </Portal>
    )
    
}
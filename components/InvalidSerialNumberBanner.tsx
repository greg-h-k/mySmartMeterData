import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Banner } from 'react-native-paper';

export function InvalidSerialNumberBanner({ route, navigation, ...props}: any) {

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <Banner
        visible={true}
        actions={[
          {
            label: 'Fix it',
            onPress: () => navigation.navigate('Setup'),
          }
        ]}
      >
        Please enter your serial number
      </Banner>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 50
  },
});


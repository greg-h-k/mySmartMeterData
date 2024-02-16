import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { isSerialNumberValid } from '../functions/SerialNumberFunctions';

import { SetupGuide } from './SetupGuide';
import { DataScreen } from './DataScreen';
import { InvalidSerialNumberBanner } from './InvalidSerialNumberBanner';

import { BottomTabNavigatorInput } from '../types/BottomTabNavigatorInput';
import { Ionicons, Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator({ serialNumber, setSerialNumber, themeColors}: BottomTabNavigatorInput) {

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Tab.Navigator
        initialRouteName="Setup"
        backBehavior='initialRoute'
        
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: themeColors.colors.background }
        }}
      >
        <Tab.Screen
          name="Setup"
          children={props => <SetupGuide {...props} serialNumber={serialNumber} setSerialNumber={setSerialNumber} />}
          options={{
            tabBarLabel: 'Setup',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Data"
          children={props => isSerialNumberValid(serialNumber) ? <DataScreen {...props} serialNumber={serialNumber} themeColors={themeColors} /> : <InvalidSerialNumberBanner {...props} />}
          options={{
            tabBarLabel: 'Data',
            tabBarIcon: ({ color, size }) => (
              <Entypo name="area-graph" size={size} color={color} />
            ),
          }}
        />

      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}

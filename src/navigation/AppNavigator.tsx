import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen';
import SettingsScreen from '../pages/SettingsScreen';
import GeolocationScreen from '../pages/GeolocationScreen';
import DataListScreen from '../pages/DataListScreen';
import DetailScreen from '../pages/DetailScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from 'react-native';

export type DataListStackParamList = {
  DataList: undefined;
  Detail: {pokemonId: number};
};

export type RootTabParamList = {
  Home: undefined;
  DataList: undefined;
  Settings: undefined;
  Geolocation: undefined;
};

export type RootStackParamList = RootTabParamList & DataListStackParamList;

const DataListStack = createNativeStackNavigator<DataListStackParamList>();

const DataListStackScreen = () => {
  return (
    <DataListStack.Navigator>
      <DataListStack.Screen
        name="DataList"
        component={DataListScreen}
        options={{title: 'Pokemons'}}
      />
      <DataListStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{title: 'Details'}}
      />
    </DataListStack.Navigator>
  );
};

const HomeIcon = () => <Text>🏠</Text>;
const DataListIcon = () => <Text>📋</Text>;
const SettingsIcon = () => <Text>⚙️</Text>;
const GeolocationIcon = () => <Text>📍</Text>;

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="DataList"
        component={DataListStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: DataListIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: SettingsIcon,
        }}
      />
      <Tab.Screen
        name="Geolocation"
        component={GeolocationScreen}
        options={{
          tabBarIcon: GeolocationIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

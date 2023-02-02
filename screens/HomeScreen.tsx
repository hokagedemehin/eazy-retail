import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CounterScreen from './Authenticated/CounterScreen';
import SalesScreen from './Authenticated/SalesScreen';
import ProfileScreen from './Authenticated/ProfileScreen';
import MoreScreen from './Authenticated/MoreScreen';

const BottomTab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='CounterPage'
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name='CounterPage'
        component={CounterScreen}
        options={{
          tabBarLabel: 'Counter',
        }}
      />
      <BottomTab.Screen
        name='SalesPage'
        component={SalesScreen}
        options={{
          tabBarLabel: 'Sales',
        }}
      />
      <BottomTab.Screen
        name='InventoryPage'
        component={SalesScreen}
        options={{
          tabBarLabel: 'Inventory',
        }}
      />
      <BottomTab.Screen
        name='ProfilePage'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
      <BottomTab.Screen
        name='MorePage'
        component={MoreScreen}
        options={{
          tabBarLabel: 'More',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default HomeScreen;

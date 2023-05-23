import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CounterScreen from './Authenticated/CounterScreen';
import SalesScreen from './Authenticated/SalesScreen';
import ProfileScreen from './Authenticated/ProfileScreen';
import MoreScreen from './Authenticated/MoreScreen';
import {
  CounterSvgComponent,
  MoreSvgComponent,
  ProductsSvgComponent,
  SalesSvgComponent,
  UserSvgComponent,
} from '@/assets/icons';
import Colors from '@/constants/Colors';
import InventoryScreen from './Authenticated/InventoryScreen';
import { useAppSelector } from '../hooks/redux';

const BottomTab = createBottomTabNavigator();

const HomeScreen = () => {
  const parentName = useAppSelector((state) => state.hideTabs.parentName);

  return (
    <BottomTab.Navigator
      initialRouteName='CounterPage'
      screenOptions={{
        headerShown: false,
        // increase the height of the tab bar
        tabBarStyle: {
          height: 60,
          paddingBottom: 7,
          backgroundColor: Colors['white'],
        },
      }}
    >
      <BottomTab.Screen
        name='CounterPage'
        component={CounterScreen}
        options={{
          tabBarLabel: 'Counter',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Givonic-Regular',
          },
          tabBarIcon: ({ focused }) => (
            <CounterSvgComponent
              fill={focused ? Colors['activeTab'] : Colors['inactiveTab']}
            />
          ),
          tabBarActiveTintColor: Colors['activeTab'],
          tabBarStyle: {
            height: 60,
            paddingBottom: 7,
            backgroundColor: Colors['white'],
            display: parentName === 'hideScreen' ? 'none' : 'flex',
          },
        }}
      />
      <BottomTab.Screen
        name='SalesPage'
        component={SalesScreen}
        options={{
          tabBarLabel: 'Sales',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Givonic-Regular',
          },
          tabBarIcon: ({ focused }) => (
            <SalesSvgComponent
              fill={focused ? Colors['activeTab'] : Colors['inactiveTab']}
            />
          ),
          tabBarActiveTintColor: Colors['activeTab'],
          tabBarStyle: {
            height: 60,
            paddingBottom: 7,
            backgroundColor: Colors['white'],
            display: parentName === 'hideScreen' ? 'none' : 'flex',
          },
        }}
      />
      <BottomTab.Screen
        name='InventoryPage'
        component={InventoryScreen}
        options={{
          tabBarLabel: 'Inventory',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Givonic-Regular',
          },
          tabBarIcon: ({ focused }) => (
            <ProductsSvgComponent
              fill={focused ? Colors['activeTab'] : Colors['inactiveTab']}
            />
          ),
          tabBarActiveTintColor: Colors['activeTab'],
          tabBarStyle: {
            height: 60,
            paddingBottom: 7,
            backgroundColor: Colors['white'],
            display: parentName === 'hideScreen' ? 'none' : 'flex',
          },
        }}
      />
      <BottomTab.Screen
        name='ProfilePage'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Givonic-Regular',
          },
          tabBarIcon: ({ focused }) => (
            <UserSvgComponent
              fill={focused ? Colors['activeTab'] : Colors['inactiveTab']}
            />
          ),
          tabBarActiveTintColor: Colors['activeTab'],
          tabBarStyle: {
            height: 60,
            paddingBottom: 7,
            backgroundColor: Colors['white'],
            display: parentName === 'hideScreen' ? 'none' : 'flex',
          },
        }}
      />
      <BottomTab.Screen
        name='MorePage'
        component={MoreScreen}
        options={{
          tabBarLabel: 'More',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Givonic-Regular',
          },
          tabBarIcon: ({ focused }) => (
            <MoreSvgComponent
              fill={focused ? Colors['activeTab'] : Colors['inactiveTab']}
            />
          ),
          tabBarActiveTintColor: Colors['activeTab'],
          tabBarStyle: {
            height: 60,
            paddingBottom: 7,
            backgroundColor: Colors['white'],
            display: parentName === 'hideScreen' ? 'none' : 'flex',
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default HomeScreen;

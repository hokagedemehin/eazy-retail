import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllSaleScreen from './AllSaleScreen';
import CompletedSaleScreen from './CompletedSaleScreen';
import PendingSaleScreen from './PendingSaleScreen';

const SalesTab = createMaterialTopTabNavigator();

const TodaySales = () => {
  return (
    <SalesTab.Navigator>
      <SalesTab.Screen name='AllSale' component={AllSaleScreen} />
      <SalesTab.Screen name='CompletedSale' component={CompletedSaleScreen} />
      <SalesTab.Screen name='PendingSale' component={PendingSaleScreen} />
    </SalesTab.Navigator>
  );
};

export default TodaySales;

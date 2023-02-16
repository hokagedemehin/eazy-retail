import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryHome from '../inventory/InventoryHome';
import AddProductScreen from '../inventory/NewProductScreen';

const InventoryStack = createNativeStackNavigator();

const InventoryScreen = () => {
  return (
    <InventoryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <InventoryStack.Screen name='InventoryHome' component={InventoryHome} />
      <InventoryStack.Screen name='AddProduct' component={AddProductScreen} />
    </InventoryStack.Navigator>
  );
};

export default InventoryScreen;

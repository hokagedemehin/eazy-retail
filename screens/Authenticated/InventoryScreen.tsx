import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryHome from '../inventory/InventoryHome';
import AddProductScreen from '../inventory/AddProductScreen';
import AddCategoryScreen from '../inventory/category/AddCategoryScreen';

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
      {/* <InventoryStack.Screen name='EditProduct' component={EditProductScreen} /> */}
      <InventoryStack.Screen name='AddCategory' component={AddCategoryScreen} />
      {/* <InventoryStack.Screen name='EditCategory' component={EditCategoryScreen} /> */}
    </InventoryStack.Navigator>
  );
};

export default InventoryScreen;

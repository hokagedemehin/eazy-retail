import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryHome from '@/screens/inventory/InventoryHome';
import AddProductScreen from '@/screens/inventory/AddProductScreen';
import AddCategoryScreen from '@/screens/inventory/category/AddCategoryScreen';
import AddVariantScreen from '@/screens/inventory/AddVariantScreen';
import BarcodeScannerScreen from '@/screens/inventory/BarcodeScannerScreen';

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
      <InventoryStack.Screen name='AddVariant' component={AddVariantScreen} />
      <InventoryStack.Screen
        name='AddBarcodeScanner'
        component={BarcodeScannerScreen}
      />
    </InventoryStack.Navigator>
  );
};

export default InventoryScreen;

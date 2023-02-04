import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Counter from '../counter/Counter';
import CounterProduct from '../counter/CounterProduct';
import NewProduct from '../counter/NewProduct';

const CounterStack = createNativeStackNavigator();

const CounterScreen = () => {
  return (
    <CounterStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CounterStack.Screen name='Counter' component={Counter} />
      <CounterStack.Screen name='CounterProduct' component={CounterProduct} />
      <CounterStack.Screen name='NewProduct' component={NewProduct} />
    </CounterStack.Navigator>
  );
};

export default CounterScreen;

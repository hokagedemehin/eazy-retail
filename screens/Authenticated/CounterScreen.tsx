import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Counter from '../counter/Counter';
import CounterProduct from '../counter/CounterProduct';
import NewSale from '../counter/NewSale';
import ConfirmSaleComp from '../counter/ConfirmSale';
import CashPaymentScreen from '../counter/CashPaymentScreen';
import CardPaymentScreen from '../counter/CardPaymentScreen';
import CreditPaymentScreen from '../counter/CreditPaymentScreen';
import SaleSuccessScreen from '../counter/SaleSuccessScreen';

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
      <CounterStack.Screen name='NewSale' component={NewSale} />
      <CounterStack.Screen name='ConfirmSale' component={ConfirmSaleComp} />
      <CounterStack.Screen name='CashPayment' component={CashPaymentScreen} />
      <CounterStack.Screen name='CardPayment' component={CardPaymentScreen} />
      <CounterStack.Screen
        name='CreditPayment'
        component={CreditPaymentScreen}
      />
      <CounterStack.Screen name='SaleSuccess' component={SaleSuccessScreen} />
    </CounterStack.Navigator>
  );
};

export default CounterScreen;

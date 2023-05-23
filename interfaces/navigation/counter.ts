import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps, RouteProp } from '@react-navigation/native';
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { RootInventoryStackParamList } from './inventory';



export type RootCounterStackParamList = {
  Counter: undefined;
  CounterProduct: { id: string | number };
  NewSale: undefined;
  ConfirmSale: undefined;
  CashPayment: undefined;
  CardPayment: undefined;
  CreditPayment: undefined;
  SaleSuccess: undefined;
};

export type RootCounterTabParamList = {
  ProductScreen: undefined;
  CustomersScreen: undefined;
}

export type CounterStackScreenProps<T extends keyof RootCounterStackParamList> = NativeStackScreenProps<RootCounterStackParamList, T>;

export type CounterProductsProps = NativeStackScreenProps<RootCounterStackParamList, 'CounterProduct'>;

export type CounterNewSaleProps = NativeStackScreenProps<RootCounterStackParamList, 'NewSale'>;

// export type CounterConfirmSaleProps = NativeStackScreenProps<RootCounterStackParamList, 'ConfirmSale'>;

export type CounterConfirmSaleProps<T extends keyof RootCounterStackParamList, K extends keyof RootInventoryStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<RootCounterStackParamList, T>,
  NativeStackScreenProps<RootInventoryStackParamList, K>
>

export type CounterScreenProps = NativeStackScreenProps<RootCounterStackParamList, 'Counter'>;

export type ProductScreenProps =
  CompositeScreenProps<
    MaterialTopTabScreenProps<RootCounterTabParamList, 'ProductScreen'>,
    // CounterStackScreenProps<keyof RootCounterStackParamList>
    NativeStackScreenProps<RootCounterStackParamList>
  >;

  export type ProductNavigation = {
    navigation: ProductScreenProps['navigation']
  }

  export type CounterProductsNavigation = {
    navigation: CounterProductsProps['navigation'],
  }

  export type CounterNewSaleNavigation = {
    navigation: CounterNewSaleProps['navigation'],
  }

  // export type CounterConfirmSaleNavigation = {
  //   navigation: CounterConfirmSaleProps['navigation'],
  // }

  export type CounterScreenNavigation = {
    navigation: CounterScreenProps['navigation'],
  }

  export type CounterProductsRoute = RouteProp<RootCounterStackParamList, 'CounterProduct'>;


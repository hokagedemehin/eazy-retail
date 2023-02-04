/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */

// import type {
//   CompositeScreenProps,
//   NavigatorScreenParams,
// } from '@react-navigation/native';

// import type { StackScreenProps } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps, RouteProp } from '@react-navigation/native';
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';



export type RootStackParamList = {
  // Home: NavigatorScreenParams<HomeTabParamList>;
  // PostDetails: { id: string };
  // NotFound: undefined;
  Onboarding: undefined;
  SignUp: undefined;
  SignIn: undefined;
  BusinessName: undefined;
  BusinessLocation: undefined;
  SelectIndustry: undefined;
  RegistrationSuccessfull: undefined;
  Home: undefined;
  // ForgotPassword: undefined;
  // ResetPassword: undefined;
};



// export type RootStackProps = NativeStackScreenProps<RootStackParamList>;

export type OnboardingProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export type BusinessNameProps = NativeStackScreenProps<RootStackParamList, 'BusinessName'>;

export type BusinessLocationProps = NativeStackScreenProps< RootStackParamList, 'BusinessLocation'>;

export type IndustryProps = NativeStackScreenProps<RootStackParamList, 'SelectIndustry'>;

export type RegistrationSuccessfullProps = NativeStackScreenProps<RootStackParamList, 'RegistrationSuccessfull'>;

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
NativeStackScreenProps<RootStackParamList, T>;

export type CounterStackScreenProps<T extends keyof RootCounterStackParamList> = NativeStackScreenProps<RootCounterStackParamList, T>;

export type RootCounterStackParamList = {
  Counter: undefined;
  CounterProduct: { id: string };
  NewProduct: undefined;
};

export type RootCounterTabParamList = {
  ProductScreen: undefined;
  CustomersScreen: undefined;
}

export type CounterProductsProps = NativeStackScreenProps<RootCounterStackParamList, 'CounterProduct'>;

export type CounterNewProductProps = NativeStackScreenProps<RootCounterStackParamList, 'NewProduct'>;

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

  export type CounterNewProductNavigation = {
    navigation: CounterNewProductProps['navigation'],
  }

  export type CounterScreenNavigation = {
    navigation: CounterScreenProps['navigation'],
  }

  export type CounterProductsRoute = RouteProp<RootCounterStackParamList, 'CounterProduct'>;

  // export type combined = CounterProductsNavigation & CounterProductsRoute;


// export type CounterProductsProps = CompositeScreenProps<
//   MaterialTopTabScreenProps<RootCounterTabParamList, 'ProductScreen'>,
//   NativeStackScreenProps<RootCounterStackParamList>
// >

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootCounterStackParamList {}
  }
}

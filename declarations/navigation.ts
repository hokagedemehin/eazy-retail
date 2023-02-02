/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */

// import type {
//   CompositeScreenProps,
//   NavigatorScreenParams,
// } from '@react-navigation/native';

// import type { StackScreenProps } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

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

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


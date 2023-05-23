import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import { rootUnauthStackParamList } from './unAuth';

export type RootProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
};

export type ProfileHomeProps<T extends keyof RootProfileStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<RootProfileStackParamList, T>,
  NativeStackScreenProps<rootUnauthStackParamList>
>

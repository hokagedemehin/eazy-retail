import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export type RootInventoryStackParamList = {
  InventoryHome: undefined;
  AddProduct: undefined;
};

export type RootProductsCategoryPageTabParamList = {
  AllProducts: undefined;
  LowStockProducts: undefined;
  ExpiredProducts: undefined;
};

export type InventoryHomeProps = NativeStackScreenProps<RootInventoryStackParamList, 'InventoryHome'>;

export type AddProductProps = NativeStackScreenProps<RootInventoryStackParamList, 'AddProduct'>;

export type ProductsCategoryScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<RootProductsCategoryPageTabParamList, 'AllProducts'>,
  NativeStackScreenProps<RootInventoryStackParamList>
>;

export type InventoryHomeNavigation = {
  navigation: InventoryHomeProps['navigation'];
}

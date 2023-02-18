import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export type RootInventoryStackParamList = {
  InventoryHome: undefined;
  AddProduct: undefined;
  AddCategory: undefined;
};

export type RootInventoryHomeTabParamList = {
  AllProductList: undefined;
  AllCategoryList: undefined;
};

export type RootAllProductListTabParamList = {
  AllProducts: undefined;
  LowStockProducts: undefined;
  ExpiredProducts: undefined;
};

export type InventoryHomeProps = NativeStackScreenProps<RootInventoryStackParamList, 'InventoryHome'>;

export type AddProductProps = NativeStackScreenProps<RootInventoryStackParamList, 'AddProduct'>;

export type AddProductOrCategoryProps<T extends keyof RootInventoryStackParamList> = NativeStackScreenProps<RootInventoryStackParamList, T>;

export type AllProductListProps<T extends keyof RootAllProductListTabParamList> = CompositeScreenProps<
  MaterialTopTabScreenProps<RootAllProductListTabParamList, T>,
  NativeStackScreenProps<RootInventoryStackParamList>
>;

export type AllCategoryListProps = CompositeScreenProps<
  MaterialTopTabScreenProps<RootInventoryHomeTabParamList, 'AllCategoryList'>,
  NativeStackScreenProps<RootInventoryStackParamList>
>;

// export type AllProductListProps = CompositeScreenProps<
//   MaterialTopTabScreenProps<RootAllProductListTabParamList, 'AllProducts'>,

// export type ProductsCategoryScreenProps = CompositeScreenProps<
//   MaterialTopTabScreenProps<RootProductsCategoryPageTabParamList, 'AllProducts'>,
//   NativeStackScreenProps<RootInventoryStackParamList>
// >;

export type InventoryHomeNavigation = {
  navigation: InventoryHomeProps['navigation'];
}

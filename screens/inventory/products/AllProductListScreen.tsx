import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import EmptyListComponent from '@/components/EmptyList/EmptyList';
import { Button } from '@rneui/themed';
import { allProductsList } from '@/data/dummy_data';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllProductList from './AllProductList';
import LowStockList from './LowStockList';
import ExpiringList from './ExpiredList';
// import { InventoryHomeNavigation } from '@/interfaces/navigation/inventory';

type IProductTypes = Array<{
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  expiring_date: string;
}>;

const ProductsTab = createMaterialTopTabNavigator();

const AllProductListScreen = () => {
  const [productsCheck, setProductsCheck] = useState<IProductTypes>([]);

  useEffect(() => {
    const newData = [] as IProductTypes;
    allProductsList.forEach((product) => {
      newData.push(product);
    });
    setProductsCheck(newData);
    return () => {
      setProductsCheck([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.container}>
        {productsCheck.length === 0 && (
          <View style={styles.emptyPageWrapper}>
            <EmptyListComponent message='Inventory is empty' />
            <Button
              type='solid'
              title={`Add Item`}
              onPress={() => console.log('pressed')}
              // onPress={() => navigation.navigate('AddProduct')}
              radius={10}
              buttonStyle={{
                backgroundColor: Colors['black'],
                marginHorizontal: 20,
              }}
              size='lg'
            />
          </View>
        )}
        {productsCheck.length > 0 && (
          <View style={styles.productListWrapper}>
            <ProductsTab.Navigator
              screenOptions={{
                tabBarIndicatorStyle: {
                  backgroundColor: Colors['black'],
                  width: 40,
                  marginLeft: 25,
                },
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontFamily: 'Givonic-SemiBold',
                  textTransform: 'none',
                },
                tabBarItemStyle: {
                  width: 90,
                  // height
                  // borderWidth: 1,
                },
                tabBarPressColor: Colors['transparent'],
                tabBarStyle: {
                  backgroundColor: Colors['background'],
                  height: 42,
                  elevation: 0,
                },
              }}
            >
              <ProductsTab.Screen
                name='AllProducts'
                component={AllProductList}
                options={{
                  tabBarLabel: 'All',
                }}
              />
              <ProductsTab.Screen
                name='LowStockProducts'
                component={LowStockList}
                options={{
                  tabBarLabel: 'Low Stock',
                }}
              />
              <ProductsTab.Screen
                name='ExpiringProducts'
                component={ExpiringList}
                options={{
                  tabBarLabel: 'Expiring',
                }}
              />
            </ProductsTab.Navigator>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AllProductListScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? 10 : 10,
    backgroundColor: Colors['white'],
  },
  container: {
    flex: 1,
    backgroundColor: Colors['background'],
  },
  emptyPageWrapper: {
    flex: 1,
    paddingTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  productListWrapper: {
    flex: 1,
    // paddingTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  content: {
    position: 'relative',
    width: '45%',
    // height: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors['white'],
    marginBottom: 20,
    marginHorizontal: 10,
  },
  imageContainer: {
    // width: 170,
    // height: 170,
    // overflow: 'hidden',
  },
  image: {
    width: 200,
    height: 150,
    // resizeMode: 'contain',
  },
  namePriceWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors['white'],
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // borderWidth: 1,
    // height: 70,
    width: '100%',
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['black'],
    // borderWidth: 1,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['black'],
  },
  outOfStock: {
    fontSize: 12,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['red'],
    textAlign: 'right',
  },
  oneLeft: {
    fontSize: 12,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['orange'],
    textAlign: 'right',
  },

  // ****************** add new product card ******************
  addProductcontent: {
    width: '45%',
    // borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors['newSale'],
    marginBottom: 20,
    marginHorizontal: 10,
  },
  addCard: {
    width: '100%',
    height: 205,
    // height: '15%',
    // paddingVertical: 50,
    backgroundColor: Colors['newSale'],
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  addCardBtn: {
    width: 60,
    height: 60,
    backgroundColor: Colors['newSaleBtn'],
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCardText: {
    // width: 100,
    height: 20,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 10,
  },
  addCardTextContent: {
    fontSize: 16,
    fontFamily: 'Givonic-Bold',
    color: '#000',
    textAlign: 'center',
  },
});

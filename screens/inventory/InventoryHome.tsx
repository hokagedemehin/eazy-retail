import React from 'react';
import Colors from '@/constants/Colors';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import AllCategoryPage from './AllCategoryPage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllProductListScreen from './products/AllProductListScreen';
import AllCategoryListScreen from './category/AllCategoryListScreen';

const ProductCategoryTab = createMaterialTopTabNavigator();

const InventoryHome = () => {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerText}>Inventory</Text>
          </View>
        </View>
        <View style={styles.navigationWrapper}>
          <ProductCategoryTab.Navigator
            screenOptions={{
              tabBarStyle: {
                elevation: 0,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              },
              tabBarPressColor: Colors['transparent'],
              // tabBarPressOpacity: 1,
            }}
          >
            <ProductCategoryTab.Screen
              name='AllProductList'
              component={AllProductListScreen}
              options={{
                tabBarIndicator: () => null,
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={
                      focused ? styles.activeTabLabel : styles.inactiveTabLabel
                    }
                  >
                    Products
                  </Text>
                ),
              }}
            />
            <ProductCategoryTab.Screen
              name='AllCategoryList'
              component={AllCategoryListScreen}
              options={{
                tabBarIndicator: () => null,
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={
                      focused ? styles.activeTabLabel : styles.inactiveTabLabel
                    }
                  >
                    Category
                  </Text>
                ),
              }}
            />
          </ProductCategoryTab.Navigator>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InventoryHome;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 10,
    backgroundColor: Colors['white'],
  },
  container: {
    flex: 1,
    backgroundColor: Colors['background'],
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: Colors['white'],
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  navigationWrapper: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    // fontWeight: 'bold',
    color: Colors['black'],
    fontFamily: 'Givonic-Bold',
  },
  activeTabLabel: {
    fontSize: 18,
    fontFamily: 'Givonic-SemiBold',
    textTransform: 'none',
    backgroundColor: Colors['activeFilter'],
    width: 170,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    color: Colors['white'],
    textAlign: 'center',
    // borderWidth: 1,
  },
  inactiveTabLabel: {
    fontSize: 18,
    fontFamily: 'Givonic-SemiBold',
    textTransform: 'none',
    backgroundColor: Colors['white'],
    width: 170,
    textAlign: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    color: Colors['black'],
    // borderWidth: 1,
  },
  // sectionsButtonWrapper: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   marginTop: 10,
  // },
  // sectionBtn: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 40,
  //   borderRadius: 50,
  //   // backgroundColor: Colors['activeFilter'],
  //   // overflow: 'hidden',
  //   // elevation: 2,
  // },
  // activeSectionBtn: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 40,
  //   borderRadius: 50,
  //   backgroundColor: Colors['activeFilter'],
  //   // overflow: 'hidden',
  //   // elevation: 2,
  // },
  // btnText: {
  //   color: Colors['black'],
  //   fontFamily: 'Givonic-SemiBold',
  // },
  // activeBtnText: {
  //   color: Colors['white'],
  //   fontFamily: 'Givonic-SemiBold',
  // },
});

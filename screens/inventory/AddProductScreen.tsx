import {
  // Keyboard,
  KeyboardAvoidingView,
  Platform,
  // Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { getParentName } from '@/store/slice/hideTabsSlice';
import HeaderComponent from '@/components/Header/HeaderComponent';
import { AddProductProps } from '@/interfaces/navigation/inventory';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddSimpleProductScreen from './AddSimpleProduct';
import AddAdvanceProductScreen from './AddAdvanceProduct';
import Colors from '@/constants/Colors';

const AddProductTab = createMaterialTopTabNavigator();

const AddProductScreen = ({
  navigation,
}: Omit<AddProductProps<'AddProduct'>, 'route'>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getParentName('hideScreen'));
    return () => {
      dispatch(getParentName(''));
    };
  }, [dispatch]);

  // ****************** GO BACK ******************
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={styles.container}
      // contentContainerStyle={styles.contentContainer}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        // onPress={() => Keyboard.dismiss()}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <HeaderComponent title='Add Product' handleBack={handleBack} />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <AddProductTab.Navigator
            screenOptions={{
              tabBarStyle: {
                elevation: 0,
                backgroundColor: Colors['chipText'],
                borderRadius: 5,
                // borderBottomLeftRadius: 20,
                // borderBottomRightRadius: 20,
              },
              tabBarPressColor: Colors['transparent'],
              // tabBarPressOpacity: 1,
            }}
          >
            <AddProductTab.Screen
              name='AddSimpleProduct'
              component={AddSimpleProductScreen}
              options={{
                tabBarIndicator: () => null,
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={
                      focused ? styles.activeTabLabel : styles.inactiveTabLabel
                    }
                  >
                    Simple
                  </Text>
                ),
              }}
            />
            <AddProductTab.Screen
              name='AddAdvancedProduct'
              component={AddAdvanceProductScreen}
              options={{
                tabBarIndicator: () => null,
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={
                      focused ? styles.activeTabLabel : styles.inactiveTabLabel
                    }
                  >
                    Advanced
                  </Text>
                ),
              }}
            />
          </AddProductTab.Navigator>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // backgroundColor: Colors['background'],
  },
  contentContainer: {
    // paddingTop: 15,
    justifyContent: 'space-between',
  },
  header: {
    // marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  activeTabLabel: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    textTransform: 'none',
    backgroundColor: Colors['chipBackground'],
    width: 150,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    color: Colors['chipText'],
    textAlign: 'center',
    // borderWidth: 1,
  },
  inactiveTabLabel: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    textTransform: 'none',
    backgroundColor: Colors['transparent'],
    width: 150,
    textAlign: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    color: Colors['white'],
    // borderWidth: 1,
  },
});

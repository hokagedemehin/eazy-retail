import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { Avatar, Icon } from '@rneui/themed';
import { IconButton, TouchableRipple } from 'react-native-paper';
import {
  InActiveNotificationBellSvgComponent,
  SettingsSvgComponent,
} from '@/assets/icons';
import Colors from '@/constants/Colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductScreen from './ProductScreen';
import CustomersScreen from './CustomersScreen';
import { CounterScreenNavigation } from '@/interfaces/navigation/counter';
// import { useAppSelector } from '@/hooks/redux';
import { useGetUser } from '@/hooks/auth';
// import Constants from 'expo-constants';
// import * as Linking from 'expo-linking';

const SalesTab = createMaterialTopTabNavigator();

const Counter = ({ navigation }: CounterScreenNavigation) => {
  const checkGreetings = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return 'Good Morning';
    } else if (hours >= 12 && hours <= 17) {
      return 'Good Afternoon';
    } else if (hours >= 17 && hours <= 24) {
      return 'Good Evening';
    }
  };
  const { userData } = useGetUser();
  // const { user } = useAppSelector((state) => state.user);

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.container}>
        <View>
          <View style={styles.headerContainer}>
            <View style={styles.avatarName}>
              <Avatar
                size={50}
                rounded
                source={{
                  uri: 'https://res.cloudinary.com/dnc04r7sc/image/upload/v1675388092/profile_so3odg.png',
                }}
              />
              <View style={styles.nameGreetings}>
                <Text style={styles.greetings}>
                  {checkGreetings()}, {''}
                </Text>
                <Text numberOfLines={1} style={styles.name}>
                  {userData?.firstname}
                </Text>
              </View>
            </View>
            <View style={styles.bellSettings}>
              <View style={styles.bell}>
                <IconButton
                  icon={() => <InActiveNotificationBellSvgComponent />}
                  // color='#000'
                  size={15}
                  onPress={() => console.log('Pressed')}
                />
              </View>
              <View style={styles.settings}>
                <IconButton
                  icon={() => <SettingsSvgComponent />}
                  // color='#000'
                  size={15}
                  onPress={() => console.log('Pressed')}
                />
              </View>
            </View>
          </View>
          {/* <View style={styles.verificationContainer}>
            <View style={styles.verificationBtns}>
              <TouchableRipple
                onPress={() => console.log('Pressed')}
                style={styles.verificationCard}
              >
                <Text style={styles.verificationText}>
                  Verify email address
                </Text>
              </TouchableRipple>
            </View>
            <View style={styles.verificationPhoneBtns}>
              <TouchableRipple
                style={styles.verificationCard}
                onPress={() => console.log('Pressed')}
              >
                <Text style={styles.verificationText}>Verify phone number</Text>
              </TouchableRipple>
            </View>
          </View> */}
        </View>
        <View style={styles.cardContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableRipple
              // onPress={() => console.log('Pressed')}
              onPress={() => navigation.navigate('NewSale')}
              rippleColor={Colors['white']}
              style={styles.addCard}
            >
              <>
                <View style={styles.addCardBtn}>
                  <Icon name='add' size={40} color={Colors['white']} />
                </View>
                <View style={styles.addCardText}>
                  <Text style={styles.addCardTextContent}>Add New Sale</Text>
                </View>
              </>
            </TouchableRipple>
            <View>
              <ImageBackground
                source={require('@/assets/icons/counter_page/cardBackground.png')}
                style={styles.totalSaleBackGround}
              >
                <Text style={styles.totalSaleCardHeaderText}>
                  Today&apos;s Total Sales
                </Text>
                <Text style={styles.totalSaleCardContentText}>&#8358;0</Text>
                <TouchableRipple
                  onPress={() => console.log('Pressed')}
                  rippleColor={Colors['white']}
                  style={styles.totalSaleCardBtn}
                >
                  <View style={styles.totalSalesCardBtnContent}>
                    <Text style={styles.totalSaleCardBtnText}>Learn More</Text>
                    <Icon
                      name='chevron-right'
                      size={20}
                      // type='octicon'
                      color={Colors['white']}
                      style={styles.totalSaleCardBtnIcon}
                    />
                  </View>
                </TouchableRipple>
              </ImageBackground>
            </View>
          </ScrollView>
        </View>
        <View style={styles.salesTabContainer}>
          <View style={styles.salesTabHeader}>
            <Text style={styles.salesTabHeaderText}>Today&apos;s Sales</Text>
          </View>
          <View style={styles.salesTabWrapper}>
            <SalesTab.Navigator
              screenOptions={{
                tabBarIndicatorStyle: {
                  backgroundColor: Colors['black'],
                  width: 50,
                  marginLeft: 35,
                },
                tabBarLabelStyle: {
                  fontSize: 16,
                  fontFamily: 'Givonic-SemiBold',
                  textTransform: 'none',
                },
                tabBarItemStyle: {
                  width: 120,
                  // borderWidth: 1,
                },
                tabBarPressColor: Colors['transparent'],
              }}
            >
              <SalesTab.Screen
                name='ProductScreen'
                component={ProductScreen}
                options={{
                  tabBarLabel: 'Products',
                }}
              />
              <SalesTab.Screen
                name='Customers'
                component={CustomersScreen}
                options={{
                  tabBarLabel: 'Customers',
                }}
              />
            </SalesTab.Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Counter;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 10,
    backgroundColor: Colors['background'],
  },
  container: {
    flex: 1,
    // marginTop: 30,
    // marginHorizontal: 15,
  },
  // ***************** Header Styles *****************
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  avatarName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameGreetings: {
    marginLeft: 10,
  },
  greetings: {
    fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    color: '#000',
  },
  name: {
    fontSize: 17,
    fontFamily: 'Hubhead',
    color: '#000',
    // borderWidth: 1,
    width: 150,
  },
  bellSettings: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
  },
  bell: {
    // marginRight: 5,
    // borderWidth: 1,
  },
  settings: {
    // borderWidth: 1,
  },

  verificationContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 10,
  },
  verificationBtns: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  verificationPhoneBtns: {
    borderRadius: 20,
    marginLeft: 10,
    overflow: 'hidden',
  },
  verificationCard: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  verificationText: {
    fontSize: 14,
    fontFamily: 'Givonic-Bold',
    color: '#000',
    textAlign: 'center',
  },

  // ***************** Add New Sale Card Styles *****************
  cardContainer: {
    // borderWidth: 1,
    marginTop: 20,
  },
  addCard: {
    width: 200,
    height: 180,
    // paddingVertical: 30,
    // paddingHorizontal: 40,
    backgroundColor: Colors['newSale'],
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 15,
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
  totalSaleCard: {
    width: 300,
    height: 180,
    // backgroundColor: Colors['totalSale'],
    borderRadius: 10,
    overflow: 'hidden',
    // marginRight: 15,
    paddingLeft: 20,
    paddingTop: 30,
    // borderWidth: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  totalSaleBackGround: {
    width: 300,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 20,
    paddingLeft: 25,
    paddingTop: 30,
    // borderWidth: 1,
  },
  totalSaleCardHeaderText: {
    fontSize: 16,
    fontFamily: 'Givonic-Bold',
    color: '#fff',
    // textAlign: 'center',
  },
  totalSaleCardContentText: {
    fontSize: 30,
    fontFamily: 'Givonic-Bold',
    color: '#fff',
    marginTop: 5,
    // textAlign: 'center',
  },

  totalSaleCardBtn: {
    paddingVertical: 10,
    // paddingHorizontal: 20,
    width: 100,
    marginTop: 25,
  },
  totalSalesCardBtnContent: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  totalSaleCardBtnText: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
  totalSaleCardBtnIcon: {
    // marginLeft: 5,
  },

  // ***************** Today's Sales Tab Styles *****************
  salesTabContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderWidth: 1,
  },
  salesTabHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    // borderWidth: 1,
  },
  salesTabHeaderText: {
    fontSize: 20,
    fontFamily: 'Givonic-Bold',
    color: '#000',
  },
  salesTabWrapper: {
    // marginTop: 20,
    flexGrow: 1,
    // height: '100%',
    // borderWidth: 1,
  },
});

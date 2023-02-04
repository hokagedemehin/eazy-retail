import LoadingComp from '../components/Loading/LoadingComp';
import React, { useEffect, useState } from 'react';
import {
  // Platform,
  SafeAreaView,
  // StatusBar,
  StyleSheet,
  View,
} from 'react-native';
// import OnboardingComp from '../components/Onboarding/Onboarding';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
// import { useAppDispatch } from '../hooks/redux';
import { setOnBoarded, setToken } from '../store/slice/tokenSlice';
import * as SecureStore from 'expo-secure-store';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import { RootStackParamList } from '../interfaces/navigation';
// import Colors from '../constants/Colors';
// import AppIntroSlider from 'react-native-app-intro-slider';
import OnboardingComp from '../components/Onboarding/Onboarding';
import BusinessLocationScreen from './BusinessLocationScreen';
import IndustryScreen from './IndustryScreen';
import RegistrationSuccessfullScreen from './RegistrationSuccessfullScreen';
import HomeScreen from './HomeScreen';
import BusinessNameScreen from './BusinessNameScreen';
// import { useNavigation } from '@react-navigation/native';

const AllScreens = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  // const [onboarded, setOnboarded] = useState(false);
  // const [tokenExist, setTokenExist] = useState(false);
  // const [initialPageName, setInitialPageName] = useState('Onboarding');
  const dispatch = useAppDispatch();
  // const navigation = useNavigation();
  // const token = useAppSelector((state) => state.token.token);
  const onBoarded = useAppSelector((state) => state.token.onBoarded);
  // console.log('token', token);

  // *************** TOKEN SECURE STORAGE ***************
  const getToken = async () => {
    const result = await SecureStore.getItemAsync('token');
    return result;
  };

  // useEffect(() => {
  //   const getTokenFromStorage = async () => {
  //     const token = await getToken();
  //     console.log('token :>> ', token);
  //     if (token) {
  //       dispatch(setToken(token));
  //       setTokenExist(true);
  //     }
  //     // setLoadingPage(false);
  //   };
  //   getTokenFromStorage();
  // }, [dispatch]);

  // *************** ONBOARDING SECURE STORAGE ***************
  const getOnboarding = async () => {
    await SecureStore.deleteItemAsync('onboarding');
    const result = await SecureStore.getItemAsync('onboarding');
    return result;
  };

  // ***** CHECK TOKEN AND ONBOARDING ********
  useEffect(() => {
    const getOnboardingFromStorage = async () => {
      const onboarding = await getOnboarding();
      // console.log('onboarding', onboarding);

      const token = await getToken();
      // console.log('token :>> ', token);

      if (onboarding) {
        dispatch(setOnBoarded(true));
        // setInitialPageName('SignIn');
      }

      if (token) {
        dispatch(setToken(token));
        // setTokenExist(true);
      }
      setLoadingPage(false);
    };
    getOnboardingFromStorage();
  }, [dispatch]);

  // *************** NAVIGATION ***************
  const Stack = createNativeStackNavigator<RootStackParamList>();
  // const placeholder = true;
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.container}>
        {loadingPage && <LoadingComp />}
        {!loadingPage && (
          <Stack.Navigator
            initialRouteName={onBoarded ? 'Onboarding' : 'SignIn'}
          >
            <Stack.Screen
              name='Onboarding'
              component={OnboardingComp}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='BusinessName' component={BusinessNameScreen} />
            <Stack.Screen
              name='BusinessLocation'
              component={BusinessLocationScreen}
            />
            <Stack.Screen name='SelectIndustry' component={IndustryScreen} />
            <Stack.Screen
              name='RegistrationSuccessfull'
              component={RegistrationSuccessfullScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />

            {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} /> */}
          </Stack.Navigator>
        )}
        {/* {!loadingPage && onBoarded && !tokenExist && (
          <Stack.Navigator initialRouteName='SignIn'>
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen
              name='BusinessRegistration'
              component={BusinessLocationScreen}
            />
            <Stack.Screen name='SelectIndustry' component={IndustryScreen} />
            <Stack.Screen
              name='RegistrationSuccessfull'
              component={RegistrationSuccessfullScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        )} */}
        {/* {!loadingPage && onBoarded && tokenExist && (
          <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
          </Stack.Navigator>
        )} */}
      </View>
    </SafeAreaView>
  );
};

export default AllScreens;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    // backgroundColor: Colors.white,
    backgroundColor: 'white',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 15,
  },
  container: {
    flex: 1,
    // paddingTop: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

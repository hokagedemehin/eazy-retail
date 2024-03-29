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
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './UnAuthenticated/SignUpScreen';
import SignInScreen from './UnAuthenticated/SignInScreen';
import { RootStackParamList } from '../interfaces/navigation/navigation';
// import Colors from '../constants/Colors';
// import AppIntroSlider from 'react-native-app-intro-slider';
import OnboardingComp from '../components/Onboarding/Onboarding';
import BusinessLocationScreen from './UnAuthenticated/BusinessLocationScreen';
import IndustryScreen from './UnAuthenticated/IndustryScreen';
import RegistrationSuccessfullScreen from './UnAuthenticated/RegistrationSuccessfullScreen';
import HomeScreen from './HomeScreen';
import BusinessNameScreen from './UnAuthenticated/BusinessNameScreen';
import PhoneVerificationScreen from './UnAuthenticated/PhoneVerification';
// import Subscriptions from './subscriptions/Subscriptions';

// import { useNavigation } from '@react-navigation/native';

const AllScreens = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  // const [tokenValue, setTokenValue] = useState('');
  // const [onboarded, setOnboarded] = useState(false);
  // const [tokenExist, setTokenExist] = useState(false);
  // const [initialPageName, setInitialPageName] = useState('Onboarding');
  const dispatch = useAppDispatch();
  // const navigation = useNavigation();
  // const token = useAppSelector((state) => state.token.token);
  const { onBoarded } = useAppSelector((state) => state.token);

  // *************** TOKEN SECURE STORAGE ***************
  const getToken = async () => {
    const result = await AsyncStorage.getItem('token');
    return result;
  };
  // *************** ONBOARDING SECURE STORAGE ***************
  const getOnboarding = async () => {
    // await AsyncStorage.deleteItemAsync('onboarding');
    const result = await AsyncStorage.getItem('onboarding');
    return result;
  };

  // ***** CHECK TOKEN AND ONBOARDING ********
  useEffect(() => {
    const getOnboardingFromStorage = async () => {
      const onboarding = await getOnboarding();

      const token = await getToken();

      if (onboarding == null) {
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
            <Stack.Screen
              name='SignIn'
              component={SignInScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen
              name='PhoneVerification'
              component={PhoneVerificationScreen}
              options={{
                headerShown: false,
              }}
            />
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

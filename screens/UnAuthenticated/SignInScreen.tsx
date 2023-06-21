import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SignInProps } from '../../interfaces/navigation/navigation';
import Colors from '../../constants/Colors';
import { Button, TextInput, TouchableRipple } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUser, useSignIn } from '@/hooks/auth';
// import axios from 'axios';
// import BaseUrl from '@/utils/BaseUrl';
import { setUser } from '@/store/slice/userSlice';
import { useAppDispatch } from '@/hooks/redux';
import LoadingComp from '@/components/Loading/LoadingComp';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }: SignInProps) => {
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: 'Log In',
  //     headerStyle: {
  //       backgroundColor: Colors['background'],
  //     },
  //     headerTintColor: Colors['grey-900'],
  //     headerTitleStyle: {
  //       fontWeight: '600',
  //       fontSize: 25,
  //       fontFamily: 'Hubhead',
  //     },
  //     headerBackVisible: false,
  //     // headerTitleAlign: 'center',
  //   });
  // }, [navigation]);

  // ****** CHECK FOR USER | REDIRECT TO HOME PAGE ********
  const dispatch = useAppDispatch();
  const [loadingPage, setLoadingPage] = useState(true);
  const toast = useToast();

  const { userData } = useGetUser();

  useEffect(() => {
    // const BACKEND_URL = BaseUrl();

    // const checkUser = async () => {
    //   // try {
    //   //   const result = await AsyncStorage.getItemAsync('token');
    //   //   const data = await axios.get(`${BACKEND_URL}/dj-rest-auth/user/`, {
    //   //     headers: {
    //   //       Authorization: `Bearer ${result}`,
    //   //     },
    //   //   });
    //   //   if (data.data) {
    //   //     dispatch(setUser(data.data));
    //   //     navigation.replace('Home');
    //   //   }
    //   // } catch (error) {
    //   //   // console.error(error);
    //   // }

    // };
    // checkUser();

    if (userData) {
      dispatch(setUser(userData));
      navigation.replace('Home');
    }
    setLoadingPage(false);
  }, [dispatch, navigation, userData]);

  const [showPassword, setShowPassword] = useState(false);
  // const [loadingBtn, setloadingBtn] = useState(false);
  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }

  const [formValue, setFormValue] = useState({
    // username: 'mary',
    email: '',
    password: '',
  });

  // console.log(formValue);

  const handleSignupRedirect = () => {
    navigation.replace('SignUp');
  };

  const handleHomePageRedirect = () => {
    // console.log('Redirect to Home Page');
    navigation.replace('Home');
  };

  const { mutate, isLoading } = useSignIn();

  const handleSignIn = async () => {
    mutate(
      {
        email: formValue.email,
        password: formValue.password,
      },
      {
        onSuccess: async (data) => {
          // console.log(data);
          await AsyncStorage.setItem('token', data.key);
          // await AsyncStorage.setItem('token', data.token);
          handleHomePageRedirect();
        },
        onError: () => {
          toast.show('Invalid Credentials', {
            type: 'danger',
          });
        },
      }
    );
  };

  return (
    <>
      {loadingPage ? (
        <LoadingComp />
      ) : (
        <ScrollView
          contentContainerStyle={styles.containerContent}
          style={styles.container}
        >
          <View>
            <Text style={styles.subtitle}>Welcome back,</Text>
            <Text style={styles.title}>Log In</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                label='Email Address'
                // mode='outlined'
                autoCapitalize='none'
                underlineColor='transparent'
                activeOutlineColor='transparent'
                selectionColor={Colors['activeTab']}
                contentStyle={styles.inputContent}
                value={formValue.email}
                onChangeText={(text) =>
                  setFormValue({ ...formValue, email: text })
                }
                theme={{
                  colors: {
                    primary: Colors['black'],
                    text: Colors['black'],
                    placeholder: Colors['white'],
                    background: Colors['white'],
                    surfaceVariant: Colors['white'],
                  },
                }}
              />
              <View style={styles.hideUnderline}></View>
            </View>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                label='Password'
                underlineColor='transparent'
                activeOutlineColor='transparent'
                selectionColor={Colors['activeTab']}
                contentStyle={styles.inputContent}
                value={formValue.password}
                onChangeText={(text) =>
                  setFormValue({ ...formValue, password: text })
                }
                theme={{
                  colors: {
                    primary: Colors['black'],
                    text: Colors['black'],
                    placeholder: Colors['white'],
                    background: Colors['white'],
                    surfaceVariant: Colors['white'],
                  },
                }}
                secureTextEntry={showPassword ? false : true}
                autoCapitalize='none'
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye' : 'eye-off'}
                    onPress={togglePassword}
                    style={styles.inputIcon}
                    theme={{
                      colors: {
                        primary: Colors['black'],
                        text: Colors['black'],
                        // placeholder: Colors['white'],
                        background: Colors['white'],
                      },
                    }}
                  />
                }
              />
              <View style={styles.hideUnderline}></View>
            </View>
            <View style={styles.forgotPasswordWrapper}>
              <TouchableRipple onPress={() => console.log('Forgot Password?')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableRipple>
            </View>
          </View>
          <View>
            <View style={styles.buttonWrapper}>
              <Button
                mode='contained'
                style={styles.button}
                buttonColor={Colors['black']}
                textColor={Colors['white']}
                accessibilityLabel='Sign Up'
                labelStyle={styles.buttonLabel}
                contentStyle={styles.buttonContent}
                loading={isLoading}
                disabled={
                  isLoading ||
                  formValue.email === '' ||
                  formValue.password === ''
                }
                onPress={() => handleSignIn()}

                // onPress={() => console.log('Sign Up')}
              >
                Log In
              </Button>
            </View>
            <View style={styles.signupAlternativeWrapper}>
              <Text style={styles.signupAlternativeText}>
                Don&apos;t have an account?
              </Text>
              <TouchableRipple
                style={styles.signupAlternativeButton}
                onPress={() => handleSignupRedirect()}
                // onPress={() => console.log('signup')}
              >
                <Text style={styles.signupAlternativeButtonText}>Sign up</Text>
              </TouchableRipple>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['background'],
    paddingHorizontal: 20,
    paddingVertical: 20,
    // borderWidth: 1,
  },
  containerContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['grey-900'],
    marginBottom: 10,
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['grey-900'],
    marginBottom: 20,
  },
  inputWrapper: {
    // marginBottom: 20,
    // paddingTop: 5,
    // paddingBottom: 12,
    // // borderWidth: 1,
    // backgroundColor: Colors['white'],
    // borderRadius: 5,

    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  passwordInputWrapper: {
    // paddingTop: 5,
    // paddingBottom: 12,
    // // borderWidth: 1,
    // backgroundColor: Colors['white'],
    // borderRadius: 5,

    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  input: {
    fontFamily: 'Givonic-SemiBold',
    // borderWidth: 1,
  },
  inputContent: {
    // backgroundColor: 'white',
  },
  hideUnderline: {
    marginTop: -4,
    borderTopWidth: 8,
    borderColor: Colors['white'],
  },
  inputOutline: {
    borderColor: Colors['white'],
  },
  inputIcon: {
    // color: Colors['grey-400'],
  },
  forgotPasswordWrapper: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  forgotPassword: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['grey-700'],
  },
  buttonWrapper: {
    marginTop: 20,
  },
  button: {
    // height: 60,
    borderRadius: 10,
    borderWidth: 1,
    // backgroundColor: Colors['grey-700'],
  },
  buttonContent: {
    // borderWidth: 1,
    height: 50,
  },
  buttonLabel: {
    fontSize: 18,
    fontFamily: 'Givonic-SemiBold',
  },
  signupAlternativeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupAlternativeText: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
  },
  signupAlternativeButton: {
    marginLeft: 10,
  },
  signupAlternativeButtonText: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['grey-700'],
  },
});
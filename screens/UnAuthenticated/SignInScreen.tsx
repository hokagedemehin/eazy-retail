import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SignInProps } from '../../interfaces/navigation/navigation';
import Colors from '../../constants/Colors';
import { Button, TextInput, TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUser, useSignIn } from '@/hooks/auth';
import LoadingComp from '@/components/Loading/LoadingComp';
import { useToast } from 'react-native-toast-notifications';
import { useAppDispatch } from '@/hooks/redux';
import { setUser } from '@/store/slice/userSlice';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import BaseUrl from '@/utils/BaseUrl';

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
  const [loadingPage, setLoadingPage] = useState(false);
  const toast = useToast();

  const { userData } = useGetUser();
  // console.log('userData', userData);
  useEffect(() => {
    async function checkUser() {
      setLoadingPage(true);
      const token = await AsyncStorage.getItem('token');
      // console.log('token', token);
      // const onboarding_progress = await AsyncStorage.getItem(
      //   'easyretail_onboarding'
      // );
      // if (onboarding_progress === 'verification') {
      //   navigation.navigate('PhoneVerification');
      // } else if (onboarding_progress === 'store_creation') {
      //   navigation.navigate('BusinessName');
      // } else
      if (userData?.comapnies?.length === 0) {
        navigation.replace('BusinessName');
        toast.show('Please create your store', {
          type: 'danger',
        });
        return;
      }
      if (token) {
        dispatch(setUser(userData));
        navigation.replace('Home');
      }

      setLoadingPage(false);
    }
    checkUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigation, userData]);

  const [showPassword, setShowPassword] = useState(false);
  // const [loadingBtn, setloadingBtn] = useState(false);
  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }

  // const [formValue, setFormValue] = useState({
  //   // username: 'mary',
  //   email: '',
  //   password: '',
  // });

  // console.log(formValue);

  const handleSignupRedirect = () => {
    navigation.replace('SignUp');
  };

  // const handleHomePageRedirect = () => {
  //   // console.log('Redirect to Home Page');
  //   navigation.replace('Home');
  // };

  const { mutate } = useSignIn();

  // const handleSignIn = async () => {
  //   mutate(
  //     {
  //       email: formValue.email,
  //       password: formValue.password,
  //     },
  //     {
  //       onSuccess: async (data) => {
  //         console.log(data);
  //         await AsyncStorage.setItem('token', data.token);
  //         // await AsyncStorage.setItem('token', data.token);
  //         handleHomePageRedirect();
  //       },
  //       onError: () => {
  //         toast.show('Invalid Credentials', {
  //           type: 'danger',
  //         });
  //       },
  //     }
  //   );
  //   // handleHomePageRedirect();
  // };

  // ************ REACT HOOK FORM ************
  interface IFormInput {
    email: string;
    password: string;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    try {
      mutate(data, {
        onSuccess: async (data) => {
          // const onboarding_progress = await AsyncStorage.getItem(
          //   'easyretail_onboarding'
          // );
          // if (onboarding_progress === 'verification') {
          //   toast.show("You haven't verified your email", {
          //     type: 'danger',
          //   });
          //   navigation.navigate('PhoneVerification');
          // } else if (onboarding_progress === 'store_creation') {
          //   toast.show('Please create your store', {
          //     type: 'danger',
          //   });
          //   navigation.navigate('BusinessName');
          // } else {
          // }
          const BACKEND_URL = BaseUrl();
          const response = await axios.get(`${BACKEND_URL}/user`, {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });
          // console.log('profile data', response?.data);
          if (response?.data?.data?.companies?.length > 0) {
            await AsyncStorage.setItem('token', data.token);
            toast.show('Login successfully', { type: 'success' });
            reset();
            dispatch(setUser(data?.user));
            navigation.replace('Home');
            // console.log(data);
          } else {
            toast.show('Please create your store', {
              type: 'danger',
            });
            navigation.navigate('BusinessName');
          }
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.show(error?.response?.data?.message, {
              type: 'danger',
            });
            console.error(error?.response?.data);
            if (error?.response?.data?.errors?.email) {
              toast.show(error?.response?.data?.errors?.email[0], {
                type: 'danger',
              });
            } else if (error?.response?.data?.errors?.password) {
              toast.show(error?.response?.data?.errors?.password[0], {
                type: 'danger',
              });
            } else {
              toast.show('Something went wrong, Please try again later.', {
                type: 'danger',
              });
            }
          }
        },
      });
    } catch (error) {
      toast.show('Something went wrong, Please try again later.', {
        type: 'danger',
      });
    }
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
            <View>
              {/* email */}
              <View style={styles.inputContainer}>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.email && { borderColor: Colors['red-500'] },
                  ]}
                >
                  <Controller
                    name='email'
                    control={control}
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Email address must be valid',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        label='Email Address'
                        autoCapitalize='none'
                        onBlur={onBlur}
                        keyboardType='email-address'
                        underlineColor='transparent'
                        activeOutlineColor='transparent'
                        selectionColor={Colors['activeTab']}
                        contentStyle={styles.inputContent}
                        value={value}
                        onChangeText={(value) => onChange(value)}
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
                    )}
                  />
                  <View style={styles.hideUnderline}></View>
                </View>
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>
              {/* password */}
              <View style={styles.inputContainer}>
                <View
                  style={[
                    styles.passwordInputWrapper,
                    errors.password && { borderColor: Colors['red-500'] },
                  ]}
                >
                  <Controller
                    name='password'
                    control={control}
                    rules={{
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                        message:
                          'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        label='Password'
                        underlineColor='transparent'
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        activeOutlineColor='transparent'
                        selectionColor={Colors['activeTab']}
                        contentStyle={styles.inputContent}
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
                                background: Colors['white'],
                              },
                            }}
                          />
                        }
                      />
                    )}
                  />

                  <View style={styles.hideUnderline}></View>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                )}
              </View>
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
                // onPress={() => handleSignIn()}
                onPress={handleSubmit(onSubmit)}
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
    // marginBottom: 10,
    // borderRadius: 10,
    // overflow: 'hidden',
    // borderWidth: 0.5,
    // borderColor: Colors['border'],

    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  passwordInputWrapper: {
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
    backgroundColor: 'white',
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
  inputContainer: {
    marginBottom: 15,
  },
  passwordWrapper: {
    marginBottom: 15,
  },
  errorText: {
    color: Colors['red'],
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
  },
});

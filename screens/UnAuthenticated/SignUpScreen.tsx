import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import { SignUpProps } from '../../interfaces/navigation/navigation';
import { Button, TextInput, TouchableRipple } from 'react-native-paper';
import { useSignUp } from '@/hooks/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToast } from 'react-native-toast-notifications';
import { AxiosError } from 'axios';
// import { useAppDispatch } from '@/hooks/redux';
// import { setUser } from '@/store/slice/userSlice';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

const SignUpScreen = ({ navigation }: SignUpProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Sign Up',
      headerStyle: {
        backgroundColor: Colors['background'],
      },
      headerTintColor: Colors['grey-900'],
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 25,
        fontFamily: 'Hubhead',
      },
      // headerTitleAlign: 'center',
    });
  }, [navigation]);

  const toast = useToast();
  const { mutate } = useSignUp();

  const [showPassword, setShowPassword] = useState(false);
  // const [loadingBtn, setloadingBtn] = useState(false);
  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }

  // ************ REACT HOOK FORM ************
  interface IFormInput {
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    password: string;
    password_confirmation: string;
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      phone: '',
      firstname: '',
      lastname: '',
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // console.log(data);
    // navigation.navigate('PhoneVerification');
    try {
      mutate(data, {
        onSuccess: async (data) => {
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('easyretail_onboarding', 'verification');
          toast.show('Account created successfully', { type: 'success' });
          navigation.navigate('PhoneVerification');
          // console.log(data);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            console.error(error?.response?.data);
            if (error?.response?.data?.errors?.email) {
              toast.show(error?.response?.data?.errors?.email[0], {
                type: 'danger',
              });
            } else if (error?.response?.data?.errors?.phone) {
              toast.show(error?.response?.data?.errors?.phone[0], {
                type: 'danger',
              });
            } else if (error?.response?.data?.errors?.password) {
              toast.show(error?.response?.data?.errors?.password[0], {
                type: 'danger',
              });
            } else if (error?.response?.data?.errors?.password_confirmation) {
              toast.show(
                error?.response?.data?.errors?.password_confirmation[0],
                {
                  type: 'danger',
                }
              );
            } else if (error?.response?.data?.errors?.firstname) {
              toast.show(error?.response?.data?.errors?.firstname[0], {
                type: 'danger',
              });
            } else if (error?.response?.data?.errors?.lastname) {
              toast.show(error?.response?.data?.errors?.lastname[0], {
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  const handleSignInRedirect = () => {
    navigation.replace('SignIn');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollWrapper}
    >
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
        {/* phone */}
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputWrapper,
              errors.phone && { borderColor: Colors['red-500'] },
            ]}
          >
            <Controller
              name='phone'
              control={control}
              rules={{
                required: 'Phone number is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label='Phone Number'
                  underlineColor='transparent'
                  onBlur={onBlur}
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
                  keyboardType='phone-pad'
                />
              )}
            />
            <View style={styles.hideUnderline}></View>
          </View>
          {errors.phone && (
            <Text style={styles.errorText}>{errors.phone.message}</Text>
          )}
        </View>
        {/* first name */}
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputWrapper,
              errors.firstname && { borderColor: Colors['red-500'] },
            ]}
          >
            <Controller
              name='firstname'
              control={control}
              rules={{
                required: 'First name is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label='First Name'
                  underlineColor='transparent'
                  onBlur={onBlur}
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
          {errors.firstname && (
            <Text style={styles.errorText}>{errors.firstname.message}</Text>
          )}
        </View>
        {/* last name */}
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputWrapper,
              errors.lastname && { borderColor: Colors['red-500'] },
            ]}
          >
            <Controller
              name='lastname'
              control={control}
              rules={{
                required: 'Last name is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label='Last Name'
                  underlineColor='transparent'
                  onBlur={onBlur}
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
          {errors.lastname && (
            <Text style={styles.errorText}>{errors.lastname.message}</Text>
          )}
        </View>
        {/* password | confirm password */}
        <View style={styles.passwordWrapper}>
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
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
          {/* confirm password */}
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.passwordInputWrapper,
                errors.password_confirmation && {
                  borderColor: Colors['red-500'],
                },
              ]}
            >
              <Controller
                name='password_confirmation'
                control={control}
                rules={{
                  required: 'Confirm password is required',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label='Confirm Password'
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
                            // placeholder: Colors['white'],
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
            {errors.password_confirmation && (
              <Text style={styles.errorText}>
                {errors.password_confirmation.message}
              </Text>
            )}
          </View>
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
            loading={isSubmitting}
            // disabled={isSubmitting || !isValid}
            onPress={handleSubmit(onSubmit)}
          >
            Sign up
          </Button>
        </View>

        <View style={styles.loginAlternativeWrapper}>
          <Text style={styles.loginAlternativeText}>
            Already have an account?
          </Text>
          <TouchableRipple
            style={styles.loginAlternativeButton}
            onPress={() => handleSignInRedirect()}
          >
            <Text style={styles.loginAlternativeButtonText}>Login</Text>
          </TouchableRipple>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['background'],
    paddingHorizontal: 20,
    paddingTop: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  scrollWrapper: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inputWrapper: {
    // marginBottom: 15,
    // paddingTop: 5,
    // paddingBottom: 12,
    // // borderWidth: 1,
    // backgroundColor: Colors['white'],
    // borderRadius: 5,
    // marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  input: {
    // paddingVertical: 11,
    // height: 55,
    // fontSize: 12,
    fontFamily: 'Givonic-SemiBold',
    // borderWidth: 1,
  },
  inputContent: {
    backgroundColor: 'white',
  },
  inputOutline: {
    // backgroundColor: 'white',
    borderColor: Colors['white'],
  },
  inputIcon: {
    // borderWidth: 1,
  },
  hideUnderline: {
    marginTop: -4,
    borderTopWidth: 8,
    borderColor: Colors['white'],
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
  loginAlternativeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  loginAlternativeText: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
  },
  loginAlternativeButton: {
    marginLeft: 10,
  },
  loginAlternativeButtonText: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['grey-700'],
  },
  inputContainer: {
    marginBottom: 15,
  },
  errorText: {
    color: Colors['red'],
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
  },
  passwordWrapper: {
    marginBottom: 15,
  },
  passwordInputWrapper: {
    // marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
});

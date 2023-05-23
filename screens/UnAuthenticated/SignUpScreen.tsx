import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import { SignUpProps } from '../../interfaces/navigation/navigation';
import { Button, TextInput, TouchableRipple } from 'react-native-paper';
import { useGetUser, useSignUp } from '@/hooks/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useToast } from 'react-native-toast-notifications';
import { AxiosError } from 'axios';
import { useAppDispatch } from '@/hooks/redux';
import { setUser } from '@/store/slice/userSlice';

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
  const dispatch = useAppDispatch();

  const { userData } = useGetUser();

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
      navigation.replace('Home');
    }
    // setLoadingPage(false);
  }, [dispatch, navigation, userData]);

  const [showPassword, setShowPassword] = useState(false);
  // const [loadingBtn, setloadingBtn] = useState(false);
  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }

  const handleBusinessNameRedirect = () => {
    // set timeout to simulate loading then navigate to business registration screen
    // setloadingBtn(true);
    // setTimeout(() => {
    //   setloadingBtn(false);
    // }, 1000);
    navigation.replace('PhoneVerification');
  };

  const handleSignInRedirect = () => {
    navigation.replace('SignIn');
  };
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [formValue, setFormValue] = useState({
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    password1: '',
    password2: '',
  });

  const { mutate, isLoading } = useSignUp();

  const handleSignUp = async () => {
    setLoadingBtn(true);
    if (formValue.password1 !== formValue.password2) {
      toast.show('Passwords do not match', {
        type: 'danger',
      });
      setLoadingBtn(false);
      return;
    }
    if (formValue.password1.length < 8) {
      toast.show('Password must be at least 8 characters', {
        type: 'danger',
      });
      setLoadingBtn(false);
      return;
    }

    mutate(formValue, {
      onSuccess: async (data) => {
        await AsyncStorage.setItem('token', data.key);
        navigation.navigate('PhoneVerification');
        setFormValue({
          email: '',
          phone: '',
          first_name: '',
          last_name: '',
          password1: '',
          password2: '',
        });
        setLoadingBtn(false);
      },
      onError: (error) => {
        // console.error(error?.response);
        setLoadingBtn(false);
        setFormValue({
          email: '',
          phone: '',
          first_name: '',
          last_name: '',
          password1: '',
          password2: '',
        });
        if (error instanceof AxiosError) {
          if (
            error?.response?.data?.email ||
            error?.response?.data?.password1 ||
            error?.response?.data?.non_field_errors
          ) {
            if (error?.response?.data?.email) {
              toast.show(error?.response?.data?.email[0], {
                type: 'danger',
              });
            }
            if (error?.response?.data?.password1) {
              toast.show(error?.response?.data?.password1[0], {
                type: 'danger',
              });
            }
            if (error?.response?.data?.non_field_errors) {
              toast.show(error?.response?.data?.non_field_errors[0], {
                type: 'danger',
              });
            }
          } else {
            toast.show('Something went wrong, Please try again later.', {
              type: 'danger',
            });
          }
        }
      },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollWrapper}
    >
      <View>
        <View style={styles.inputWrapper}>
          <TextInput
            label='Email Address'
            autoCapitalize='none'
            keyboardType='email-address'
            underlineColor='transparent'
            activeOutlineColor='transparent'
            selectionColor={Colors['activeTab']}
            contentStyle={styles.inputContent}
            value={formValue.email}
            onChangeText={(text) => setFormValue({ ...formValue, email: text })}
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
        <View style={styles.inputWrapper}>
          <TextInput
            label='Phone Number'
            underlineColor='transparent'
            activeOutlineColor='transparent'
            selectionColor={Colors['activeTab']}
            contentStyle={styles.inputContent}
            value={formValue.phone}
            onChangeText={(text) => setFormValue({ ...formValue, phone: text })}
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
          <View style={styles.hideUnderline}></View>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            label='First Name'
            underlineColor='transparent'
            activeOutlineColor='transparent'
            selectionColor={Colors['activeTab']}
            contentStyle={styles.inputContent}
            value={formValue.first_name}
            onChangeText={(text) =>
              setFormValue({ ...formValue, first_name: text })
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
        <View style={styles.inputWrapper}>
          <TextInput
            label='Last Name'
            underlineColor='transparent'
            activeOutlineColor='transparent'
            selectionColor={Colors['activeTab']}
            contentStyle={styles.inputContent}
            value={formValue.last_name}
            onChangeText={(text) =>
              setFormValue({ ...formValue, last_name: text })
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
        <View style={styles.inputWrapper}>
          <TextInput
            label='Password'
            underlineColor='transparent'
            activeOutlineColor='transparent'
            selectionColor={Colors['activeTab']}
            contentStyle={styles.inputContent}
            value={formValue.password1}
            onChangeText={(text) =>
              setFormValue({ ...formValue, password1: text })
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
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye' : 'eye-off'}
                onPress={togglePassword}
                style={styles.inputIcon}
              />
            }
          />
          <View style={styles.hideUnderline}></View>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            label='Confirm Password'
            underlineColor='transparent'
            activeOutlineColor='transparent'
            selectionColor={Colors['activeTab']}
            contentStyle={styles.inputContent}
            value={formValue.password2}
            onChangeText={(text) =>
              setFormValue({ ...formValue, password2: text })
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
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye' : 'eye-off'}
                onPress={togglePassword}
                style={styles.inputIcon}
              />
            }
          />
          <View style={styles.hideUnderline}></View>
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
            // onPress={() => handleBusinessNameRedirect()}
            loading={isLoading || loadingBtn}
            disabled={
              !formValue.email ||
              !formValue.phone ||
              !formValue.first_name ||
              !formValue.last_name ||
              !formValue.password1 ||
              !formValue.password2 ||
              isLoading
            }
            onPress={() => handleSignUp()}
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
    marginBottom: 15,
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
});

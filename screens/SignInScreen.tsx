import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { SignInProps } from '../interfaces/navigation';
import Colors from '../constants/Colors';
import { Button, TextInput, TouchableRipple } from 'react-native-paper';

const SignInScreen = ({ navigation }: SignInProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Log In',
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

  const [showPassword, setShowPassword] = useState(false);
  // const [loadingBtn, setloadingBtn] = useState(false);
  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }

  const handleSignupRedirect = () => {
    navigation.replace('SignUp');
  };

  const handleHomePageRedirect = () => {
    // console.log('Redirect to Home Page');
    navigation.replace('Home');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.containerContent}
      style={styles.container}
    >
      <View>
        <Text style={styles.subtitle}>Welcome back,</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            label='Email Address/Phone Number'
            mode='outlined'
            autoCapitalize='none'
            style={styles.input}
            activeOutlineColor={Colors['black']}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
          />
        </View>
        <View style={styles.passwordInputWrapper}>
          <TextInput
            label='Password'
            mode='outlined'
            style={styles.input}
            activeOutlineColor={Colors['black']}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            secureTextEntry={showPassword ? false : true}
            autoCapitalize='none'
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye' : 'eye-off'}
                onPress={togglePassword}
                style={styles.inputIcon}
              />
            }
          />
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
            // loading={loadingBtn}
            // disabled={loadingBtn}
            onPress={() => handleHomePageRedirect()}

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
    fontFamily: 'Hubhead',
    color: Colors['grey-900'],
    marginBottom: 20,
    // marginTop: 10,
  },
  inputWrapper: {
    marginBottom: 20,
    paddingTop: 5,
    paddingBottom: 12,
    // borderWidth: 1,
    backgroundColor: Colors['white'],
    borderRadius: 5,
  },
  passwordInputWrapper: {
    paddingTop: 5,
    paddingBottom: 12,
    // borderWidth: 1,
    backgroundColor: Colors['white'],
    borderRadius: 5,
  },
  input: {
    fontFamily: 'Hubhead',
    // borderWidth: 1,
  },
  inputContent: {
    backgroundColor: 'white',
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
    fontFamily: 'Hubhead',
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
    fontFamily: 'Hubhead',
  },
  signupAlternativeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupAlternativeText: {
    fontSize: 16,
    fontFamily: 'Hubhead',
  },
  signupAlternativeButton: {
    marginLeft: 10,
  },
  signupAlternativeButtonText: {
    fontSize: 16,
    fontFamily: 'Hubhead',
    color: Colors['grey-700'],
  },
});

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import Colors from '../constants/Colors';
import { SignUpProps } from '../declarations/navigation';
import { Button, TextInput, TouchableRipple } from 'react-native-paper';

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
    navigation.navigate('BusinessName');
  };

  const handleSignInRedirect = () => {
    navigation.replace('SignIn');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          label='Email Address'
          mode='outlined'
          style={styles.input}
          activeOutlineColor={Colors['grey-700']}
          contentStyle={styles.inputContent}
          outlineStyle={styles.inputOutline}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          label='Phone Number'
          mode='outlined'
          style={styles.input}
          // outlineColor={Colors['grey-400']}
          activeOutlineColor={Colors['grey-700']}
          contentStyle={styles.inputContent}
          outlineStyle={styles.inputOutline}
          keyboardType='phone-pad'
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          label='First Name'
          mode='outlined'
          style={styles.input}
          // outlineColor={Colors['grey-400']}
          activeOutlineColor={Colors['grey-700']}
          contentStyle={styles.inputContent}
          outlineStyle={styles.inputOutline}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          label='Last Name'
          mode='outlined'
          style={styles.input}
          // outlineColor={Colors['grey-400']}
          activeOutlineColor={Colors['grey-700']}
          contentStyle={styles.inputContent}
          outlineStyle={styles.inputOutline}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          label='Password'
          mode='outlined'
          style={styles.input}
          // outlineColor={Colors['grey-400']}
          activeOutlineColor={Colors['grey-700']}
          contentStyle={styles.inputContent}
          outlineStyle={styles.inputOutline}
          secureTextEntry={showPassword ? false : true}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye' : 'eye-off'}
              onPress={togglePassword}
              style={styles.inputIcon}
            />
          }
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          label='Confirm Password'
          mode='outlined'
          style={styles.input}
          // outlineColor={Colors['grey-400']}
          activeOutlineColor={Colors['grey-700']}
          contentStyle={styles.inputContent}
          outlineStyle={styles.inputOutline}
          secureTextEntry={showPassword ? false : true}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye' : 'eye-off'}
              onPress={togglePassword}
              style={styles.inputIcon}
            />
          }
        />
      </View>
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
          onPress={() => handleBusinessNameRedirect()}
          // onPress={() => console.log('Sign Up')}
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
          // onPress={() => console.log('Login')}
        >
          <Text style={styles.loginAlternativeButtonText}>Login</Text>
        </TouchableRipple>
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
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    paddingVertical: 11,
    // height: 45,
    fontSize: 14,
    fontFamily: 'Hubhead',
    // borderWidth: 1,
  },
  inputContent: {
    // backgroundColor: 'red',
  },
  inputOutline: {
    backgroundColor: 'white',
    borderColor: Colors['border'],
    borderRadius: 7,
  },
  inputIcon: {
    // borderWidth: 1,
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
  loginAlternativeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  loginAlternativeText: {
    fontSize: 16,
    fontFamily: 'Hubhead',
  },
  loginAlternativeButton: {
    marginLeft: 10,
  },
  loginAlternativeButtonText: {
    fontSize: 16,
    fontFamily: 'Hubhead',
    color: Colors['grey-700'],
  },
});

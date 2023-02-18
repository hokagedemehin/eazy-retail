import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { Button } from 'react-native-paper';
import { RegistrationSuccessfullProps } from '../../interfaces/navigation/navigation';
import { Image } from '@rneui/themed';

const RegistrationSuccessfullScreen = ({
  navigation,
}: RegistrationSuccessfullProps) => {
  const handleHomePageRedirect = () => {
    // console.log('Redirect to Home Page');
    navigation.replace('Home');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.successContainer}>
        <View style={styles.successContent}>
          <Image
            source={require('../../assets/onboarding/celebration.png')}
            style={styles.successImage}
          />

          <Text style={styles.successText}>Successful</Text>
          <Text style={styles.successSubText}>
            You have successfully logged created your account
          </Text>
        </View>
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
          onPress={() => handleHomePageRedirect()}
          // onPress={() => console.log('Sign Up')}
        >
          Great
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationSuccessfullScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['background'],
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContent: {
    // borderWidth: 1,
    width: '100%',
    alignItems: 'center',
  },
  successImage: {
    width: 300,
    height: 300,
    // resizeMode: 'contain',
    // borderRadius: 10,
  },
  successText: {
    fontSize: 24,
    fontFamily: 'Givonic-SemiBold',
    textAlign: 'center',
    marginTop: 20,
  },
  successSubText: {
    fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    textAlign: 'center',
    marginTop: 20,
    width: '70%',
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
    fontFamily: 'Givonic-SemiBold',
  },
});

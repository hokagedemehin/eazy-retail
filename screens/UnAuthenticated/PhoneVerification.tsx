import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Button } from '@rneui/themed';
import { RootStackScreenProps } from '@/interfaces/navigation/navigation';
import { useToast } from 'react-native-toast-notifications';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { TextInput } from 'react-native-paper';
import { useVerifyEmail } from '@/hooks/auth';
import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneVerificationScreen = ({
  navigation,
}: Omit<RootStackScreenProps<'PhoneVerification'>, 'route'>) => {
  const toast = useToast();
  const CELL_COUNT = 6;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { mutate } = useVerifyEmail();
  const handleSubmit = () => {
    // console.log('verify number');
    // console.log('otp value', value);
    // navigation.navigate('BusinessName');
    const form = {
      token: value,
    };
    try {
      mutate(form, {
        onSuccess: async (data) => {
          // console.log(data);
          toast.show(data?.message, {
            type: 'success',
          });
          await AsyncStorage.setItem('easyretail_onboarding', 'store_creation');
          navigation.replace('BusinessName');
        },
        onError: (error) => {
          // console.log(error);
          if (error instanceof AxiosError) {
            if (error?.response?.data?.errors?.token) {
              toast.show(error?.response?.data?.errors?.token[0], {
                type: 'danger',
              });
            }
            console.error(error?.response?.data);
            // toast.show(error?.response?.data?.message, {
            //   type: 'danger'})
          }
        },
      });
    } catch (error) {
      console.error(error);
      toast.show('Something went wrong, please try again later.', {
        type: 'danger',
      });
    }
  };

  // *************** BOTTOM SHEET ***************
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [editNumberValue, setEditNumberValue] = useState('');

  const handleOpenBottomSheet = () => {
    actionSheetRef.current?.show();
  };

  const handleSendNewOTP = () => {
    actionSheetRef.current?.hide();
    toast.show('New OTP sent', {
      type: 'success',
      placement: 'top',
      duration: 2000,
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.container}>
        <View>
          <View style={styles.headerWrapper}>
            <Text style={styles.headerText}>Email Verification</Text>
          </View>
          <View style={styles.messageWrapper}>
            <Text style={styles.messageText}>
              An OTP has been sent to mail. Type the OTP below to verify your
              email address
            </Text>
          </View>
          <View style={styles.codeFieldRoot}>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType='number-pad'
              textContentType='oneTimeCode'
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
        </View>
        <View style={styles.footerWrapper}>
          <View style={styles.buttonWrapper}>
            <Button
              title='Verify email'
              // onPress={pickImage}
              onPress={() => handleSubmit()}
              buttonStyle={styles.VerifyBtnStyle}
              // containerStyle={styles.changeImageContainerStyle}
              // titleStyle={styles.changeImageBtnTitleStyle}
              size='lg'
            />
          </View>
          <View style={styles.editNumberWrapper}>
            <Text style={styles.editNumberText}>Wrong email?</Text>
            <Button
              type='clear'
              title='Edit email'
              titleStyle={styles.editNumberButtonText}
              onPress={() => handleOpenBottomSheet()}
              // size='sm'
            />
          </View>
          <View style={styles.resendCodeWrapper}>
            <Text style={styles.resendCodeText}>Didn&apos;t get an OTP?</Text>
            <Button
              type='clear'
              title='Resend'
              titleStyle={styles.resendCodeButtonText}
              onPress={() => {
                toast.show('OTP sent', {
                  type: 'success',
                  placement: 'top',
                  duration: 2000,
                });
              }}
            />
          </View>
        </View>
      </View>
      <ActionSheet ref={actionSheetRef} gestureEnabled={true}>
        <Text style={styles.changeNumberText}>Change Phone Number</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            // label='Input Industry'
            mode='outlined'
            style={styles.input}
            outlineColor={Colors['grey-400']}
            activeOutlineColor={Colors['grey-700']}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            // placeholder='Enter your phone number'
            placeholderTextColor={Colors['grey-400']}
            value={editNumberValue}
            onChangeText={(text) => setEditNumberValue(text)}
          />
          <View style={styles.buttonActionWrapper}>
            <Button
              title='Send OTP'
              titleStyle={styles.sendOTPBtnTitleStyle}
              onPress={() => handleSendNewOTP()}
              buttonStyle={styles.sendOTPBtnStyle}
              // containerStyle={styles.changeImageContainerStyle}
            />
          </View>
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
};

export default PhoneVerificationScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 10,
    backgroundColor: Colors['background'],
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Givonic-Bold',
    color: Colors['grey-900'],
  },
  messageWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['grey-900'],
    lineHeight: 20,
  },
  codeFieldRoot: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    // borderWidth: 1,
  },
  cell: {
    width: 55,
    height: 55,
    lineHeight: 50,
    fontSize: 24,
    borderWidth: 1,
    // borderColor: '#00000030',
    borderColor: Colors['border'],
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  focusCell: {
    borderColor: '#000',
    borderWidth: 2,
  },
  footerWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  VerifyBtnStyle: {
    backgroundColor: Colors['black'],
    borderRadius: 10,
    height: 50,
  },
  editNumberWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editNumberText: {
    fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['grey-900'],
    marginRight: 5,
  },
  editNumberButtonText: {
    fontSize: 14,
    fontFamily: 'Givonic-Bold',
    color: Colors['black'],
  },
  resendCodeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },
  resendCodeText: {
    fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['grey-900'],
    // marginRight: 5,
  },
  resendCodeButtonText: {
    fontSize: 14,
    fontFamily: 'Givonic-Bold',
    color: Colors['black'],
  },
  changeNumberText: {
    fontSize: 18,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['grey-900'],
    marginTop: 10,
    marginHorizontal: 20,
  },
  inputWrapper: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  input: {
    // paddingVertical: 10,
    height: 60,
    fontSize: 18,
    fontFamily: 'Givonic-SemiBold',
    // borderWidth: 1,
  },
  inputContent: {
    // backgroundColor: 'red',
  },
  inputOutline: {
    backgroundColor: 'white',
    borderColor: Colors['grey-400'],
    borderRadius: 10,
  },
  buttonActionWrapper: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  sendOTPBtnStyle: {
    backgroundColor: Colors['black'],
    borderRadius: 10,
    height: 50,
    width: 100,
  },
  sendOTPBtnTitleStyle: {
    fontSize: 16,
    fontFamily: 'Givonic-Bold',
    color: Colors['white'],
  },
});

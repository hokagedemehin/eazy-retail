import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import HeaderComponent from '@/components/Header/HeaderComponent';
import Colors from '@/constants/Colors';
import { CounterStackScreenProps } from '@/interfaces/navigation/counter';
import { Chip, TextInput as RNPTextInput } from 'react-native-paper';
import { Button } from '@rneui/themed';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store/store';
import { setSaleSummary } from '@/store/slice/saleSummarySlice';
import moment from 'moment';

const CashPaymentScreen = ({
  navigation,
}: Omit<CounterStackScreenProps<'CashPayment'>, 'route'>) => {
  // ****************** GO BACK ******************
  const handleBack = () => {
    navigation.goBack();
  };

  // ****************** CHANGE CHIP ******************
  const { saleSummary } = useAppSelector(
    (state: RootState) => state.saleSummary
  );
  // console.log('saleSummary :>> ', saleSummary);
  const dispatch = useAppDispatch();
  const [cashReceivedValue, setCashReceivedValue] = useState('');
  const [notesValue, setNotesValue] = useState('');

  // ******************* SALES SUCCESS PAGE REDIRECT *******************
  const handleSuccessPageRedirect = () => {
    const short = saleSummary.total - Number(cashReceivedValue);
    const change = Number(cashReceivedValue) - saleSummary.total;
    const newSaleSummary = {
      ...saleSummary,
      cashReceived: Number(cashReceivedValue),
      short: Number(cashReceivedValue) < saleSummary.total ? short : 0,
      change: Number(cashReceivedValue) > saleSummary.total ? change : 0,
      note: notesValue,
      salesDate: moment().format('MMM Do YYYY - h:mm a'),
      receiptID: `#${Math.floor(10000 + Math.random() * 90000)}`,
    };
    dispatch(setSaleSummary(newSaleSummary));
    navigation.navigate('SaleSuccess');
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.header}>
        <HeaderComponent title='Cash payment' handleBack={handleBack} />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTop}>
          <View style={styles.cashExpectedWrapper}>
            <Text style={styles.cashExpectedText}>Cash receivable</Text>
            <Text style={styles.cashExpectedAmount}>
              &#8358; {saleSummary.total}
            </Text>
          </View>
          <View style={styles.cashReceivedWrapper}>
            <RNPTextInput
              label='Enter cash received'
              mode='outlined'
              value={cashReceivedValue}
              onChangeText={(text) => setCashReceivedValue(text)}
              style={styles.input}
              outlineColor={Colors['white']}
              activeOutlineColor={Colors['black']}
              contentStyle={styles.inputContent}
              outlineStyle={styles.inputOutline}
              left={
                <RNPTextInput.Affix
                  text='₦'
                  textStyle={{ color: Colors['black'], fontSize: 24 }}
                />
              }
              theme={{
                colors: {
                  primary: Colors['black'],
                  text: Colors['black'],
                  placeholder: Colors['white'],
                  background: Colors['white'],
                },
              }}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.cashReceivedChipWrapper}>
            {cashReceivedValue !== '' &&
              Number(cashReceivedValue) > saleSummary.total && (
                <Chip
                  mode='outlined'
                  style={styles.chipChangeStyle}
                  textStyle={styles.chipChangeTextStyle}
                  // onPress={() => console.log('Pressed')}
                  onPress={() => {
                    // taxActionSheetRef.current?.show();
                    console.log('Pressed');
                  }}
                >
                  Change &#8358;{Number(cashReceivedValue) - saleSummary.total}
                </Chip>
              )}
            {cashReceivedValue !== '' &&
              Number(cashReceivedValue) < saleSummary.total && (
                <Chip
                  mode='outlined'
                  style={styles.chipShortStyle}
                  textStyle={styles.chipShortTextStyle}
                  // onPress={() => console.log('Pressed')}
                  onPress={() => {
                    // taxActionSheetRef.current?.show();
                    console.log('Pressed');
                  }}
                >
                  Short by &#8358;
                  {saleSummary.total - Number(cashReceivedValue)}
                </Chip>
              )}
          </View>
        </View>
        <View style={styles.containerBottom}>
          <TextInput
            value={notesValue}
            onChangeText={(text) => setNotesValue(text)}
            multiline
            // textAlignVertical='top'
            numberOfLines={3}
            placeholder='Add note'
            style={styles.addNoteInput}
            autoCorrect={false}
            // onChangeText={(text) => handleDiscountValue(text)}
          />
          <View style={styles.cashPaymentButtonWrapper}>
            <Button
              type='solid'
              title={`Received by cash`}
              // onPress={() => console.log('pressed')}
              onPress={() => {
                handleSuccessPageRedirect();
                // actionSheetRef.current?.hide();
              }}
              radius={10}
              buttonStyle={{ backgroundColor: Colors['black'], height: 55 }}
              size='lg'
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CashPaymentScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Colors['background'],
    paddingTop: Platform.OS === 'android' ? 10 : 10,
  },
  container: {
    flex: 1,
    // borderWidth: 1,h
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    // marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  containerTop: {
    // borderWidth: 1,
    // width: '100%',
    // alignItems: 'center',
  },
  cashExpectedWrapper: {
    // borderWidth: 1,
    width: '100%',
    // alignItems: 'center',
  },
  cashExpectedText: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 16,
    color: Colors['black'],
  },
  cashExpectedAmount: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 24,
    color: Colors['black'],
  },
  cashReceivedWrapper: {
    marginTop: 40,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderWidth: 1,
    backgroundColor: Colors['white'],
    borderRadius: 5,
    borderColor: Colors['white'],
    width: '100%',
  },
  input: {
    // paddingVertical: 11,
    // height: 55,
    fontSize: 20,
    fontFamily: 'Givonic-SemiBold',
    // borderWidth: 1,
  },
  inputContent: {
    // backgroundColor: 'white',
  },
  inputOutline: {
    // backgroundColor: 'white',
    borderColor: Colors['white'],
  },
  cashReceivedChipWrapper: {
    // borderWidth: 1,
    width: '50%',
    marginBottom: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  chipChangeStyle: {
    backgroundColor: Colors['chipBackground'],
    borderRadius: 50,
    borderColor: Colors['background'],
    paddingVertical: 3,
  },
  chipChangeTextStyle: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 14,
    color: Colors['chipText'],
  },
  chipShortStyle: {
    backgroundColor: Colors['chipShortBackground'],
    borderRadius: 50,
    borderColor: Colors['background'],
    paddingVertical: 3,
  },
  chipShortTextStyle: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 14,
    color: Colors['chipShort'],
  },
  containerBottom: {
    marginBottom: 20,
  },
  addNoteInput: {
    // width: '48%',
    // height: '100%',
    borderWidth: 1,
    borderColor: Colors['white'],
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors['white'],
    fontFamily: 'Givonic-SemiBold',
    fontSize: 16,
    // marginRight: 10,
    // color: Colors['black'],
  },
  cashPaymentButtonWrapper: {
    // borderWidth: 1,
    marginTop: 20,
  },
});

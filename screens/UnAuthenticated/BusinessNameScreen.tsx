import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { BusinessNameProps } from '../../interfaces/navigation/navigation';
import Colors from '../../constants/Colors';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { BackSvgComponent } from '@/assets/icons';
import { useAppDispatch } from '@/hooks/redux';
import { setStoreName } from '@/store/slice/storeSlice';

const BusinessNameScreen = ({ navigation }: BusinessNameProps) => {
  // ************* HEADER *************
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Back',
      headerStyle: {
        backgroundColor: Colors['background'],
      },
      headerTintColor: Colors['grey-900'],
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 18,
        fontFamily: 'Hubhead',
      },
      headerLeft: () => (
        <IconButton
          icon={() => <BackSvgComponent />}
          // iconColor={Colors['grey-900']}
          // size={30}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => (
        <IconButton
          icon='close'
          iconColor={Colors['grey-900']}
          size={20}
          onPress={() => navigation.popToTop()}
        />
      ),
      // headerTitleAlign: 'center',
    });
  }, [navigation]);

  // const handleIndustryRedirect = () => {
  //   navigation.navigate('BusinessLocation');
  // };

  // const { countryData } = useCountry();
  // console.log('countryData :>> ', countryData);

  // const { currencyData } = useCurrency();
  // console.log('currencyData :>> ', currencyData);

  // const { industryData } = useIndustry();
  // console.log('industryData :>> ', industryData);

  // const [loadingBtn, setLoadingBtn] = useState(false);
  const [formValue, setFormValue] = useState('');
  const dispatch = useAppDispatch();
  // const { name } = useAppSelector((state) => state.storeUser);
  // console.log('name', name);

  const handleStoreName = async () => {
    // setLoadingBtn(true);
    dispatch(setStoreName(formValue));
    setFormValue('');
    navigation.navigate('BusinessLocation');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.containerContent}
      style={styles.container}
    >
      <View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Business Name</Text>
          <TextInput
            mode='flat'
            style={styles.input}
            value={formValue}
            onChangeText={(text) => setFormValue(text)}
            selectionColor={Colors['inputText']}
            underlineColor={Colors['inputText']}
            activeUnderlineColor={Colors['inputText']}
            contentStyle={styles.inputContent}
          />
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
          // loading={loadingBtn || isLoading}
          // disabled={loadingBtn || isLoading || !formValue}
          // onPress={() => handleIndustryRedirect()}
          onPress={() => handleStoreName()}
        >
          Next
        </Button>
      </View>
    </ScrollView>
  );
};

export default BusinessNameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['background'],
    padding: 20,
  },
  containerContent: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    // padding: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    color: Colors['grey-800'],
    marginTop: 15,
    marginBottom: 15,
    fontFamily: 'Givonic-SemiBold',
  },
  input: {
    // paddingVertical: 10,
    // height: 60,
    fontSize: 24,
    fontFamily: 'Givonic-SemiBold',
    // borderWidth: 1,
  },
  inputContent: {
    // fontFamily: 'Hubhead',
    backgroundColor: Colors['background'],
  },
  inputOutline: {
    borderColor: Colors['inputText'],
    // borderRadius: 10,
  },
  dropdownPlaceholder: {
    fontSize: 18,
    color: Colors['grey-800'],
    // fontFamily: 'Hubhead',
  },
  dropdown: {
    // borderWidth: 1,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: Colors['grey-400'],
  },
  dropdownText: {
    fontSize: 18,
    // fontFamily: 'Hubhead',
    color: Colors['grey-800'],
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

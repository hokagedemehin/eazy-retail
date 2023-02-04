import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { IndustryProps } from '../interfaces/navigation';
import Colors from '../constants/Colors';
import {
  Button,
  IconButton,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import {
  BackSvgComponent,
  FashionSvgComponent,
  FoodSvgComponent,
  HouseholdSvgComponent,
  SkinCareSvgComponent,
  TechSvgComponent,
} from '@/assets/icons';

const IndustryScreen = ({ navigation }: IndustryProps) => {
  // *************** PAGE HEADER ***************
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Back',
      headerStyle: {
        backgroundColor: Colors['background'],
      },
      headerTintColor: Colors['grey-900'],
      headerTitleStyle: {
        fontWeight: '600',
        fontSize: 20,
        fontFamily: 'Hubhead',
      },
      headerLeft: () => (
        <IconButton
          icon={() => <BackSvgComponent />}
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

  // ********************* FLATLIST DATA *********************
  const [industry, setIndustry] = useState([
    {
      id: 1,
      name: 'Food and beverages',
      image: <FoodSvgComponent />,
    },
    {
      id: 2,
      name: 'Fashion',
      image: <FashionSvgComponent />,
    },
    {
      id: 3,
      name: 'Skin Care',
      image: <SkinCareSvgComponent />,
    },
    {
      id: 4,
      name: 'Technology',
      image: <TechSvgComponent />,
    },
    {
      id: 5,
      name: 'Household and furniture',
      image: <HouseholdSvgComponent />,
    },
    {
      id: 6,
      name: 'Others (please specify)',
      image: 'others',
    },
  ]);

  // console.log('industry', industry);

  // ********************** CARD SELECTION **********************
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  // console.log(selectedIndustry);

  // *************** BOTTOM SHEET ***************
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [otherIndustry, setOtherIndustry] = useState('');
  const [otherIndustryPresent, setOtherIndustryPresent] = useState(false);

  const handleAddIndustry = () => {
    // replace the last item in the industry array with the new industry
    if (otherIndustryPresent) {
      // replace the second to last item in the industry array with the new industry using splice
      industry.splice(industry.length - 2, 1, {
        id: industry.length - 1,
        name: otherIndustry,
        image: '',
      });
      setIndustry([...industry]);
      setOtherIndustry('');
      // setSelectedIndustry(industry.length - 2);
    } else {
      industry.pop();
      industry.push({
        id: industry.length + 1,
        name: otherIndustry,
        image: '',
      });
      industry.push({
        id: industry.length + 1,
        name: 'Others (please specify)',
        image: 'others',
      });
      setIndustry([...industry]);
      setOtherIndustryPresent(true);
      setSelectedIndustry(industry.length - 1);
      setOtherIndustry('');
    }
    actionSheetRef.current?.hide();
  };

  // ********************* FLATLIST RENDER ITEM *********************

  const handleOtherIndustry = () => {
    // actionSheetRef.current?.setModalVisible();
    actionSheetRef.current?.show();
  };

  // ********************** HANDLE SUBMIT **********************
  const handleSuccessRedirect = () => {
    navigation.navigate('RegistrationSuccessfull');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Please select the industry you are in.
      </Text>
      <View style={styles.buttonsWrapper}>
        {industry.map((item) => {
          return (
            <View style={styles.industryWrapper} key={item.id}>
              {item.name !== 'Others (please specify)' && (
                <TouchableRipple
                  onPress={() => setSelectedIndustry(item.id)}
                  // onPress={() => console.log('pressed')}
                  rippleColor={Colors['grey-300']}
                  style={styles.cardWrapper}
                >
                  <View>
                    <View style={styles.selectIcon}>
                      <FontAwesome
                        name='check-circle'
                        size={24}
                        color={Colors['black']}
                        style={{
                          opacity: selectedIndustry == item.id ? 1 : 0,
                        }}
                      />
                    </View>

                    <View style={styles.cardImage}>
                      {item.image !== '' && item.image}
                      {item.image === '' && (
                        <MaterialCommunityIcons
                          name='office-building'
                          size={50}
                          color={Colors['white']}
                          style={styles.newIndustryIncon}
                        />
                      )}
                    </View>
                    <View style={styles.cardTextWrapper}>
                      <Text style={styles.cardText}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableRipple>
              )}

              {item.name === 'Others (please specify)' && (
                <TouchableRipple
                  onPress={() => handleOtherIndustry()}
                  // onPress={() => console.log('pressed')}
                  rippleColor={Colors['grey-300']}
                  style={styles.otherCardWrapper}
                >
                  <View
                    style={{
                      alignItems: 'center',
                    }}
                  >
                    <View style={styles.cardIcon}>
                      <Ionicons
                        name='add'
                        size={50}
                        color='black'
                        style={styles.othersIcon}
                      />
                    </View>
                    <View style={styles.cardOtherTextWrapper}>
                      <Text style={styles.cardOtherText}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableRipple>
              )}
            </View>
          );
        })}
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
          onPress={() => handleSuccessRedirect()}
          // onPress={() => console.log('Sign Up')}
        >
          Next
        </Button>
      </View>
      <ActionSheet ref={actionSheetRef} gestureEnabled={true}>
        <Text style={styles.inputOtherLabel}>Add Industry</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            // label='Input Industry'
            mode='outlined'
            style={styles.input}
            outlineColor={Colors['grey-400']}
            activeOutlineColor={Colors['grey-700']}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            placeholder='Eg. Food and beverages'
            placeholderTextColor={Colors['grey-400']}
            value={otherIndustry}
            onChangeText={(text) => setOtherIndustry(text)}
          />
          <Text style={styles.helperOtherText}>
            Please keep it short and simple
          </Text>
        </View>
        <View style={styles.buttonActionWrapper}>
          <Button
            mode='contained'
            // style={styles.button}
            style={styles.button}
            buttonColor={Colors['black']}
            textColor={Colors['white']}
            contentStyle={styles.buttonOtherContent}
            onPress={() => handleAddIndustry()}
            disabled={otherIndustry === '' ? true : false}
          >
            Add
          </Button>
        </View>
      </ActionSheet>
    </ScrollView>
  );
};

export default IndustryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['background'],
    padding: 20,
    // marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Hubhead',
    color: Colors['grey-900'],
    marginBottom: 20,
  },

  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 10,
  },

  industryWrapper: {
    marginBottom: 10,
    width: '48%',
  },

  cardWrapper: {
    backgroundColor: Colors['white'],
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    // borderWidth: 1,
    height: 160,
    // marginVertical: 5,
    // marginHorizontal: 5,
  },

  selectIcon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  cardImage: {
    // width: 100,
    // height: 100,
    // borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },

  cardTextWrapper: {
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  cardText: {
    fontSize: 14,
    fontFamily: 'Hubhead',
    color: Colors['grey-900'],
    textAlign: 'center',
    // width: '100%',
  },

  otherCardWrapper: {
    backgroundColor: Colors['deep-purple-300'],
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    height: 160,
    alignItems: 'center',
  },

  cardIcon: {
    // width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 20,
    // backgroundColor: Colors['pink-100'],
    // padding: 15,
    borderRadius: 50,
    borderWidth: 1,
  },
  othersIcon: {
    borderRadius: 50,
    backgroundColor: Colors['pink-100'],

    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  newIndustryIncon: {
    borderRadius: 50,
    backgroundColor: Colors['deep-purple-400'],

    paddingVertical: 10,
    paddingHorizontal: 12,
    // marginTop: 10,
  },

  cardOtherTextWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  cardOtherText: {
    fontSize: 14,
    fontFamily: 'Hubhead',
    color: Colors['white'],
  },
  inputWrapper: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  inputOtherLabel: {
    fontSize: 18,
    fontFamily: 'Hubhead',
    color: Colors['grey-900'],
    marginTop: 10,
    marginHorizontal: 20,
  },
  helperOtherText: {
    fontSize: 12,
    fontFamily: 'Hubhead',
    color: Colors['grey-400'],
    // marginHorizontal: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: 'Hubhead',
    color: Colors['grey-900'],
    marginBottom: 5,
  },
  input: {
    // paddingVertical: 10,
    height: 60,
    fontSize: 18,
    fontFamily: 'Hubhead',
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
    // marginTop: 20,
    alignItems: 'flex-end',
  },
  buttonWrapper: {
    // borderWidth: 1,
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    // height: 60,
    borderRadius: 10,
    borderWidth: 1,
    // backgroundColor: Colors['grey-700'],
  },
  buttonOtherContent: {
    // borderWidth: 1,
    height: 40,
  },
  buttonLabel: {
    fontSize: 18,
    fontFamily: 'Hubhead',
  },
  buttonContent: {
    // borderWidth: 1,
    height: 50,
  },
});

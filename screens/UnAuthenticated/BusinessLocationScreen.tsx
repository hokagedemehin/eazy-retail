import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  useEffect,
  useLayoutEffect,
  // useMemo,
  useRef,
  useState,
  // useCallback,
} from 'react';
import { BusinessLocationProps } from '../../interfaces/navigation/navigation';
import Colors from '../../constants/Colors';
import {
  Button,
  IconButton,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
// import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { BackSvgComponent } from '@/assets/icons';
// import { FlashList } from '@shopify/flash-list';
// import {
//   BottomSheetModal,
//   BottomSheetModalProvider,
//   BottomSheetFlatList as FlatList2,
// } from '@gorhom/bottom-sheet';

const BusinessLocationScreen = ({ navigation }: BusinessLocationProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Back',
      headerStyle: {
        backgroundColor: Colors['background'],
      },
      headerTintColor: Colors['grey-900'],
      headerTitleStyle: {
        // fontWeight: '600',
        fontSize: 20,
        fontFamily: 'Givonic-SemiBold',
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

  // *************** BOTTOM SHEET ***************
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handleShowCountryList = () => {
    actionSheetRef.current?.show();
  };

  type Country = {
    label: string;
    value: string;
  };

  type Currency = {
    label: string;
    value: string;
  };

  const [countries, setCountries] = useState([] as Country[]);
  const [searchCountries, setsearchCountries] = useState([] as Country[]);
  const [selectedCountry, setSelectedCountry] = useState('');
  // const [currencies, setCurrencies] = useState([] as Currency[]);

  // console.log('countries', countries);

  type restCountryProps = {
    name: {
      common: string;
    };
    currencies: {
      [key: string]: {
        name: string;
        symbol: string;
      };
    };
  };

  useEffect(() => {
    const neededCountries = [
      'Nigeria',
      'United States',
      'United Kingdom',
      'Canada',
      'Australia',
      'South Africa',
      'India',
    ];
    async function fetchCountry() {
      try {
        const { data } = await axios.get('https://restcountries.com/v3.1/all');
        const countryArr = [] as Country[];
        const currencyArr = [] as Currency[];

        // filter the data to get the object where name.common is equal to Nigeria, United States, United Kingdom, Canada, Australia, South Africa, and India

        const filteredData = data.filter((country: restCountryProps) => {
          const { common } = country.name;
          return neededCountries.includes(common);
        });

        // console.log('filteredData :>> ', filteredData);

        filteredData.forEach((country: restCountryProps) => {
          const { common } = country.name;
          const { currencies } = country;

          countryArr.push({
            label: common,
            value: common,
          });

          const currencyName =
            currencies !== undefined ? Object.keys(currencies)[0] : '';

          if (currencyName) {
            const currencySymbol =
              currencyName && currencies[currencyName].symbol;
            const currencyFullName =
              currencyName && currencies[currencyName].name;
            currencyArr.push({
              label: `${currencyFullName} (${currencySymbol})`,
              value: currencyFullName,
            });
          }
        });

        countryArr.sort((a, b) => {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        });

        setCountries(countryArr);
        setsearchCountries(countryArr);
        // setCurrencies(currencyArr);

        // console.log('data :>> ', data[2]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCountry();
  }, []);

  // ********** SEARCH BAR **********
  const [search, setSearch] = useState('');

  const handleSearch = (text: string) => {
    if (text.length > 0) {
      const newData = countries.filter((item) => {
        const itemData = item.label ? item.label : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setCountries(newData);
    } else {
      setCountries(searchCountries);
    }
  };

  const handleIndustryRedirect = () => {
    navigation.navigate('SelectIndustry');
  };

  // **************** RENDER ITEM ****************
  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableRipple
      rippleColor={Colors['white']}
      onPress={() => {
        setSelectedCountry(item.value);
        actionSheetRef.current?.hide();
        setSearch('');
        setCountries(searchCountries);
      }}
    >
      <View style={styles.item}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.label}
        </Text>
      </View>
    </TouchableRipple>
  );

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView
        contentContainerStyle={styles.containerContent}
        style={styles.container}
      >
        <View>
          <View style={styles.inputWrapper}>
            <TouchableRipple
              // onPress={() => console.log('country')}
              onPress={() => handleShowCountryList()}
              // onPress={() => handlePresentModalPress()}
              rippleColor={Colors['background']}
            >
              <TextInput
                label='Country'
                mode='outlined'
                style={styles.input}
                activeOutlineColor={Colors['black']}
                contentStyle={styles.inputContent}
                outlineStyle={styles.inputOutline}
                editable={false}
                // multiline={true}
                value={selectedCountry}
                right={
                  <TextInput.Icon
                    icon={'chevron-down'}
                    // onPress={() => console.log('pressed')}
                    onPress={() => handleShowCountryList()}
                    style={styles.inputIcon}
                  />
                }
              />
            </TouchableRipple>
          </View>

          {/* <View style={styles.inputWrapper}>
            <DropDownPicker
              open={openCurrency}
              value={currencyValue}
              items={currencies}
              setOpen={setOpenCurrency}
              setValue={setCurrencyValue}
              setItems={setCurrencies}
              onOpen={() => hanldeSelectOpenClose('currency')}
              listMode='SCROLLVIEW'
              placeholder='Currency'
              placeholderStyle={styles.dropdownPlaceholder}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              // searchable={true}
              // searchPlaceholder='Search country'
              // mode='BADGE'
              // showBadgeDot={true}
              zIndex={3000}
            />
          </View> */}
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
            onPress={() => handleIndustryRedirect()}
            // onPress={() => console.log('Save to netxt screen')}
          >
            Next
          </Button>
        </View>
        <ActionSheet
          ref={actionSheetRef}
          // snapPoints={[90]}
          // containerStyle={{
          //   // borderWidth: 3,
          //   // borderColor: 'green',
          //   paddingBottom: 130,
          //   borderTopLeftRadius: 20,
          //   borderTopRightRadius: 20,
          // }}
          snapPoints={[70]}
          containerStyle={styles.actionSheetContainer}
          useBottomSafeAreaPadding={true}
          gestureEnabled={true}
          CustomHeaderComponent={
            <View style={styles.searchBar}>
              <TextInput
                placeholder='Search country'
                mode='outlined'
                style={styles.searchInput}
                contentStyle={styles.searchInputContent}
                outlineStyle={styles.searchInputOutline}
                onChangeText={(text) => {
                  setSearch(text);
                  handleSearch(text);
                }}
                value={search}
                left={
                  <TextInput.Icon
                    icon={'magnify'}
                    style={styles.inputIcon}
                    // onPress={() => console.log('search')}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={'close'}
                    onPress={() => {
                      setSearch('');
                      setCountries(searchCountries);
                    }}
                    style={styles.inputIcon}
                  />
                }
              />
            </View>
          }
        >
          <View>
            <View style={styles.listContainer}>
              <FlatList
                data={countries}
                renderItem={renderCountryItem}
                keyExtractor={(item) => item.value}
                // initialNumToRender={10}
              />
            </View>
          </View>
        </ActionSheet>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessLocationScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
  },
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
    paddingTop: 5,
    paddingBottom: 12,
    // borderWidth: 1,
    backgroundColor: Colors['white'],
    borderRadius: 5,
  },
  input: {
    // paddingVertical: 11,
    // height: 40,
    // fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    // borderWidth: 1,
  },
  inputContent: {
    // fontFamily: 'Hubhead',
    backgroundColor: 'white',
  },
  inputOutline: {
    borderColor: Colors['white'],
  },
  inputIcon: {
    marginTop: 10,
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
  actionSheetContainer: {
    paddingBottom: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  searchBar: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  searchInput: {
    // borderWidth: 1,
    // height: 40,
    fontSize: 18,
    fontFamily: 'Givonic-SemiBold',
  },

  searchInputContent: {},

  searchInputOutline: {
    backgroundColor: 'white',
    borderColor: Colors['grey-400'],
    borderRadius: 7,
  },

  listContainer: {
    // marginVertical: 10,
    // marginBottom: 330,
    // borderWidth: 1,
    // marginHorizontal: 20,
  },

  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors['grey-200'],
    // height: 50,
    // width: 250,
  },
  itemText: {
    fontSize: 18,
    fontFamily: 'Givonic-SemiBold',
  },
});

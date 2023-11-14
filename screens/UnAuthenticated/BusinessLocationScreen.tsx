import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {
  // useEffect,
  useLayoutEffect,
  // useMemo,
  // useRef,
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
// import axios from 'axios';
import ActionSheet from 'react-native-actions-sheet';
import { BackSvgComponent } from '@/assets/icons';
import { useCreateStore } from '@/hooks/storeHook';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  useAddressInput,
  useCountrySelector,
  useCurrencySelector,
  useIndustrySelector,
  useTimezoneSelector,
} from './store/createStore';
import {
  setStoreCountry,
  setStoreCurrency,
  setStoreId,
  setStoreIndustry,
  setStoreTimezone,
  setStoreUser,
} from '@/store/slice/storeSlice';
import { AxiosError } from 'axios';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BusinessLocationScreen = ({ navigation }: BusinessLocationProps) => {
  const dispatch = useAppDispatch();

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
          onPress={() => {
            navigation.goBack();
            dispatch(
              setStoreUser({
                country_id: 0,
                name: '',
                currency_id: 0,
                industry_id: 0,
                address: '',
              })
            );
          }}
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
  }, [navigation, dispatch]);

  interface Country {
    code: string;
    id: number;
    name: string;
  }

  interface Currency {
    code: string;
    id: number;
    name: string;
    symbol: string;
  }

  interface Industry {
    // code: string;
    id: number;
    name: string;
  }

  interface Timezone {
    id: number;
    name: string;
    code: string;
  }

  const [loadingBtn, setLoadingBtn] = useState(false);
  const { country_id, name, currency_id, industry_id, address, timezone_id } =
    useAppSelector((state) => state.storeUser);

  // const { updateStoreMutate, isLoading } = useUpdateStore();

  const {
    actionSheetRef,
    handleShowCountryList,
    countries,
    setCountries,
    search,
    setSearch,
    handleSearch,
    selectedCountry,
    setSelectedCountry,
    // countryData,
    searchCountries,
  } = useCountrySelector();

  const {
    currencyActionSheetRef,
    handleShowCurrencyList,
    currencies,
    setCurrencies,
    currencySearch,
    setCurrencySearch,
    handleCurrencySearch,

    selectedCurrency,
    setSelectedCurrency,
    // currencyData,
    searchCurrency,
  } = useCurrencySelector();

  const {
    industryActionSheetRef,
    handleShowIndustryList,
    industries,
    setIndustries,
    industrySearch,
    setIndustrySearch,
    handleIndustrySearch,
    selectedIndustry,
    setSelectedIndustry,
    // industryData,
    searchIndustry,
  } = useIndustrySelector();

  const {
    timezoneActionSheetRef,
    handleShowTimezoneList,
    timezones,
    setTimezones,
    timezoneSearch,
    setTimezoneSearch,
    handleTimezoneSearch,
    selectedTimezone,
    setSelectedTimezone,
    // timezoneData,
    searchTimezone,
  } = useTimezoneSelector();

  const { addressValue, setAddressValue, handleAddressChange } =
    useAddressInput();
  const createStoreMutation = useCreateStore();
  const toast = useToast();
  const handleCreateStore = async () => {
    setLoadingBtn(true);
    const data = {
      country_id: country_id,
      name: name,
      currency_id: currency_id,
      industry_id: industry_id,
      address: address,
      timezone_id: timezone_id,
    };
    createStoreMutation.mutate(data, {
      onSuccess: async (data) => {
        toast.show(data?.message, {
          type: 'success',
        });
        setSelectedCountry({
          code: '',
          id: 0,
          name: '',
        });
        setSelectedCurrency({
          code: '',
          id: 0,
          name: '',
          symbol: '',
        });
        setSelectedIndustry({
          id: 0,
          name: '',
        });
        setSelectedTimezone({
          id: 0,
          name: '',
          code: '',
        });
        setAddressValue('');
        dispatch(
          setStoreId({
            id: data?.company?.id,
          })
        );
        setLoadingBtn(false);
        await AsyncStorage.setItem('easyretail_onboarding', 'completed');
        navigation.navigate('RegistrationSuccessfull');
      },
      onError: (error) => {
        console.error(error);
        setLoadingBtn(false);
        if (error instanceof AxiosError) {
          console.error(error?.response?.data);
          if (error?.response?.data?.message) {
            toast.show(error?.response?.data?.message, {
              type: 'danger',
            });
          }
          if (error?.response?.data?.errors?.name) {
            toast.show(error?.response?.data?.errors?.name[0], {
              type: 'danger',
            });
          }
          if (error?.response?.data?.errors?.address) {
            toast.show(error?.response?.data?.errors?.address[0], {
              type: 'danger',
            });
          }
          if (error?.response?.data?.errors?.country_id) {
            toast.show(error?.response?.data?.errors?.country_id[0], {
              type: 'danger',
            });
          }
          if (error?.response?.data?.errors?.currency_id) {
            toast.show(error?.response?.data?.errors?.currency_id[0], {
              type: 'danger',
            });
          }
          if (error?.response?.data?.errors?.industry_id) {
            toast.show(error?.response?.data?.errors?.industry_id[0], {
              type: 'danger',
            });
          }
          if (error?.response?.data?.errors?.timezone_id) {
            toast.show(error?.response?.data?.errors?.timezone_id[0], {
              type: 'danger',
            });
          }
        }
      },
    });
  };
  // **************** RENDER ITEM ****************
  const renderCountryItem = ({ item }: { item: Country }) => {
    return (
      <TouchableRipple
        rippleColor={Colors['white']}
        onPress={() => {
          setSelectedCountry(item);
          actionSheetRef.current?.hide();
          setSearch('');
          setCountries(searchCountries);
          dispatch(setStoreCountry(item.id));
        }}
      >
        <View style={styles.item}>
          <Text numberOfLines={1} style={styles.itemText}>
            {item.name}
          </Text>
        </View>
      </TouchableRipple>
    );
  };

  const renderCurrencyItem = ({ item }: { item: Currency }) => (
    <TouchableRipple
      rippleColor={Colors['white']}
      onPress={() => {
        setSelectedCurrency(item);
        currencyActionSheetRef.current?.hide();
        setCurrencySearch('');
        setCurrencies(searchCurrency);
        dispatch(setStoreCurrency(item.id));
      }}
    >
      <View style={styles.item}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.name} ({item.symbol})
        </Text>
      </View>
    </TouchableRipple>
  );

  const renderIndustryItem = ({ item }: { item: Industry }) => (
    <TouchableRipple
      rippleColor={Colors['white']}
      onPress={() => {
        setSelectedIndustry(item);
        industryActionSheetRef.current?.hide();
        setIndustrySearch('');
        setIndustries(searchIndustry);
        dispatch(setStoreIndustry(item.id));
      }}
    >
      <View style={styles.item}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.name}
        </Text>
      </View>
    </TouchableRipple>
  );

  const renderTimezoneItem = ({ item }: { item: Timezone }) => (
    <TouchableRipple
      rippleColor={Colors['white']}
      onPress={() => {
        setSelectedTimezone(item);
        timezoneActionSheetRef.current?.hide();
        setTimezoneSearch('');
        setTimezones(searchTimezone);
        dispatch(setStoreTimezone(item.id));
      }}
    >
      <View style={styles.item}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.code}
        </Text>
      </View>
    </TouchableRipple>
  );

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.safeAreaStyle}
      >
        <ScrollView
          contentContainerStyle={styles.containerContent}
          style={styles.container}
        >
          <View>
            {/* country */}
            <View style={styles.inputWrapper}>
              <TouchableRipple
                // onPress={() => console.log('country')}
                onPress={() => handleShowCountryList()}
                // onPress={() => handlePresentModalPress()}
                rippleColor={Colors['background']}
              >
                <TextInput
                  label='Country'
                  underlineColor='transparent'
                  activeOutlineColor='transparent'
                  selectionColor={Colors['activeTab']}
                  contentStyle={styles.inputContent}
                  style={styles.input}
                  editable={false}
                  theme={{
                    colors: {
                      primary: Colors['black'],
                      text: Colors['black'],
                      placeholder: Colors['white'],
                      background: Colors['white'],
                      surfaceVariant: Colors['white'],
                    },
                  }}
                  // multiline={true}
                  value={selectedCountry.name}
                  right={
                    <TextInput.Icon
                      icon={'chevron-down'}
                      // onPress={() => console.log('pressed')}
                      onPress={() => handleShowCountryList()}
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
              </TouchableRipple>
              <View style={styles.hideUnderline}></View>
            </View>
            {/* currency */}
            <View style={styles.inputWrapper}>
              <Pressable onPress={() => handleShowCurrencyList()}>
                <TextInput
                  label='Currency'
                  underlineColor='transparent'
                  activeOutlineColor='transparent'
                  selectionColor={Colors['activeTab']}
                  contentStyle={styles.inputContent}
                  style={styles.input}
                  editable={false}
                  theme={{
                    colors: {
                      primary: Colors['black'],
                      text: Colors['black'],
                      placeholder: Colors['white'],
                      background: Colors['white'],
                      surfaceVariant: Colors['white'],
                    },
                  }}
                  // multiline={true}
                  value={
                    selectedCurrency.name
                      ? `${selectedCurrency.name} (${selectedCurrency.symbol})`
                      : ''
                  }
                  right={
                    <TextInput.Icon
                      icon={'chevron-down'}
                      // onPress={() => console.log('pressed')}
                      onPress={() => handleShowCurrencyList()}
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
              </Pressable>
              <View style={styles.hideUnderline}></View>
            </View>
            {/* timezone */}
            <View style={styles.inputWrapper}>
              <Pressable onPress={() => handleShowTimezoneList()}>
                <TextInput
                  label='Timezone'
                  underlineColor='transparent'
                  activeOutlineColor='transparent'
                  selectionColor={Colors['activeTab']}
                  contentStyle={styles.inputContent}
                  style={styles.input}
                  editable={false}
                  theme={{
                    colors: {
                      primary: Colors['black'],
                      text: Colors['black'],
                      placeholder: Colors['white'],
                      background: Colors['white'],
                      surfaceVariant: Colors['white'],
                    },
                  }}
                  // multiline={true}
                  value={selectedTimezone.code}
                  right={
                    <TextInput.Icon
                      icon={'chevron-down'}
                      // onPress={() => console.log('pressed')}
                      onPress={() => handleShowTimezoneList()}
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
              </Pressable>
              <View style={styles.hideUnderline}></View>
            </View>
            {/* industry */}
            <View style={styles.inputWrapper}>
              <Pressable onPress={() => handleShowIndustryList()}>
                <TextInput
                  label='Industry'
                  underlineColor='transparent'
                  activeOutlineColor='transparent'
                  selectionColor={Colors['activeTab']}
                  contentStyle={styles.inputContent}
                  style={styles.input}
                  editable={false}
                  theme={{
                    colors: {
                      primary: Colors['black'],
                      text: Colors['black'],
                      placeholder: Colors['white'],
                      background: Colors['white'],
                      surfaceVariant: Colors['white'],
                    },
                  }}
                  // multiline={true}
                  value={selectedIndustry.name}
                  right={
                    <TextInput.Icon
                      icon={'chevron-down'}
                      // onPress={() => console.log('pressed')}
                      onPress={() => handleShowIndustryList()}
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
              </Pressable>
              <View style={styles.hideUnderline}></View>
            </View>
            {/* address */}
            <View style={styles.inputWrapper}>
              <TextInput
                label='Address'
                underlineColor='transparent'
                activeOutlineColor='transparent'
                selectionColor={Colors['activeTab']}
                contentStyle={styles.inputContent}
                style={styles.input}
                // editable={false}
                multiline={true}
                theme={{
                  colors: {
                    primary: Colors['black'],
                    text: Colors['black'],
                    placeholder: Colors['white'],
                    background: Colors['white'],
                    surfaceVariant: Colors['white'],
                  },
                }}
                value={addressValue}
                onChangeText={(text) => handleAddressChange(text)}
              />
              <View style={styles.hideUnderline}></View>
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
              loading={loadingBtn}
              disabled={loadingBtn || !selectedCountry || !selectedCurrency}
              // onPress={() => handleIndustryRedirect()}
              onPress={() => handleCreateStore()}
            >
              Submit
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
                  keyExtractor={(item) => item.id.toString()}
                  // initialNumToRender={10}
                />
              </View>
            </View>
          </ActionSheet>
          <ActionSheet
            ref={currencyActionSheetRef}
            snapPoints={[70]}
            containerStyle={styles.actionSheetContainer}
            useBottomSafeAreaPadding={true}
            gestureEnabled={true}
            CustomHeaderComponent={
              <View style={styles.searchBar}>
                <TextInput
                  placeholder='Search currency'
                  mode='outlined'
                  style={styles.searchInput}
                  contentStyle={styles.searchInputContent}
                  outlineStyle={styles.searchInputOutline}
                  onChangeText={(text) => {
                    setCurrencySearch(text);
                    handleCurrencySearch(text);
                  }}
                  value={currencySearch}
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
                        setCurrencySearch('');
                        setCurrencies(searchCurrency);
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
                  data={currencies}
                  renderItem={renderCurrencyItem}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            </View>
          </ActionSheet>
          <ActionSheet
            ref={industryActionSheetRef}
            snapPoints={[70]}
            containerStyle={styles.actionSheetContainer}
            useBottomSafeAreaPadding={true}
            gestureEnabled={true}
            CustomHeaderComponent={
              <View style={styles.searchBar}>
                <TextInput
                  placeholder='Search industry'
                  mode='outlined'
                  style={styles.searchInput}
                  contentStyle={styles.searchInputContent}
                  outlineStyle={styles.searchInputOutline}
                  onChangeText={(text) => {
                    setIndustrySearch(text);
                    handleIndustrySearch(text);
                  }}
                  value={industrySearch}
                  left={
                    <TextInput.Icon icon={'magnify'} style={styles.inputIcon} />
                  }
                  right={
                    <TextInput.Icon
                      icon={'close'}
                      onPress={() => {
                        setIndustrySearch('');
                        setIndustries(searchIndustry);
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
                  data={industries}
                  renderItem={renderIndustryItem}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            </View>
          </ActionSheet>
          <ActionSheet
            ref={timezoneActionSheetRef}
            snapPoints={[70]}
            containerStyle={styles.actionSheetContainer}
            useBottomSafeAreaPadding={true}
            gestureEnabled={true}
            CustomHeaderComponent={
              <View style={styles.searchBar}>
                <TextInput
                  placeholder='Search timezone'
                  mode='outlined'
                  style={styles.searchInput}
                  contentStyle={styles.searchInputContent}
                  outlineStyle={styles.searchInputOutline}
                  onChangeText={(text) => {
                    setTimezoneSearch(text);
                    handleTimezoneSearch(text);
                  }}
                  value={timezoneSearch}
                  left={
                    <TextInput.Icon icon={'magnify'} style={styles.inputIcon} />
                  }
                  right={
                    <TextInput.Icon
                      icon={'close'}
                      onPress={() => {
                        setTimezoneSearch('');
                        setTimezones(searchTimezone);
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
                  data={timezones}
                  renderItem={renderTimezoneItem}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            </View>
          </ActionSheet>
        </ScrollView>
      </KeyboardAvoidingView>
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
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  hideUnderline: {
    marginTop: -4,
    borderTopWidth: 8,
    borderColor: Colors['white'],
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

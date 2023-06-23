import {
    FlatList,
    // Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    // TouchableWithoutFeedback,
    View,
    Image
  } from 'react-native';
  import React, { useEffect, useState, useRef } from 'react';
  import {
    IconButton,
    TextInput,
    TouchableRipple,
  } from 'react-native-paper';
  import HeaderComponent from '@/components/Header/HeaderComponent';
  import Colors from '@/constants/Colors';
  import { useAppDispatch, useAppSelector } from '@/hooks/redux';
  import { getParentName } from '@/store/slice/hideTabsSlice';
  import { ProfileHomeProps } from '@/interfaces/navigation/profile';
  import { Button, Divider, Icon, FAB } from '@rneui/themed';
  import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
  import { EmptyListSvgComponent } from '@/assets/icons';


  const Subscriptions = ({navigation}: Omit<ProfileHomeProps<'Subscriptions'>, 'route'>) => {
    // ******************* HIDE TABS *******************
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getParentName('hideScreen'));
      return () => {
        dispatch(getParentName(''));
      };
    }, [dispatch]);

    // ****************** GO BACK ******************
    const handleBack = () => {
      navigation.goBack()
    };

    // ******************** CATEGORY ACTION SHEET ********************
    const paymentMethodActionSheetRef = useRef<ActionSheetRef>(null);

    // ******************* CATEGORY LIST *******************
    const [paymentMethodList, setPaymentMethodList] = useState([]);
  
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={styles.header}>
              <HeaderComponent title='Subscription' handleBack={handleBack} />
            </View>
            <View style={styles.subGrid}>
              <View style={styles.subBox}>
                <Text style={styles.subText}>Number of stores</Text>
                <View style={styles.quantityWrapper}>
                  <Button
                    type='clear'
                    radius={50}
                    icon={{
                      name: 'minus',
                      type: 'feather',
                      size: 20,
                      color:
                        0 === 0 ? Colors['grey'] : Colors['white'],
                    }}
                    disabled={0 === 0}
                    buttonStyle={{
                      backgroundColor: Colors['black'],
                    }}
                    onPress={() => {
                      console.log('minus');
                      // handleQuantity('minus', item?.id);
                      // setSelectedProduct({
                      //   type: 'minus',
                      //   id: item?.id,
                      // });
                    }}
                  />
                  <Text style={styles.quantity}>{0}</Text>
                  <Button
                    type='clear'
                    radius={50}
                    icon={{
                      name: 'plus',
                      type: 'feather',
                      size: 20,
                      color:
                        0 === 0
                          ? Colors['grey']
                          : Colors['white'],
                    }}
                    disabled={0 === 0}
                    buttonStyle={{
                      backgroundColor: Colors['black'],
                      overflow: 'hidden',
                    }}
                    onPress={() => {
                      console.log('plus');
                      // handleQuantity('plus', item?.id);
                      // setSelectedProduct({
                      //   type: 'plus',
                      //   id: item?.id,
                      // });
                    }}
                  />
                </View>
              </View>
              <View style={styles.subBox}>
                <Text style={styles.subText}>Number of staffs</Text>
                <View style={styles.quantityWrapper}>
                  <Button
                    type='clear'
                    radius={50}
                    icon={{
                      name: 'minus',
                      type: 'feather',
                      size: 20,
                      color:
                        0 === 0 ? Colors['grey'] : Colors['white'],
                    }}
                    disabled={0 === 0}
                    buttonStyle={{
                      backgroundColor: Colors['black'],
                    }}
                    onPress={() => {
                      console.log('minus');
                      // handleQuantity('minus', item?.id);
                      // setSelectedProduct({
                      //   type: 'minus',
                      //   id: item?.id,
                      // });
                    }}
                  />
                  <Text style={styles.quantity}>{0}</Text>
                  <Button
                    type='clear'
                    radius={50}
                    icon={{
                      name: 'plus',
                      type: 'feather',
                      size: 20,
                      color:
                        0 === 0
                          ? Colors['grey']
                          : Colors['white'],
                    }}
                    disabled={0 === 0}
                    buttonStyle={{
                      backgroundColor: Colors['black'],
                      overflow: 'hidden',
                    }}
                    onPress={() => {
                      console.log('plus');
                      // handleQuantity('plus', item?.id);
                      // setSelectedProduct({
                      //   type: 'plus',
                      //   id: item?.id,
                      // });
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.summaryButtonsWrapper}>
              <View style={styles.summaryWrapper}>
                {/* {taxValue !== 0 && ( */}
                <View style={styles.tax}>
                  <Text style={styles.taxText}>Number of stores (2k/store)</Text>
                  <Text style={styles.taxAmount}>
                    ₦2,000
                  </Text>
                </View>
                {/* )} */}
                <View style={styles.discount}>
                  <Text style={styles.discountText}>Number of staff (2k/staff)</Text>
                  <Text style={styles.discountAmount}>
                    ₦4,000
                  </Text>
                </View>
                <Divider style={{ marginBottom: 10 }} />
                <View style={styles.total}>
                  <Text style={styles.totalText}>Total</Text>
                  <Text style={styles.totalAmount}>
                    ₦6,000
                  </Text>
                </View>
              </View>
              
              <View style={styles.inputWrapper}>
                <TouchableRipple
                  onPress={() => paymentMethodActionSheetRef.current?.show()}
                  // onPress={() => handleShowCountryList()}
                  // onPress={() => handlePresentModalPress()}
                  rippleColor={Colors['background']}
                >
                  <TextInput
                    label='Choose payment method'
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
                    value={'Dom account Transfer'}
                    right={
                      <TextInput.Icon
                        icon={'chevron-down'}
                        onPress={() => console.log('pressed')}
                        // onPress={() => handleShowCountryList()}
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
            </View>
            <View style={styles.buttonsWrapper}>
                <View style={styles.chargeButton}>
                  <Button
                    type='solid'
                    title='Subscribe'
                    // onPress={() => console.log('pressed')}
                    onPress={() => {
                      console.log('pressed');
                      // handleSaleSummary();
                    }}
                    radius={10}
                    buttonStyle={{ backgroundColor: Colors['black'] }}
                    size='lg'
                  />
                </View>
              </View>
          </View>
          {/* </TouchableWithoutFeedback> */}
          <ActionSheet
            ref={paymentMethodActionSheetRef}
            gestureEnabled={true}
            snapPoints={paymentMethodList.length === 0 ? [100] : [50]}
            containerStyle={styles.actionSheetContainer}
          >
            <View style={styles.actionSheetContentBox}>
              <View style={styles.actionSheetContent}>
                <Image
                  style={styles.actionLogo}
                  source={require('/Users/paulfamous/Desktop/workspace/makarioworks/eazy-retail/assets/icons/subscriptions/bank.png')}
                />
                <Text style={styles.actionText}>Dom account bank transfer</Text>
              </View>
              <View style={styles.actionSheetContent}>
                <Image
                  style={styles.actionLogo}
                  source={require('/Users/paulfamous/Desktop/workspace/makarioworks/eazy-retail/assets/icons/subscriptions/paystack.png')}
                />
                <Text style={styles.actionText}>Paystack</Text>
              </View>
            </View>
          </ActionSheet>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default Subscriptions;
  
  const styles = StyleSheet.create({
    safeAreaStyle: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 10 : 10,
      backgroundColor: Colors['background'],
    },
    header: {
      // marginTop: 10,
      marginBottom: 10,
      marginHorizontal: 15,
    },
    contentWrapper: {
      flex: 1,
      // marginBottom: 20,
      // marginHorizontal: 15,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    content: {
      position: 'relative',
      width: '45%',
      // height: 300,
      justifyContent: 'space-between',
      alignItems: 'center',
      // borderWidth: 1,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: Colors['white'],
      marginBottom: 20,
      marginHorizontal: 10,
    },
    imageContainer: {
      // width: 170,
      // height: 170,
      // overflow: 'hidden',
    },
    image: {
      width: 200,
      height: 150,
      // resizeMode: 'contain',
    },
    quantityWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '90%',
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginHorizontal: 5,
      backgroundColor: Colors['black'],
      borderWidth: 1,
      borderRadius: 10,
    },
    quantity: {
      fontSize: 16,
      fontFamily: 'Givonic-SemiBold',
      color: Colors['white'],
    },
    subGrid: {
      width: '100%',
      flexDirection: 'column',
      marginHorizontal: 15,
      marginBottom: 20,
    },
    subBox: {
      // height: 300,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      // borderWidth: 1,
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 20,
      // marginHorizontal: 10,
    },
    subText: {
      fontSize: 16,
      fontFamily: 'Givonic-SemiBold',
      color: Colors['black'],
      marginVertical: 10,
      marginHorizontal: 15,
    },
    summaryButtonsWrapper: {
      width: '100%',
      flex: 1,
    },
    summaryWrapper: {
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 10,
      // width: '100%',
      backgroundColor: Colors['green'],
      marginHorizontal: 15,
      marginBottom: 10,
      // borderWidth: 1,
    },
    subTotal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    subTotalText: {
      fontFamily: 'Givonic-SemiBold',
      fontSize: 13,
      color: Colors['white'],
    },
    subTotalAmount: {
      fontFamily: 'Givonic-SemiBold',
      fontSize: 13,
      color: Colors['white'],
    },
    tax: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    taxText: {
      fontFamily: 'Givonic-SemiBold',
      fontSize: 13,
      color: Colors['white'],
    },
    taxAmount: {
      fontFamily: 'Givonic-SemiBold',
      fontSize: 13,
      color: Colors['white'],
    },
    discount: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    discountText: {
      fontFamily: 'Givonic-SemiBold',
      fontSize: 13,
      color: Colors['white'],
    },
    discountAmount: {
      fontFamily: 'Givonic-SemiBold',
      fontSize: 13,
      color: Colors['white'],
    },
    total: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    totalText: {
      fontFamily: 'Givonic-SemiBold',
      fontSize: 20,
      color: Colors['white'],
    },
    totalAmount: {
      fontFamily: 'Givonic-SemiBold',
      fontSize: 20,
      color: Colors['white'],
    },
    buttonsWrapper: {
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      marginHorizontal: 15,
      marginBottom: 10,
      alignSelf: 'stretch'
      // borderWidth: 1,
    },
    chargeButton: {
      // width: '100%',
      // borderWidth: 1,
      marginBottom: 10,
    },
    inputWrapper: {
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 10,
      overflow: 'hidden',
      borderWidth: 0.5,
      borderColor: Colors['border'],
      marginHorizontal: 15,
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
      backgroundColor: Colors['white'],
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  
    // ** EMPTY CATEGORY LIST IN ACTION SHEET **
    emptyContainer: {
      // flex: 1,
      // backgroundColor: Colors['background'],
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    message: {
      fontSize: 18,
      color: 'black',
      fontFamily: 'Givonic-Bold',
      textAlign: 'center',
      marginVertical: 15,
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
    actionSheetContentBox: {
      marginVertical: 40
    },
    actionSheetContent: {
      borderRadius: 10,
      marginHorizontal: 20,
      marginBottom: 20,
      padding: 25,
      backgroundColor: Colors.background,
      flexDirection: 'row',
      alignItems: 'center'
    },
    actionText: {
      marginLeft: 26,
      color: Colors.inactiveTab,
      fontWeight: "600"
    },
    actionLogo: {
      height: 24,
      width: 24
    }

  });
  
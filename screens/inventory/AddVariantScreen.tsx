import { Pressable, ScrollView, StyleSheet, View, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import HeaderComponent from '@/components/Header/HeaderComponent';
import { Button, CheckBox, Icon } from '@rneui/themed';
import Colors from '@/constants/Colors';
import { TextInput } from 'react-native-paper';
import { InventoryHomeProps } from '@/interfaces/navigation/inventory';
import moment from 'moment';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useToast } from 'react-native-toast-notifications';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addBarcode } from '@/store/slice/barcodeSlice';

const AddVariantScreen = ({
  navigation,
}: Omit<InventoryHomeProps<'AddProduct'>, 'route'>) => {
  // ****************** GO BACK ******************
  const handleBack = () => {
    navigation.goBack();
  };

  // ****************** BARCODE ******************
  const { barcode } = useAppSelector((state) => state.barcode);
  // console.log('barcode :>> ', barcode);
  const dispatch = useAppDispatch();
  const handleBarcode = () => {
    dispatch(addBarcode(''));
    navigation.navigate('AddBarcodeScanner');
  };

  const toast = useToast();

  // ****************** CHECKBOX ******************
  const [barCodeCheck, setBarCodeCheck] = useState(false);
  const [expiryCheck, setExpiryCheck] = useState(false);
  const [taxCheck, setTaxCheck] = useState(false);

  // ***************** DATE PICKER *****************
  const [expireDate, setExpireDate] = useState(
    moment().add(2, 'days').toDate()
  );
  const [showExpiryCalender, setShowExpiryCalender] = useState(false);

  const handleExpiryDate = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date || expireDate;
    setShowExpiryCalender(false);
    setExpireDate(currentDate);
  };

  // *************** HANDLE EXPIRY DATE ALERT ***************
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [expiryTrackDays, setExpiryTrackDays] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const handleAlertDate = (text: string) => {
    const checkDate = moment(expireDate).diff(
      moment().add(text, 'days'),
      'days'
    );
    // const checkDateToday = moment(expireDate).diff(moment(), 'days');
    // console.log('moment(expireDate) :>> ', moment(expireDate));
    // console.log('checkDate :>> ', checkDate);
    // console.log('checkDateToday :>> ', checkDateToday);
    // console.log(moment().add(text, 'days'));
    if (checkDate === 0 && text !== '') {
      setShowErrorMsg(true);
      setExpiryTrackDays(text);
      setErrorMsg('Alert date too close to expiry date');
    } else if (checkDate < 0 && text !== '') {
      setShowErrorMsg(true);
      setExpiryTrackDays(text);
      setErrorMsg('Alert date cannot be greater than Expiry Date');
    } else {
      setShowErrorMsg(false);
      setExpiryTrackDays(text);
    }
  };

  //  *************** TAX INPUT ***************
  const [tax, setTax] = useState('');
  const [includeTax, setIncludeTax] = useState(false);
  const handleTax = (text: string) => {
    const checkTax = parseInt(text);
    if (checkTax > 100) {
      setTax('100');
    } else {
      setTax(text);
    }
  };

  // ******************* STOCK ACTION SHEET *******************
  const stockActionSheetRef = useRef<ActionSheetRef>(null);

  const [stockForm, setStockForm] = useState({
    stock: '',
    lowStock: '',
  });

  const [errorStockMsg, setErrorStockMsg] = useState('');
  const [stockValue, setStockValue] = useState('');
  const [enableLowStock, setEnableLowStock] = useState(false);
  const [lowStockValue, setLowStockValue] = useState('');
  const [showErrorStockMsg, setShowErrorStockMsg] = useState('none');

  const handleStockValue = (text: string) => {
    const checkStock = parseInt(text);
    const checkLowStock = parseInt(lowStockValue);

    if (isNaN(checkLowStock)) {
      if (checkStock <= 0) {
        setErrorStockMsg('Stock cannot be less than 1');
        setShowErrorStockMsg('stock');
        setStockValue(text);
        setEnableLowStock(false);
      } else if (isNaN(checkStock)) {
        setErrorStockMsg('');
        setShowErrorStockMsg('none');
        setStockValue(text);
        setEnableLowStock(false);
      } else {
        setErrorStockMsg('');
        setShowErrorStockMsg('none');
        setStockValue(text);
        setEnableLowStock(true);
      }
    }
    if (!isNaN(checkLowStock)) {
      if (checkStock < checkLowStock && checkStock > 0) {
        setErrorStockMsg('Stock cannot be less than low stock');
        setShowErrorStockMsg('stock');
        setStockValue(text);
        // setEnableLowStock(false);
      } else if (checkStock === checkLowStock) {
        setErrorStockMsg('Stock cannot be equal to low stock');
        setShowErrorStockMsg('stock');
        setStockValue(text);
        // setEnableLowStock(false);
      } else if (checkStock <= 0) {
        setErrorStockMsg('Stock cannot be less than 1');
        setShowErrorStockMsg('stock');
        setStockValue(text);
        // setEnableLowStock(false);
      } else if (isNaN(checkStock)) {
        setErrorStockMsg('');
        setShowErrorStockMsg('none');
        setStockValue(text);
        // setEnableLowStock(false);
      } else {
        setErrorStockMsg('');
        setShowErrorStockMsg('none');
        setStockValue(text);
        // setEnableLowStock(true);
      }
    }
  };

  const handleLowStockValue = (text: string) => {
    const checkLowStock = parseInt(text);
    const checkStock = parseInt(stockValue);
    if (checkStock < checkLowStock) {
      setErrorStockMsg('Low stock cannot be greater than stock');
      setShowErrorStockMsg('lowStock');
      setLowStockValue(text);
    } else if (checkStock === checkLowStock) {
      setErrorStockMsg('Low stock cannot be equal to stock');
      setShowErrorStockMsg('lowStock');
      setLowStockValue(text);
    } else if (checkLowStock <= 0) {
      setErrorStockMsg('Low stock cannot be less than 1');
      setShowErrorStockMsg('lowStock');
      setLowStockValue(text);
    } else if (isNaN(checkLowStock)) {
      setErrorStockMsg('');
      setShowErrorStockMsg('none');
      setLowStockValue(text);
    } else {
      setErrorStockMsg('');
      setShowErrorStockMsg('none');
      setLowStockValue(text);
    }
  };

  const handleSaveStock = () => {
    if (showErrorStockMsg === 'none') {
      setStockForm({
        stock: stockValue,
        lowStock: lowStockValue,
      });
      setStockValue('');
      setLowStockValue('');
      setEnableLowStock(false);

      stockActionSheetRef.current?.hide();
      toast.show('Stock updated successfully', {
        type: 'success',
        duration: 2000,
      });
    }
  };
  const handleSaveVariant = () => {
    navigation.goBack();
    toast.show('Variant added successfully', {
      type: 'success',
      duration: 2000,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <View style={styles.header}>
          <HeaderComponent title='Variant' handleBack={handleBack} />
        </View>
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <TextInput
              label='Variant name'
              underlineColor='transparent'
              activeOutlineColor='transparent'
              selectionColor={Colors['activeTab']}
              contentStyle={styles.inputContent}
              theme={{
                colors: {
                  primary: Colors['black'],
                  text: Colors['black'],
                  placeholder: Colors['white'],
                  background: Colors['white'],
                  surfaceVariant: Colors['white'],
                },
              }}
            />
            <View style={styles.hideUnderline}></View>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              label='Selling price'
              underlineColor='transparent'
              activeOutlineColor='transparent'
              selectionColor={Colors['activeTab']}
              keyboardType='numeric'
              contentStyle={styles.inputContent}
              left={
                <TextInput.Affix
                  text='₦'
                  textStyle={{ color: Colors['black'], paddingRight: 5 }}
                />
              }
              theme={{
                colors: {
                  primary: Colors['black'],
                  text: Colors['black'],
                  placeholder: Colors['white'],
                  background: Colors['white'],
                  surfaceVariant: Colors['white'],
                },
              }}
            />
            <View style={styles.hideUnderline}></View>
          </View>
          <View style={styles.purchaseMargin}>
            <View style={styles.purchaseMarginWrapper}>
              <TextInput
                label='Purchase price'
                underlineColor='transparent'
                activeOutlineColor='transparent'
                selectionColor={Colors['activeTab']}
                keyboardType='numeric'
                contentStyle={styles.inputContent}
                left={
                  <TextInput.Affix
                    text='₦'
                    textStyle={{ color: Colors['black'], paddingRight: 5 }}
                  />
                }
                theme={{
                  colors: {
                    primary: Colors['black'],
                    text: Colors['black'],
                    placeholder: Colors['white'],
                    background: Colors['white'],
                    surfaceVariant: Colors['white'],
                  },
                }}
              />

              <View style={styles.hideUnderline}></View>
            </View>
            <View>
              <Text style={styles.marginText}>Margin (%)</Text>
              <Text style={styles.marginValue}>4.89%</Text>
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <Pressable onPress={() => stockActionSheetRef.current?.show()}>
              <>
                <TextInput
                  label='Stock'
                  underlineColor='transparent'
                  activeOutlineColor='transparent'
                  selectionColor={Colors['activeTab']}
                  contentStyle={styles.inputContent}
                  value={stockForm?.stock}
                  right={
                    <TextInput.Icon
                      icon={'chevron-down'}
                      // style={styles.inputIcon}
                      size={30}
                      onPress={() => stockActionSheetRef.current?.show()}
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
                />
                <View style={styles.hideUnderline}></View>
              </>
            </Pressable>
          </View>
          <View style={styles.barcodeWrapper}>
            <Pressable onPress={() => setBarCodeCheck(!barCodeCheck)}>
              <View style={styles.barcode}>
                <Text style={styles.barcodeLabel}>Barcode</Text>
                <View style={styles.checkboxwrapper}>
                  <CheckBox
                    checked={barCodeCheck}
                    iconType='material-community'
                    checkedColor={Colors['activeFilter']}
                    checkedIcon={
                      <Icon
                        name='checkbox-marked'
                        type='material-community'
                        size={25}
                        color={Colors['activeFilter']}
                      />
                    }
                    uncheckedColor={Colors['activeFilter']}
                    uncheckedIcon={
                      <Icon
                        name='checkbox-blank-outline'
                        type='material-community'
                        size={25}
                        color={Colors['activeFilter']}
                      />
                    }
                    onPress={() => setBarCodeCheck(!barCodeCheck)}
                  />
                </View>
              </View>
            </Pressable>
            {barCodeCheck && (
              <View style={styles.barcodeInputWrapper}>
                <View style={styles.barcodeInput}>
                  <TextInput
                    mode='outlined'
                    placeholder='N/A'
                    dense
                    value={barcode}
                    // underlineColor='transparent'
                    activeOutlineColor={Colors['border']}
                    outlineColor={Colors['border']}
                    outlineStyle={{
                      borderWidth: 0.5,
                    }}
                    // selectionColor={Colors['activeTab']}
                    contentStyle={styles.inputContent}
                    theme={{
                      colors: {
                        primary: Colors['border'],
                        text: Colors['border'],
                        placeholder: Colors['white'],
                        background: Colors['white'],
                        surfaceVariant: Colors['white'],
                      },
                    }}
                  />
                  {/* <View style={styles.hideUnderline}></View> */}
                </View>
                <Button
                  title='Scan'
                  type='clear'
                  // onPress={() => console.log('pressed')}
                  onPress={() => handleBarcode()}
                  titleStyle={{ color: Colors['black'] }}
                />
              </View>
            )}
          </View>

          <View style={styles.trackExpiryWrapper}>
            <Pressable onPress={() => setExpiryCheck(!expiryCheck)}>
              <View style={styles.trackExpiry}>
                <Text style={styles.trackExpiryLabel}>Track expiry</Text>
                <View style={styles.checkboxwrapper}>
                  <CheckBox
                    checked={expiryCheck}
                    iconType='material-community'
                    checkedColor={Colors['activeFilter']}
                    checkedIcon={
                      <Icon
                        name='checkbox-marked'
                        type='material-community'
                        size={25}
                        color={Colors['activeFilter']}
                      />
                    }
                    uncheckedColor={Colors['activeFilter']}
                    uncheckedIcon={
                      <Icon
                        name='checkbox-blank-outline'
                        type='material-community'
                        size={25}
                        color={Colors['activeFilter']}
                      />
                    }
                    onPress={() => setExpiryCheck(!expiryCheck)}
                  />
                </View>
              </View>
            </Pressable>
            {expiryCheck && (
              <View style={styles.trackExpiryInputWrapper}>
                <View style={styles.expiryInputWrapper}>
                  <View style={styles.expiryDateInput}>
                    {showExpiryCalender && (
                      <DateTimePicker
                        mode='date'
                        value={expireDate}
                        onChange={handleExpiryDate}
                        minimumDate={moment().add(2, 'days').toDate()}
                      />
                    )}
                    <Pressable
                      onPress={() => setShowExpiryCalender(true)}
                      // android_ripple={{
                      //   color: Colors['activeTab'],
                      // }}
                    >
                      <TextInput
                        label='Expiry date'
                        underlineColor='transparent'
                        activeOutlineColor='transparent'
                        selectionColor={Colors['activeTab']}
                        contentStyle={styles.inputContent}
                        value={moment(expireDate).format('MM/DD/YY')}
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
                      />
                      <View style={styles.hideUnderline}></View>
                    </Pressable>
                  </View>
                  <View style={styles.expiryInput}>
                    <TextInput
                      label='Expiry date alert'
                      placeholder='3 days before'
                      underlineColor='transparent'
                      activeOutlineColor='transparent'
                      selectionColor={Colors['activeTab']}
                      contentStyle={styles.inputContent}
                      keyboardType='number-pad'
                      value={expiryTrackDays}
                      onChangeText={handleAlertDate}
                      theme={{
                        colors: {
                          primary: Colors['black'],
                          text: Colors['black'],
                          placeholder: Colors['white'],
                          background: Colors['white'],
                          surfaceVariant: Colors['white'],
                        },
                      }}
                    />
                    <View style={styles.hideUnderline}></View>
                  </View>
                </View>
                {showErrorMsg && (
                  <Text style={styles.errorMessage}>{errorMsg}</Text>
                )}
              </View>
            )}
          </View>

          <View style={styles.taxWrapper}>
            <Pressable onPress={() => setTaxCheck(!taxCheck)}>
              <View style={styles.taxHeader}>
                <Text style={styles.taxLabel}>Add Tax (%)</Text>
                <View style={styles.checkboxwrapper}>
                  <CheckBox
                    checked={taxCheck}
                    iconType='material-community'
                    checkedColor={Colors['activeFilter']}
                    checkedIcon={
                      <Icon
                        name='checkbox-marked'
                        type='material-community'
                        size={25}
                        color={Colors['activeFilter']}
                      />
                    }
                    uncheckedColor={Colors['activeFilter']}
                    uncheckedIcon={
                      <Icon
                        name='checkbox-blank-outline'
                        type='material-community'
                        size={25}
                        color={Colors['activeFilter']}
                      />
                    }
                    onPress={() => setTaxCheck(!taxCheck)}
                  />
                </View>
              </View>
            </Pressable>
            {taxCheck && (
              <View style={styles.taxInputWrapper}>
                <View style={styles.taxInput}>
                  <TextInput
                    label='Enter tax'
                    // placeholder='0'
                    underlineColor='transparent'
                    activeOutlineColor='transparent'
                    selectionColor={Colors['activeTab']}
                    contentStyle={styles.inputContent}
                    keyboardType='number-pad'
                    value={tax}
                    onChangeText={handleTax}
                    theme={{
                      colors: {
                        primary: Colors['black'],
                        text: Colors['black'],
                        placeholder: Colors['white'],
                        background: Colors['white'],
                        surfaceVariant: Colors['white'],
                      },
                    }}
                  />
                  <View style={styles.hideUnderline}></View>
                </View>
                <View style={styles.includeTaxWrapper}>
                  <Pressable
                    onPress={() => setIncludeTax(!includeTax)}
                    disabled={tax === ''}
                    style={styles.includeTax}
                  >
                    <CheckBox
                      checked={includeTax}
                      disabled={tax === ''}
                      title='Inclusive'
                      textStyle={styles.includeTaxLabel}
                      iconType='material-community'
                      checkedColor={Colors['activeFilter']}
                      checkedIcon={
                        <Icon
                          name='checkbox-marked'
                          type='material-community'
                          size={25}
                          color={Colors['activeFilter']}
                        />
                      }
                      uncheckedColor={Colors['activeFilter']}
                      uncheckedIcon={
                        <Icon
                          name='checkbox-blank-outline'
                          type='material-community'
                          size={25}
                          color={Colors['activeFilter']}
                        />
                      }
                      onPress={() => setIncludeTax(!includeTax)}
                    />
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.footerWrapper}>
        <View style={styles.buttonsWrapper}>
          <View style={styles.saveButton}>
            <Button
              type='solid'
              title='Save variant'
              // onPress={() => console.log('pressed')}
              onPress={() => {
                handleSaveVariant();
              }}
              icon={{
                name: 'check',
                type: 'entypo',
                color: Colors['white'],
                size: 20,
              }}
              radius={10}
              buttonStyle={{ backgroundColor: Colors['black'] }}
              size='lg'
            />
          </View>
          <View style={styles.deleteButton}>
            <Button
              type='clear'
              title='Delete'
              // icon='trash-2'
              onPress={() => {
                // handleClearAll();
                navigation.goBack();
              }}
              radius={10}
              titleStyle={{ color: Colors['black'] }}
            />
          </View>
        </View>
      </View>
      <ActionSheet
        ref={stockActionSheetRef}
        gestureEnabled={true}
        // snapPoints={[90]}
        containerStyle={styles.actionSheetContainer}
      >
        <View style={styles.stockActionSheetContainer}>
          <View style={styles.currentUpdatedStockWrapper}>
            <View style={styles.currentStockWrapper}>
              <Text style={styles.currentStockTitle}>Current stock</Text>
              <Text numberOfLines={1} style={styles.currentStockValue}>
                {stockForm?.stock === '' ? 0 : stockForm?.stock}
              </Text>
            </View>
            <View style={styles.updatedStockWrapper}>
              <Text style={styles.updatedStockTitle}>Low Stock Alert</Text>
              <Text numberOfLines={1} style={styles.updatedStockValue}>
                {stockForm?.lowStock === '' ? 0 : stockForm?.lowStock}
              </Text>
            </View>
          </View>
          <View style={styles.stockInputErrorWrapper}>
            <View
              style={[
                styles.stockInputWrapper,
                {
                  borderColor:
                    showErrorStockMsg === 'stock'
                      ? Colors['red-500']
                      : Colors['border'],
                },
              ]}
            >
              <TextInput
                label='Available quantity'
                underlineColor='transparent'
                activeOutlineColor='transparent'
                selectionColor={Colors['activeTab']}
                contentStyle={styles.inputContent}
                value={stockValue}
                onChangeText={(text) => {
                  handleStockValue(text);
                }}
                theme={{
                  colors: {
                    primary: Colors['black'],
                    text: Colors['black'],
                    placeholder: Colors['white'],
                    background: Colors['white'],
                    surfaceVariant: Colors['white'],
                  },
                }}
                keyboardType='number-pad'
              />
              <View style={styles.hideUnderline}></View>
            </View>
            {showErrorStockMsg === 'stock' && (
              <Text style={styles.errorStockMsg}>{errorStockMsg}</Text>
            )}
          </View>
          <View style={styles.stockInputErrorWrapper}>
            <View
              style={[
                styles.stockInputWrapper,
                {
                  borderColor:
                    showErrorStockMsg === 'lowStock'
                      ? Colors['red-500']
                      : Colors['border'],
                },
              ]}
            >
              <TextInput
                label='Low stock alert value'
                underlineColor='transparent'
                activeOutlineColor='transparent'
                selectionColor={Colors['activeTab']}
                contentStyle={styles.inputContent}
                disabled={!enableLowStock}
                value={lowStockValue}
                onChangeText={(text) => {
                  handleLowStockValue(text);
                }}
                theme={{
                  colors: {
                    primary: Colors['black'],
                    text: Colors['black'],
                    placeholder: Colors['white'],
                    background: Colors['white'],
                    surfaceVariant: Colors['white'],
                  },
                }}
                keyboardType='number-pad'
              />
              <View
                style={[
                  styles.hideUnderline,
                  {
                    borderColor: !enableLowStock
                      ? Colors['grey-200']
                      : Colors['white'],
                  },
                ]}
              ></View>
            </View>
            {showErrorStockMsg === 'lowStock' && (
              <Text style={styles.errorStockMsg}>{errorStockMsg}</Text>
            )}
          </View>
          <View style={styles.stockSubmitButtonWrapper}>
            <Button
              type='solid'
              title='Save'
              onPress={() => {
                handleSaveStock();
              }}
              icon={{
                name: 'check',
                type: 'entypo',
                color: Colors['white'],
                size: 20,
              }}
              radius={10}
              buttonStyle={{ backgroundColor: Colors['black'], height: 50 }}
              size='lg'
              disabled={
                stockValue === '' ||
                errorStockMsg !== '' ||
                lowStockValue === '' ||
                !enableLowStock ||
                showErrorStockMsg !== 'none' ||
                isNaN(parseInt(stockValue)) ||
                isNaN(parseInt(lowStockValue))
              }
            />
          </View>
        </View>
      </ActionSheet>
    </ScrollView>
  );
};

export default AddVariantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  contentContainer: {
    // paddingTop: 15,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  form: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  footerWrapper: {
    // marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonsWrapper: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
    // borderWidth: 1,
  },
  saveButton: {
    // width: '100%',
    // borderWidth: 1,
    marginBottom: 10,
  },
  deleteButton: {
    // width: '100%',
    // borderWidth: 1,
  },
  inputWrapper: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  inputContent: {
    // backgroundColor: 'white',
    // paddingLeft: 10,
  },
  hideUnderline: {
    marginTop: -4,
    borderTopWidth: 8,
    borderColor: Colors['white'],
  },
  purchaseMargin: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  purchaseMarginWrapper: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    width: '78%',
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  marginText: {
    fontSize: 14,
    // fontWeight: 'bold',
    fontFamily: 'Givonic-SemiBold',
  },
  marginValue: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'Givonic-SemiBold',
  },
  barcodeWrapper: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors['white'],
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  barcode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  barcodeLabel: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'Givonic-SemiBold',
  },
  checkboxwrapper: {
    // padding: 10,
    // borderRadius: 10,
  },
  checkbox: {
    padding: 0,
    // borderRadius: 10,
    // borderWidth: 1,
  },
  barcodeInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 15,
    // paddingRight: 10,
  },
  barcodeInput: {
    width: '80%',
  },
  trackExpiryWrapper: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors['white'],
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  trackExpiry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  trackExpiryLabel: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'Givonic-SemiBold',
  },
  trackExpiryInputWrapper: {},
  expiryInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 15,
    // paddingRight: 10,
  },
  expiryDateInput: {
    width: '45%',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  expiryInput: {
    width: '50%',
    borderWidth: 0.5,
    borderColor: Colors['border'],
    borderRadius: 10,
    overflow: 'hidden',
  },
  expiryDateAlertWrapper: {},
  errorMessage: {
    color: Colors['red'],
    fontSize: 12,
    fontFamily: 'Givonic-Regular',
    marginRight: 10,
    // width: '100%',
    textAlign: 'right',
  },
  taxWrapper: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors['white'],
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  taxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  taxLabel: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'Givonic-SemiBold',
  },
  taxInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 15,
    // paddingRight: 10,
  },
  taxInput: {
    width: '65%',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  includeTaxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 10,
    // paddingBottom: 15,
    // paddingRight: 10,
  },
  includeTax: {
    // fontSize: 16,
    // fontWeight: 'bold',
    // fontFamily: 'Givonic-SemiBold',
  },
  includeTaxLabel: {
    fontSize: 13,
    fontWeight: '500',
    // fontFamily: 'Givonic-Regular',
  },
  // *********** STOCK ACTION SHEET ****************
  actionSheetContainer: {
    backgroundColor: Colors['white'],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  stockActionSheetContainer: {
    // borderWidth: 1,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  currentUpdatedStockWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    // borderWidth: 1,
  },
  currentStockWrapper: {
    // borderWidth: 1,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderWidth: 0.5,
    borderColor: Colors['border'],
    borderRadius: 10,
  },
  currentStockTitle: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 18,
    color: Colors['black'],
    textAlign: 'center',
  },
  currentStockValue: {
    fontFamily: 'Givonic-Bold',
    fontSize: 20,
    color: Colors['black'],
    textAlign: 'center',
    width: 120,
    // borderWidth: 0.5,
  },
  updatedStockWrapper: {
    // borderWidth: 1,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 0.5,
    borderColor: Colors['border'],
    borderRadius: 10,
  },
  updatedStockTitle: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 18,
    color: Colors['black'],
    textAlign: 'center',
  },
  updatedStockValue: {
    fontFamily: 'Givonic-Bold',
    fontSize: 20,
    color: Colors['black'],
    textAlign: 'center',
    width: 120,
    // borderWidth: 0.5,
  },
  stockInputErrorWrapper: {
    // marginTop: 20,
    marginBottom: 20,
  },
  stockInputWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  stockSubmitButtonWrapper: {
    marginTop: 40,
    marginBottom: 10,
  },
  errorStockMsg: {
    color: Colors['red'],
    fontSize: 12,
    fontFamily: 'Givonic-Regular',
    marginRight: 10,
    // width: '100%',
    textAlign: 'right',
  },
  barcodeScannerWrapper: {
    backgroundColor: Colors['white'],
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
  },
});

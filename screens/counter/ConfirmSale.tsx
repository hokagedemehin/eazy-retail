import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getParentName } from '@/store/slice/hideTabsSlice';
import HeaderComponent from '@/components/Header/HeaderComponent';
import Colors from '@/constants/Colors';
import { Button, CheckBox, Divider, Icon } from '@rneui/themed';
import { thousandSeperators } from '@/utils/thousandSeperators';
import {
  TouchableRipple,
  Chip,
  TextInput as RNPTextInput,
} from 'react-native-paper';
import { CounterConfirmSaleNavigation } from '@/interfaces/navigation/counter';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { addSale } from '@/store/slice/newSaleSlice';
import {
  CardPaymentSvgComponent,
  CashPaymentSvgComponent,
  CreditPaymentSvgComponent,
} from '@/assets/icons';
import { setSaleSummary } from '@/store/slice/saleSummarySlice';
import { RootState } from '@/store/store';

const ConfirmSaleComp = ({ navigation }: CounterConfirmSaleNavigation) => {
  const dispatch = useAppDispatch();
  const { selectedSales } = useAppSelector((state) => state.newSale);

  // console.log('selectedSales', selectedSales);

  // ******************* SUBTOTAL, TAX, DISCOUNT, TOTAL ************************
  // calculate the total price of the selected products
  const subTotal = selectedSales.reduce((acc, item) => acc + item.total, 0);

  // useCallback(() => {
  //   setFinalTotal(subTotal);
  // }, [subTotal]);

  const [finalTotal, setFinalTotal] = useState(subTotal);

  // calculate the tax of 5% of the total price
  const [taxValue, setTaxValue] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState('');
  const [savedTax, setSavedTax] = useState('');

  // *********************** ADD TAX ***********************
  const handleSetTaxPercentage = (value: string) => {
    setTaxPercentage(value);
    if (Number(value) > 100) {
      setTaxPercentage('100');
    } else if (Number(value) < 0) {
      setTaxPercentage('0');
    } else if (value !== '' && Number(value) <= 100 && Number(value) >= 0) {
      setTaxPercentage(value);
    } else {
      setTaxPercentage('');
    }
  };
  const handleAddTax = () => {
    const tax = subTotal * (Number(taxPercentage) / 100);
    // console.log('tax', tax);
    setTaxValue(tax);
    setSavedTax(taxPercentage);
    const newTotal = finalTotal + tax;
    setFinalTotal(newTotal);
  };

  // const tax = subTotal * 0.05;

  // calculate the discount of 5% of the total price
  // const discount = subTotal * 0.05;

  // ************************* ADD DISCOUNT *************************
  const [globalDiscount, setGlobalDiscount] = useState('');

  const handleSetDiscountValue = (value: string) => {
    setGlobalDiscount(value);
    if (Number(value) > subTotal) {
      setGlobalDiscount(String(subTotal));
    } else if (Number(value) < 0) {
      setGlobalDiscount('0');
    } else if (
      value !== '' &&
      Number(value) <= subTotal &&
      Number(value) >= 0
    ) {
      setGlobalDiscount(value);
    } else {
      setGlobalDiscount('');
    }
  };

  const handleAddDiscount = () => {
    const discount = Number(globalDiscount);
    const newTotal = finalTotal - discount;
    setFinalTotal(newTotal);
  };

  // calculate the total price of the selected products
  // const total = subTotal + tax;

  // ******************** RECALCULATE TOTAL PRICE ********************
  useMemo(() => {
    if (savedTax !== '' && globalDiscount !== '') {
      const tax = subTotal * (Number(savedTax) / 100);
      setFinalTotal(subTotal + tax - Number(globalDiscount));
    } else if (savedTax !== '') {
      const tax = subTotal * (Number(savedTax) / 100);
      setFinalTotal(subTotal + tax);
    } else if (globalDiscount !== '') {
      setFinalTotal(subTotal - Number(globalDiscount));
    } else {
      setFinalTotal(subTotal);
    }
    // setFinalTotal(subTotal)
  }, [subTotal, savedTax, globalDiscount]);

  //  ***************** REMOVE TAB BAR *****************
  useEffect(() => {
    dispatch(getParentName('hideScreen'));
    return () => {
      dispatch(getParentName(''));
    };
  }, [dispatch]);

  // useEffect(() => {
  //   return () => {
  //     // dispatch(addSale([]));
  //   };
  // }, [dispatch]);

  // useEffect(() => {
  //   // if selectedSales is empty, go back to the previous page
  //   if (selectedSales.length === 0) {
  //     navigation.goBack();
  //   }
  // }, [selectedSales, navigation]);

  // ****************** GO BACK ******************
  const handleBack = () => {
    navigation.goBack();
  };

  // ****************** RENDER SINGLE PRODUCT ******************
  type ProductTypes = {
    id: string | number;
    name: string;
    price: number;
    discount: number;
    sellingPrice: number;
    isFree: boolean;
    isGift: boolean;
    quantity: number;
    image: string;
    changeQuantity: number;
    total: number;
  };

  const renderSingleProduct = ({ item }: { item: ProductTypes }) => {
    return (
      <View style={styles.touchableWrapper}>
        <TouchableRipple
          onPress={() => handleOpenActionSheet(item.id)}
          // onPress={() => console.log('pressed')}
          rippleColor={Colors['background']}
          style={styles.listCardWrapper}
        >
          <>
            <View style={styles.imageDescription}>
              <Image
                source={{
                  uri: item?.image,
                }}
                style={styles.image}
              />
              <View style={styles.description}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={styles.sellingPrice}>
                  {item?.changeQuantity} x ₦
                  {thousandSeperators(item?.sellingPrice)}
                </Text>
              </View>
            </View>
            <View style={styles.totalPriceWrapper}>
              <Text numberOfLines={1} style={styles.totalPriceText}>
                ₦{thousandSeperators(item?.total)}
              </Text>
              <Icon name='chevron-right' />
            </View>
          </>
        </TouchableRipple>
      </View>
    );
  };

  // ******************* ACTION SHEET *******************
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const taxActionSheetRef = useRef<ActionSheetRef>(null);
  const discountActionSheetRef = useRef<ActionSheetRef>(null);
  const paymentActionSheetRef = useRef<ActionSheetRef>(null);
  const [updatedProducts, setUpdatedProducts] = useState(selectedSales);
  const [actionProduct, setActionProduct] = useState<(typeof selectedSales)[0]>(
    {
      id: '',
      name: '',
      price: 0,
      discount: 0,
      discountPercent: 0,
      sellingPrice: 0,
      isFree: false,
      isGift: false,
      quantity: 0,
      changeQuantity: 0,
      image: '',
      total: 0,
    }
  );

  // console.log('actionProduct :>> ', actionProduct);

  const handleOpenActionSheet = (id: string | number) => {
    // filter the selectedSales array to get the id of the product
    const filteredProduct = selectedSales.filter((item) => item.id === id);
    setActionProduct(filteredProduct[0]);
    setDiscountPerItem(filteredProduct[0].discount.toString());
    setDiscountValue(filteredProduct[0].discountPercent.toString());
    actionSheetRef.current?.show();
  };

  const handleCloseActionSheet = () => {
    setDiscountPerItem('');
    setDiscountValue('');
    // setFreeGift({
    //   free: false,
    //   gift: false,
    // });
    actionSheetRef.current?.hide();
  };

  // ****************** HANDLE UPDATE QUANTITY ******************
  function handleUpdateQuantity(type: string) {
    if (type === 'plus') {
      const newActionProduct = actionProduct.changeQuantity + 1;
      const total = newActionProduct * actionProduct.sellingPrice;
      const newObj = {
        ...actionProduct,
        changeQuantity: newActionProduct,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
    } else if (type === 'minus') {
      const newActionProduct = actionProduct.changeQuantity - 1;
      const total = newActionProduct * actionProduct.sellingPrice;
      const newObj = {
        ...actionProduct,
        changeQuantity: newActionProduct,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
    }
  }

  const [discountValue, setDiscountValue] = useState('');
  const [discountPerItem, setDiscountPerItem] = useState('');

  const handleDiscountValue = (value: string) => {
    // set the value to the discountValue state
    setDiscountValue(value);
    let discountAmount = 0;
    let discountPercent = 0;
    let sellingPrice = 0;
    let total = 0;
    if (Number(value) > 100) {
      setDiscountValue('100');
      setDiscountPerItem(actionProduct.price.toString());
      discountAmount = actionProduct.price;
      discountPercent = 100;
      sellingPrice = actionProduct.price - discountAmount;
      total = actionProduct.changeQuantity * sellingPrice;
      const newObj = {
        ...actionProduct,
        discount: discountAmount,
        discountPercent,
        sellingPrice,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
    } else if (Number(value) < 0) {
      setDiscountValue('0');
      setDiscountPerItem('0');
      discountAmount = 0;
      discountPercent = 0;
      sellingPrice = actionProduct.price - discountAmount;
      total = actionProduct.changeQuantity * sellingPrice;
      const newObj = {
        ...actionProduct,
        discount: discountAmount,
        discountPercent,
        sellingPrice,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
    } else if (value !== '' && Number(value) <= 100 && Number(value) >= 0) {
      // convert the value to a two decimal place number
      // console.log(Number(value) > 0);
      const newValue = Number(parseFloat(value).toFixed(0));

      // calculate the discount of the action product
      const discount = (newValue / 100) * actionProduct.price;
      // set the discount value to discount per item state
      setDiscountPerItem(discount.toFixed(0).toString());
      discountAmount = discount;
      discountPercent = newValue;
      sellingPrice = actionProduct.price - discountAmount;
      total = actionProduct.changeQuantity * sellingPrice;
      const newObj = {
        ...actionProduct,
        discount: discountAmount,
        discountPercent,
        sellingPrice,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
    } else {
      setDiscountPerItem('');
      discountAmount = 0;
      discountPercent = 0;
      sellingPrice = actionProduct.price - discountAmount;
      total = actionProduct.changeQuantity * sellingPrice;
      const newObj = {
        ...actionProduct,
        discount: discountAmount,
        discountPercent,
        sellingPrice,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
      // handleHideNewPrice();
    }
  };

  const handleDiscountPerItem = (value: string) => {
    // set the value to the discountPerItem state
    setDiscountPerItem(value);
    let discountAmount = 0;
    let discountPercent = 0;
    let sellingPrice = 0;
    let total = 0;
    if (Number(value) > actionProduct.price) {
      setDiscountPerItem(actionProduct.price.toString());
      setDiscountValue('100');
      discountAmount = actionProduct.price;
      discountPercent = 100;
      sellingPrice = actionProduct.price - discountAmount;
      total = actionProduct.changeQuantity * sellingPrice;
      const newObj = {
        ...actionProduct,
        discount: discountAmount,
        discountPercent,
        sellingPrice,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
    } else if (Number(value) < 0) {
      setDiscountPerItem('0');
      setDiscountValue('0');
      discountAmount = 0;
      discountPercent = 0;
      sellingPrice = actionProduct.price - discountAmount;
      const newObj = {
        ...actionProduct,
        discount: discountAmount,
        discountPercent,
        sellingPrice,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
    } else if (
      value !== '' &&
      Number(value) > 0 &&
      Number(value) <= actionProduct.price
    ) {
      // convert the value to a two decimal place number
      const newValue = Number(parseFloat(value).toFixed(0));

      // calculate the discount of the action product
      const discount = ((newValue / actionProduct.price) * 100).toFixed(0);
      // console.log('discount :>> ', discount);
      // set the discount value to discount per item state
      setDiscountValue(discount.toString());
      discountAmount = newValue;
      discountPercent = Number(discount);
      sellingPrice = actionProduct.price - discountAmount;
      total = actionProduct.changeQuantity * sellingPrice;
      const newObj = {
        ...actionProduct,
        discount: discountAmount,
        discountPercent,
        sellingPrice,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
    } else {
      setDiscountValue('');
      discountAmount = 0;
      discountPercent = 0;
      sellingPrice = actionProduct.price - discountAmount;
      total = actionProduct.changeQuantity * sellingPrice;
      const newObj = {
        ...actionProduct,
        discount: discountAmount,
        discountPercent,
        sellingPrice,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
    }
  };

  // ****************** HANDLE UPDATE REDUX ******************
  const handleUpdateProduct = () => {
    // filter out the product if the changeQuantity is 0
    if (actionProduct.changeQuantity === 0) {
      const filteredProduct = selectedSales.filter(
        (item) => item.id !== actionProduct.id
      );
      dispatch(addSale(filteredProduct));
      // actionSheetRef.current?.hide();
      handleCloseActionSheet();

      return;
    }
    // update the selectedSales array
    const newSelectedSales = selectedSales.map((item) =>
      item.id === actionProduct.id ? actionProduct : item
    );
    dispatch(addSale(newSelectedSales));
    // close the action sheet
    // actionSheetRef.current?.hide();
    handleCloseActionSheet();
  };

  // ****************** HANDLE FREE / GIFT ******************
  const handleFreeGift = (type: string) => {
    if (type === 'free') {
      setDiscountPerItem('');
      setDiscountValue('');
      let total = 0;
      if (!actionProduct.isFree) {
        total = 0;
      } else {
        total = actionProduct.changeQuantity * actionProduct.price;
      }
      const newObj = {
        ...actionProduct,
        discount: !actionProduct.isFree ? actionProduct.price : 0,
        sellingPrice: !actionProduct.isFree ? 0 : actionProduct.price,
        isFree: !actionProduct.isFree,
        isGift: false,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
    } else if (type === 'gift') {
      setDiscountPerItem('');
      setDiscountValue('');
      let total = 0;
      if (!actionProduct.isGift) {
        total = 0;
      } else {
        total = actionProduct.changeQuantity * actionProduct.price;
      }
      const newObj = {
        ...actionProduct,
        discount: !actionProduct.isGift ? actionProduct.price : 0,
        sellingPrice: !actionProduct.isGift ? 0 : actionProduct.price,
        isFree: false,
        isGift: !actionProduct.isGift,
        total,
      };
      setActionProduct(newObj);
      const index = updatedProducts.findIndex((item) => item.id === newObj.id);
      const newUpdatedProducts = [...updatedProducts];
      newUpdatedProducts[index] = newObj;
      setUpdatedProducts(newUpdatedProducts);
    }
  };

  // ******************* SALES SUMMARY REDUX *******************

  const { saleSummary } = useAppSelector(
    (state: RootState) => state.saleSummary
  );
  const handleSaleSummary = () => {
    const newSalesSummary = {
      ...saleSummary,
      subtotal: subTotal,
      tax: taxValue,
      discount: Number(globalDiscount),
      total: finalTotal,
    };
    dispatch(setSaleSummary(newSalesSummary));
    paymentActionSheetRef.current?.show();
  };

  // ******************* HANDLE CLEAR ALL *******************
  const handleClearAll = () => {
    setUpdatedProducts([]);
    setActionProduct({
      id: '',
      name: '',
      price: 0,
      discount: 0,
      discountPercent: 0,
      sellingPrice: 0,
      isFree: false,
      isGift: false,
      quantity: 0,
      changeQuantity: 0,
      image: '',
      total: 0,
    });
    setFinalTotal(0);
    setTaxPercentage('');
    setTaxValue(0);
    setGlobalDiscount('');
    dispatch(addSale([]));
  };

  // ********************* HANDLE PAYMENT METHOD *******************
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handlePaymentMethod = (type: string) => {
    if (type === 'cash') {
      const newSaleSummary = {
        ...saleSummary,
        customerName,
        customerPhone,
        paymentMethod: type,
      };
      dispatch(setSaleSummary(newSaleSummary));
      paymentActionSheetRef.current?.hide();
      navigation.navigate('CashPayment');
    } else if (type === 'card') {
      const newSaleSummary = {
        ...saleSummary,
        customerName,
        customerPhone,
        paymentMethod: type,
      };
      dispatch(setSaleSummary(newSaleSummary));
    } else if (type === 'credit') {
      const newSaleSummary = {
        ...saleSummary,
        customerName,
        customerPhone,
        paymentMethod: type,
      };
      dispatch(setSaleSummary(newSaleSummary));
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.header}>
        <HeaderComponent title='Sell Product' handleBack={handleBack} />
      </View>
      <View style={styles.container}>
        <View style={styles.addItemWrapper}>
          <Button
            type='solid'
            title='Add new item'
            // onPress={() => navigation.navigate('CounterAddItem')}
            onPress={() => console.log('pressed')}
            buttonStyle={styles.addItemButton}
            titleStyle={styles.addItemButtonText}
          />
        </View>
        <View style={styles.itemListWrapper}>
          <FlatList
            data={selectedSales}
            renderItem={renderSingleProduct}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.summaryButtonsWrapper}>
          <View style={styles.summaryWrapper}>
            <View style={styles.subTotal}>
              <Text style={styles.subTotalText}>Subtotal</Text>
              <Text style={styles.subTotalAmount}>
                ₦{thousandSeperators(subTotal)}
              </Text>
            </View>
            {/* {taxValue !== 0 && ( */}
            <View style={styles.tax}>
              <Text style={styles.taxText}>{`Tax (${savedTax}%)`}</Text>
              <Text style={styles.taxAmount}>
                ₦{thousandSeperators(Number(taxValue))}
              </Text>
            </View>
            {/* )} */}
            <View style={styles.discount}>
              <Text style={styles.discountText}>Discount</Text>
              <Text style={styles.discountAmount}>
                ₦{thousandSeperators(Number(globalDiscount))}
              </Text>
            </View>
            <Divider style={{ marginBottom: 10 }} />
            <View style={styles.total}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>
                ₦{thousandSeperators(finalTotal)}
              </Text>
            </View>
            <View style={styles.chips}>
              <Chip
                mode='outlined'
                style={styles.chipStyle}
                textStyle={styles.chipTextStyle}
                // onPress={() => console.log('Pressed')}
                onPress={() => {
                  taxActionSheetRef.current?.show();
                }}
              >
                Add Tax
              </Chip>
              <Chip
                mode='outlined'
                style={styles.chipStyle}
                textStyle={styles.chipTextStyle}
                // onPress={() => console.log('Pressed')}
                onPress={() => {
                  discountActionSheetRef.current?.show();
                }}
              >
                Add Discount
              </Chip>
              <Chip
                mode='outlined'
                style={styles.chipStyle}
                textStyle={styles.chipTextStyle}
                onPress={() => console.log('Pressed')}
              >
                Other charges
              </Chip>
            </View>
          </View>
          <View style={styles.buttonsWrapper}>
            <View style={styles.chargeButton}>
              <Button
                type='solid'
                title={`Charge ₦${thousandSeperators(finalTotal)}`}
                // onPress={() => console.log('pressed')}
                onPress={() => {
                  handleSaleSummary();
                }}
                radius={10}
                buttonStyle={{ backgroundColor: Colors['black'] }}
                size='lg'
              />
            </View>
            <View style={styles.CancelButton}>
              <Button
                type='clear'
                title='Clear'
                onPress={() => {
                  handleClearAll();
                  // navigation.goBack();
                }}
                radius={10}
                titleStyle={{ color: Colors['black'] }}
              />
            </View>
          </View>
        </View>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled={true}
        snapPoints={[50]}
        containerStyle={styles.actionSheetContainer}
      >
        <View style={styles.actionSheetWrapper}>
          <View style={styles.actionSheetHeader}>
            <Text style={styles.actionSheetHeaderText}>
              {actionProduct.name}
            </Text>
          </View>
          <View style={styles.closeButton}>
            <Button
              // title='Close'
              titleStyle={styles.actionSheetHeaderButtonText}
              icon={{
                name: 'close',
                type: 'ionicon',
                // size: 25,
                color: Colors['black'],
              }}
              type='clear'
              buttonStyle={styles.actionSheetHeaderButton}
              onPress={() => {
                // actionSheetRef.current?.hide();
                handleCloseActionSheet();
              }}
            />
          </View>
          <View style={styles.allpricesWrapper}>
            <Text
              style={
                actionProduct?.price != actionProduct?.sellingPrice
                  ? styles.actionSheetHeaderPriceStrike
                  : styles.actionSheetHeaderPrice
              }
            >
              ₦{thousandSeperators(actionProduct?.price)}
            </Text>
            {actionProduct?.price != actionProduct?.sellingPrice && (
              <Text style={styles.actionSheetHeaderSellingPrice}>
                ₦{thousandSeperators(actionProduct?.sellingPrice)}
              </Text>
            )}
          </View>
          <View style={styles.actionSheetBody}>
            <View>
              <View style={styles.actionSheetBodyTop}>
                <View style={styles.quantityWrapper}>
                  <Button
                    type='clear'
                    radius={50}
                    icon={{
                      name: 'minus',
                      type: 'feather',
                      size: 25,
                      color:
                        actionProduct?.changeQuantity === 0
                          ? Colors['grey']
                          : Colors['white'],
                    }}
                    disabled={actionProduct?.changeQuantity === 0}
                    buttonStyle={{
                      backgroundColor: Colors['black'],
                    }}
                    onPress={() => {
                      // console.log('minus');
                      handleUpdateQuantity('minus');
                    }}
                  />
                  <Text style={styles.quantity}>
                    {actionProduct?.changeQuantity}
                  </Text>
                  <Button
                    type='clear'
                    radius={50}
                    icon={{
                      name: 'plus',
                      type: 'feather',
                      size: 25,
                      color:
                        actionProduct?.changeQuantity ===
                        actionProduct?.quantity
                          ? Colors['grey']
                          : Colors['white'],
                    }}
                    disabled={
                      actionProduct?.changeQuantity === actionProduct?.quantity
                    }
                    buttonStyle={{
                      backgroundColor: Colors['black'],
                      overflow: 'hidden',
                    }}
                    onPress={() => {
                      // console.log('plus');
                      handleUpdateQuantity('plus');
                    }}
                  />
                </View>
              </View>
              <View style={styles.discountWrapper}>
                <TextInput
                  style={styles.discountInputPercent}
                  placeholder='Discount %'
                  keyboardType='decimal-pad'
                  value={discountValue}
                  maxLength={3}
                  autoCorrect={false}
                  onChangeText={(text) => handleDiscountValue(text)}
                />
                <TextInput
                  style={styles.discountInputNumber}
                  placeholder='Discount per item'
                  keyboardType='decimal-pad'
                  value={discountPerItem}
                  // maxLength={3}
                  autoCorrect={false}
                  onChangeText={(text) => handleDiscountPerItem(text)}
                />
              </View>
              <View style={styles.giftFreeWrapper}>
                <CheckBox
                  title='Give as free'
                  checked={actionProduct.isFree}
                  checkedColor={Colors['black']}
                  onPress={() => {
                    handleFreeGift('free');
                  }}
                  iconType='material-community'
                  uncheckedIcon='checkbox-blank-outline'
                  checkedIcon='checkbox-outline'
                  textStyle={
                    actionProduct.isFree
                      ? styles.chekedBoxText
                      : styles.unchekedBoxText
                  }
                />
                <CheckBox
                  title='Give as gift'
                  checked={actionProduct.isGift}
                  checkedColor={Colors['black']}
                  onPress={() => handleFreeGift('gift')}
                  iconType='material-community'
                  uncheckedIcon='checkbox-blank-outline'
                  checkedIcon='checkbox-outline'
                  textStyle={
                    actionProduct.isGift
                      ? styles.chekedBoxText
                      : styles.unchekedBoxText
                  }
                />
              </View>
            </View>
            <View style={styles.actionSheetButtonsWrapper}>
              <Button
                type='solid'
                title={`Update`}
                // onPress={() => console.log('pressed')}
                onPress={() => {
                  handleUpdateProduct();
                  // actionSheetRef.current?.hide();
                }}
                radius={10}
                buttonStyle={{ backgroundColor: Colors['black'] }}
                size='lg'
              />
            </View>
          </View>
        </View>
      </ActionSheet>
      <ActionSheet
        ref={taxActionSheetRef}
        gestureEnabled={true}
        // onClose={() => {
        //   setTaxPercentage('');
        // }}
      >
        <Text style={styles.inputOtherLabel}>Add Tax (%)</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.addInput}
            placeholder='Eg 5%'
            keyboardType='decimal-pad'
            value={taxPercentage}
            maxLength={3}
            autoCorrect={false}
            // onChangeText={(text) => handleDiscountValue(text)}
            onChangeText={(text) => handleSetTaxPercentage(text)}
          />
        </View>
        <View style={styles.buttonActionWrapper}>
          <Button
            type='solid'
            title={`Add tax`}
            // onPress={() => console.log('pressed')}
            onPress={() => {
              handleAddTax();
              taxActionSheetRef.current?.hide();
            }}
            radius={10}
            buttonStyle={{ backgroundColor: Colors['black'] }}
            size='lg'
          />
        </View>
      </ActionSheet>
      <ActionSheet ref={discountActionSheetRef} gestureEnabled={true}>
        <Text style={styles.inputOtherLabel}>Add Discount</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.addInput}
            placeholder='Eg ₦2000'
            keyboardType='decimal-pad'
            value={globalDiscount}
            // maxLength={3}
            autoCorrect={false}
            // onChangeText={(text) => handleDiscountValue(text)}
            onChangeText={(text) => handleSetDiscountValue(text)}
          />
        </View>
        <View style={styles.buttonActionWrapper}>
          <Button
            type='solid'
            title={`Add Discount`}
            // onPress={() => console.log('pressed')}
            onPress={() => {
              handleAddDiscount();
              discountActionSheetRef.current?.hide();
            }}
            radius={10}
            buttonStyle={{ backgroundColor: Colors['black'] }}
            size='lg'
          />
        </View>
      </ActionSheet>
      <ActionSheet
        ref={paymentActionSheetRef}
        gestureEnabled={true}
        snapPoints={[65]}
        containerStyle={styles.actionPaymentSheetContainer}
      >
        <View style={styles.actionPaymentSheetWrapper}>
          <View style={styles.actionSheetHeader}>
            <Text style={styles.actionSheetHeaderText}>Payment</Text>
          </View>
          <View style={styles.closeButton}>
            <Button
              // title='Close'
              titleStyle={styles.actionSheetHeaderButtonText}
              icon={{
                name: 'close',
                type: 'ionicon',
                // size: 25,
                color: Colors['black'],
              }}
              type='clear'
              buttonStyle={styles.actionSheetHeaderButton}
              onPress={() => {
                paymentActionSheetRef.current?.hide();
                // handleClosePaymentActionSheet();
              }}
            />
          </View>
          <View style={styles.actionSheetBody}>
            <View style={styles.namePhoneWrapper}>
              <View style={styles.nameWrapper}>
                <RNPTextInput
                  label='Customer name'
                  mode='outlined'
                  value={customerName}
                  onChangeText={(text) => setCustomerName(text)}
                  style={styles.input}
                  outlineColor={Colors['white']}
                  contentStyle={styles.inputContent}
                  outlineStyle={styles.inputOutline}
                  theme={{
                    colors: {
                      primary: Colors['black'],
                      text: Colors['black'],
                      placeholder: Colors['white'],
                      background: Colors['white'],
                    },
                  }}
                />
              </View>
              <View style={styles.nameWrapper}>
                <RNPTextInput
                  label='Phone Number'
                  mode='outlined'
                  value={customerPhone}
                  onChangeText={(text) => setCustomerPhone(text)}
                  style={styles.input}
                  outlineColor={Colors['white']}
                  activeOutlineColor={Colors['black']}
                  contentStyle={styles.inputContent}
                  outlineStyle={styles.inputOutline}
                  theme={{
                    colors: {
                      primary: Colors['black'],
                      text: Colors['black'],
                      placeholder: Colors['white'],
                      background: Colors['white'],
                    },
                  }}
                  keyboardType='phone-pad'
                />
              </View>
            </View>
            <View style={styles.paymentMethodWrapper}>
              <View style={styles.paymentMethodHeader}>
                <Text style={styles.paymentMethodHeaderText}>
                  Choose Payment Method
                </Text>
              </View>
              <View style={styles.paymentMethodBody}>
                <View style={styles.paymentTouchableWrapper}>
                  <TouchableRipple
                    onPress={() => {
                      // console.log('pressed');
                      // handlePaymentMethod('cash');
                      // paymentActionSheetRef.current?.hide();
                      // navigation.navigate('CashPayment');
                      handlePaymentMethod('cash');
                    }}
                    rippleColor='rgba(0, 0, 0, .12)'
                    style={styles.paymentTouchable}
                  >
                    <View style={styles.paymentMethodItem}>
                      <CashPaymentSvgComponent />
                      <Text style={styles.paymentMethodItemText}>Cash</Text>
                    </View>
                  </TouchableRipple>
                </View>
                <View style={styles.paymentTouchableWrapper}>
                  <TouchableRipple
                    onPress={() => {
                      console.log('pressed');
                      // handlePaymentMethod('cash');
                      // paymentActionSheetRef.current?.hide();
                    }}
                    rippleColor='rgba(0, 0, 0, .12)'
                    style={styles.paymentTouchable}
                  >
                    <View style={styles.paymentMethodItem}>
                      <CardPaymentSvgComponent />
                      <Text style={styles.paymentMethodItemText}>Card</Text>
                    </View>
                  </TouchableRipple>
                </View>
                <View style={styles.paymentTouchableWrapper}>
                  <TouchableRipple
                    onPress={() => {
                      console.log('pressed');
                      // handlePaymentMethod('cash');
                      // paymentActionSheetRef.current?.hide();
                    }}
                    rippleColor='rgba(0, 0, 0, .12)'
                    style={styles.paymentTouchable}
                  >
                    <View style={styles.paymentMethodItem}>
                      <CreditPaymentSvgComponent />
                      <Text style={styles.paymentMethodItemText}>Credit</Text>
                    </View>
                  </TouchableRipple>
                </View>
              </View>
              <View style={styles.paymentMethodFooter}>
                <Button
                  title='Add new payment method'
                  titleStyle={styles.paymentMethodFooterButtonText}
                  type='solid'
                  buttonStyle={styles.paymentMethodFooterButton}
                  size='lg'
                  radius={5}
                />
              </View>
            </View>
          </View>
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
};

export default ConfirmSaleComp;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Colors['background'],
    paddingTop: Platform.OS === 'android' ? 10 : 10,
  },
  container: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addItemWrapper: {
    // borderWidth: 1,
    width: '90%',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  addItemButton: {
    backgroundColor: Colors['chipBackground'],
    borderRadius: 10,
    height: 50,
  },
  addItemButtonText: {
    color: Colors['chipText'],
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
  },
  header: {
    // marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  itemListWrapper: {
    flex: 0.5,
    marginHorizontal: 15,
    // borderWidth: 1,
  },
  touchableWrapper: {
    // borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  listCardWrapper: {
    // backgroundColor: Colors['white'],
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    // borderWidth: 1,
    // elevation: 2,
  },
  imageDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    width: '60%',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  description: {
    flex: 1,
  },
  title: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 16,
    color: Colors['black'],
  },
  sellingPrice: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 16,
    color: Colors['black'],
  },
  totalPriceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // width: '50%',
  },
  totalPriceText: {
    fontFamily: 'Givonic-Bold',
    fontSize: 18,
    color: Colors['black'],
    marginRight: 5,
    // borderWidth: 1,
    width: 80,
  },
  summaryButtonsWrapper: {
    flex: 0.55,
    width: '100%',
    // borderWidth: 1,
    justifyContent: 'space-between',
    marginTop: 10,
    // alignItems: 'center',
  },
  summaryWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    // width: '100%',
    backgroundColor: Colors['white'],
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
    color: Colors['black'],
  },
  subTotalAmount: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 13,
    color: Colors['black'],
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
    color: Colors['black'],
  },
  taxAmount: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 13,
    color: Colors['black'],
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
    color: Colors['black'],
  },
  discountAmount: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 13,
    color: Colors['black'],
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
    color: Colors['black'],
  },
  totalAmount: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 20,
    color: Colors['black'],
  },
  chips: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
    // width: '100%',
    // marginBottom: 10,
    // marginHorizontal: 15,
  },
  chipStyle: {
    backgroundColor: Colors['chipBackground'],
    borderRadius: 50,
    borderColor: Colors['white'],
  },
  chipTextStyle: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 12,
    color: Colors['chipText'],
  },
  buttonsWrapper: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
    // borderWidth: 1,
  },
  chargeButton: {
    // width: '100%',
    // borderWidth: 1,
    marginBottom: 10,
  },
  CancelButton: {
    // width: '100%',
    // borderWidth: 1,
  },

  // ******************** ACTION SHEET STYLES ********************
  actionSheetContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    // flex: 1,
    width: '100%',
    // height: '100%',
    backgroundColor: Colors['white'],
    // justifyContent: 'space-between',
    // alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  actionSheetWrapper: {
    // borderWidth: 1,
    // flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: Colors['white'],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  actionSheetHeader: {
    // borderWidth: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  actionSheetHeaderText: {
    fontFamily: 'Givonic-Bold',
    fontSize: 22,
    color: Colors['black'],
    textAlign: 'center',
    // borderWidth: 1,
    width: '70%',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 8,
    // borderWidth: 1,
    // backgroundColor: Colors['black'],
  },
  actionSheetHeaderButton: {
    // borderWidth: 1,
    // backgroundColor: Colors['black'],
  },
  actionSheetHeaderButtonText: {
    color: Colors['black'],
    // textAlign: 'center',
  },
  allpricesWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  actionSheetHeaderPrice: {
    fontFamily: 'Givonic-Bold',
    fontSize: 18,
    color: Colors['black'],
    textAlign: 'center',
    marginTop: 5,
  },
  actionSheetHeaderPriceStrike: {
    fontFamily: 'Givonic-Bold',
    fontSize: 18,
    color: Colors['red'],
    textAlign: 'center',
    marginTop: 5,
    textDecorationLine: 'line-through',
  },
  actionSheetHeaderSellingPrice: {
    fontFamily: 'Givonic-Bold',
    fontSize: 18,
    color: Colors['black'],
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 5,
  },
  actionSheetBody: {
    // borderWidth: 1,
    // flex: 1,
    marginTop: 20,
    justifyContent: 'space-between',
    // alignItems: 'center',
    // borderWidth: 1,
  },
  actionSheetBodyTop: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    height: 50,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    marginHorizontal: 10,
    marginBottom: 15,
    backgroundColor: Colors['black'],
    // borderWidth: 1,
    // borderColor: 'red',
    borderRadius: 50,
  },
  quantity: {
    fontSize: 20,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['white'],
  },
  discountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    // marginHorizontal: 10,
    marginVertical: 15,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  discountInputPercent: {
    width: '48%',
    // height: '100%',
    borderWidth: 1,
    borderColor: Colors['background'],
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // backgroundColor: Colors['white'],
    fontFamily: 'Givonic-SemiBold',
    fontSize: 16,
    marginRight: 10,
    // color: Colors['black'],
  },
  discountInputNumber: {
    width: '48%',
    // height: '100%',
    borderWidth: 1,
    borderColor: Colors['background'],
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // backgroundColor: Colors['white'],
    fontFamily: 'Givonic-SemiBold',
    fontSize: 16,
    // color: Colors['black'],
  },
  giftFreeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '100%',
    // height: 50,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    // marginHorizontal: 10,
    // marginVertical: 15,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  chekedBoxText: {
    fontFamily: 'Givonic-SemiBold',
    // fontSize: 16,
    color: Colors['darkGrey'],
    // marginLeft: 10,
  },
  unchekedBoxText: {
    fontFamily: 'Givonic-SemiBold',
    // fontSize: 16,
    color: Colors['grey'],
    // marginLeft: 10,
  },
  actionSheetButtonsWrapper: {
    // borderWidth: 1,
    marginTop: 30,
    // marginBottom: 10,
  },

  // ********************* TAX STYLES ***********************
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
  addInput: {
    // width: '48%',
    // height: '100%',
    borderWidth: 1,
    borderColor: Colors['background'],
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // backgroundColor: Colors['white'],
    fontFamily: 'Givonic-SemiBold',
    fontSize: 16,
    marginRight: 10,
    // color: Colors['black'],
  },
  buttonActionWrapper: {
    marginHorizontal: 15,
    marginBottom: 10,
    // borderWidth: 1,
  },

  // ********************* PAYMENT STYLES ***********************
  actionPaymentSheetContainer: {
    width: '100%',
    // height: '100%',
    backgroundColor: Colors['white'],
    // justifyContent: 'space-between',
    // alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  actionPaymentSheetWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: Colors['white'],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  namePhoneWrapper: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // borderWidth: 1,
  },
  nameWrapper: {
    marginBottom: 15,
    paddingTop: 5,
    paddingBottom: 10,
    borderWidth: 1,
    backgroundColor: Colors['white'],
    borderRadius: 5,
    borderColor: Colors['background'],
  },
  input: {
    // paddingVertical: 11,
    // height: 55,
    // fontSize: 14,
    fontFamily: 'Hubhead',
    // borderWidth: 1,
  },
  inputContent: {
    backgroundColor: 'white',
  },
  inputOutline: {
    // backgroundColor: 'white',
    borderColor: Colors['white'],
  },
  paymentMethodWrapper: {
    // borderWidth: 1,
    marginTop: 10,
    // marginBottom: 10,
  },
  paymentMethodHeader: {
    // marginTop: 5,
  },
  paymentMethodHeaderText: {
    fontFamily: 'Givonic-Bold',
    fontSize: 18,
    color: Colors['black'],
    // textAlign: 'center',
    // marginTop: 5,
  },
  paymentMethodBody: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  paymentTouchableWrapper: {
    // borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 5,
  },
  paymentTouchable: {
    backgroundColor: Colors['background'],
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  paymentMethodItem: {
    // borderWidth: 1,
    // width: 100,
    // height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors['white'],
    // borderRadius: 15,
  },
  paymentMethodItemText: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 16,
    color: Colors['black'],
    textAlign: 'center',
    marginTop: 10,
  },
  paymentMethodFooter: {
    marginTop: 30,
    marginBottom: 10,
  },
  paymentMethodFooterButton: {
    backgroundColor: Colors['chipBackground'],
  },
  paymentMethodFooterButtonText: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 16,
    color: Colors['chipText'],
    textAlign: 'center',
    // marginTop: 10,
  },
});

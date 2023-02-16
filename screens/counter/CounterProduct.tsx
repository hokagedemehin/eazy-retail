import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderComponent from '@/components/Header/HeaderComponent';
import { allSales } from '@/data/dummy_data';
import { useRoute } from '@react-navigation/native';
import { Image } from '@rneui/themed';
import Colors from '@/constants/Colors';
import { thousandSeperators } from '@/utils/thousandSeperators';
import {
  CounterProductsNavigation,
  CounterProductsRoute,
} from '@/interfaces/navigation/counter';

const CounterProduct = ({ navigation }: CounterProductsNavigation) => {
  // const navigation = useNavigation<CounterProductsProps>();
  const route = useRoute<CounterProductsRoute>();

  const handleBack = () => {
    navigation.goBack();
  };
  // const getss = navigation.getParent();
  // console.log(getss?.getState().routeNames[getss?.getState().index]);

  type ProductDetail = {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
    image: string;
    status: string;
  };

  const id = route.params.id;

  const [productDetail, setProductDetail] = useState({} as ProductDetail);

  // console.log('productDetail', productDetail);
  useEffect(() => {
    // filter allSales to get the product with the id passed in the route params
    // set the productDetail state to the filtered product
    const filteredSale = allSales.filter((item) => item.id === id);
    setProductDetail(filteredSale[0]);
  }, [id]);

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.header}>
        <HeaderComponent title='Product Sale Info' handleBack={handleBack} />
      </View>
      {/* check if the productDetail object is not empty */}
      {Object.keys(productDetail).length > 0 && (
        <View style={styles.productDetails}>
          <Image
            source={{
              uri: productDetail?.image,
            }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>{productDetail?.name}</Text>
          <View style={styles.priceQuantityWrapper}>
            <View style={styles.productPrice}>
              <Text style={styles.productPriceTitle}>Cost per unit</Text>
              <Text style={styles.productPriceValue}>
                &#8358;{thousandSeperators(productDetail?.price)}
              </Text>
            </View>
            <View style={styles.productQuantity}>
              <Text style={styles.productQuantityTitle}>Units purchased</Text>
              <Text style={styles.productQuantityValue}>
                {productDetail?.quantity}
              </Text>
            </View>
          </View>
          <View style={styles.productTotalPrice}>
            <Text style={styles.productTotalPriceTitle}>Total Cost</Text>
            <Text style={styles.productTotalPriceValue}>
              &#8358;{thousandSeperators(productDetail?.totalPrice)}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CounterProduct;

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
  productDetails: {
    flex: 1,
    marginHorizontal: 15,
  },
  productImage: {
    width: '100%',
    height: 180,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  productName: {
    fontSize: 24,
    fontFamily: 'Givonic-Bold',
    marginBottom: 20,
    marginTop: 10,
  },
  priceQuantityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  productPrice: {
    padding: 20,
    backgroundColor: Colors['white'],
    borderRadius: 10,
    width: '48%',
  },
  productPriceTitle: {
    fontSize: 13,
    fontFamily: 'Givonic-SemiBold',
    marginBottom: 5,
  },
  productPriceValue: {
    fontSize: 22,
    fontFamily: 'Givonic-Bold',
  },
  productQuantity: {
    padding: 20,
    backgroundColor: Colors['white'],
    borderRadius: 10,
    width: '48%',
  },
  productQuantityTitle: {
    fontSize: 13,
    fontFamily: 'Givonic-SemiBold',
    marginBottom: 5,
  },
  productQuantityValue: {
    fontSize: 22,
    fontFamily: 'Givonic-Bold',
  },
  productTotalPrice: {
    width: '100%',
  },
  productTotalPriceTitle: {
    fontSize: 13,
    fontFamily: 'Givonic-SemiBold',
    marginBottom: 5,
  },
  productTotalPriceValue: {
    fontSize: 24,
    fontFamily: 'Givonic-Bold',
  },
});

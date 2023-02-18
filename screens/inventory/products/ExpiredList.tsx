import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { allProductsList } from '../../../data/dummy_data';
import Colors from '@/constants/Colors';
import { Image } from '@rneui/themed';

const ExpiringList = () => {
  type IProductTypes = {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    expiring_date: string;
  }[];

  type ProductTypes = {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    expiring_date: string;
  };

  const [expiredStock, setExpiredStock] = useState<IProductTypes>([]);

  useEffect(() => {
    const newArr = [] as IProductTypes;
    allProductsList.forEach((product) => {
      if (product.expiring_date < new Date().toISOString()) {
        newArr.push(product);
      }
    });
    setExpiredStock(newArr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProducts = ({ item }: { item: ProductTypes }) => {
    return (
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.namePriceWrapper}>
          <Text numberOfLines={1} style={styles.name}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.price}>
            ₦{item.price}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expiredStock}
        renderItem={renderProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 5,
          paddingBottom: 10,
        }}
      />
    </View>
  );
};

export default ExpiringList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    // borderWidth: 1,
    backgroundColor: Colors['background'],
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
  namePriceWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors['white'],
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // borderWidth: 1,
    // height: 70,
    width: '100%',
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['black'],
    // borderWidth: 1,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['black'],
  },

  // ****************** add new product card ******************
  addProductcontent: {
    width: '45%',
    // borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors['newSale'],
    marginBottom: 20,
    marginHorizontal: 10,
  },
  addCard: {
    width: '100%',
    height: 205,
    // height: '15%',
    // paddingVertical: 50,
    backgroundColor: Colors['newSale'],
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  addCardBtn: {
    width: 60,
    height: 60,
    backgroundColor: Colors['newSaleBtn'],
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCardText: {
    // width: 100,
    height: 20,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 10,
  },
  addCardTextContent: {
    fontSize: 16,
    fontFamily: 'Givonic-Bold',
    color: '#000',
    textAlign: 'center',
  },
});

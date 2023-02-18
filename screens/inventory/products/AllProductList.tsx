import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { allProductsList } from '@/data/dummy_data';
import { TouchableRipple } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { Icon, Image } from '@rneui/themed';
import { AllProductListProps } from '@/interfaces/navigation/inventory';

const AllProductList = ({
  navigation,
}: Omit<AllProductListProps<'AllProducts'>, 'route'>) => {
  const [productsList, setProductsList] = useState([
    {
      id: '0',
      name: 'add new product',
      price: 1000,
      quantity: 10,
      image: '',
      expiring_date: '',
    },
  ]);

  useEffect(() => {
    const newData = [
      {
        id: '0',
        name: 'add new product',
        price: 1000,
        quantity: 10,
        image: '',
        expiring_date: '',
      },
    ];
    allProductsList.forEach((product) => {
      newData.push(product);
    });
    setProductsList(newData);
    return () => {
      setProductsList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type ProductTypes = {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    expiring_date: string;
  };

  const renderProducts = ({ item }: { item: ProductTypes }) => {
    if (item.name === 'add new product') {
      return (
        <View style={styles.addProductcontent}>
          <TouchableRipple
            // onPress={() => console.log('Pressed')}
            onPress={() => navigation.navigate('AddProduct')}
            rippleColor={Colors['white']}
            style={styles.addCard}
          >
            <>
              <View style={styles.addCardBtn}>
                <Icon name='add' size={40} color={Colors['white']} />
              </View>
              <View style={styles.addCardText}>
                <Text style={styles.addCardTextContent}>Add New Product</Text>
              </View>
            </>
          </TouchableRipple>
        </View>
      );
    } else {
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
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productsList}
        renderItem={renderProducts}
        keyExtractor={(item) => item.id}
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

export default AllProductList;

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

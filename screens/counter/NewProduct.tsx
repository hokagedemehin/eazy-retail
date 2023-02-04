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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CounterNewProductNavigation } from '@/interfaces/navigation';
import HeaderComponent from '@/components/Header/HeaderComponent';
import Colors from '@/constants/Colors';
import { Searchbar } from 'react-native-paper';
import { SearchSvgComponent } from '@/assets/icons';
import { useAppDispatch } from '@/hooks/redux';
import { getParentName } from '@/store/slice/hideTabsSlice';
import { Button, Icon, Image, FAB } from '@rneui/themed';
import { allProducts } from '@/data/dummy_data';
import { useDebouncedCallback } from 'use-debounce';
import EmptyListComponent from '@/components/EmptyList/EmptyList';
const NewProduct = ({ navigation }: CounterNewProductNavigation) => {
  // ******************* HIDE TABS *******************
  const dispatch = useAppDispatch();

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      // setSearchValue(value);
      handleSearch(value);
    },
    // delay in ms
    1000
  );

  const handleSearch = (value: string) => {
    if (value !== '' && searchData.length > 0) {
      const tempArr = [] as IProduct;
      productData.forEach((item) => {
        if (item.name.toLowerCase().includes(value.toLowerCase())) {
          tempArr.push(item);
        }
      });
      setProductData(tempArr);
    } else if (value === '' && searchData.length > 0) {
      setProductData(searchData);
    }
  };

  useEffect(() => {
    dispatch(getParentName('CounterPage'));
    return () => {
      dispatch(getParentName(''));
    };
  }, [dispatch]);

  // ****************** GO BACK ******************
  const handleBack = () => {
    navigation.goBack();
  };

  // ****************** QUANTITY ******************
  // const [changeQuantity, setChangeQuantity] = useState(0);

  // ****************** ADD PRODUCT ******************

  function handleQuantity(type: string, id: string) {
    // get the product from productData with the id and increase the changeQuantity by 1
    let product = productData.find((item) => item.id === id) as products;

    if (type === 'plus') {
      product = {
        ...product,
        changeQuantity: product.changeQuantity + 1,
      };
      // use splice to update the productData with the newProductObj
    } else if (type === 'minus') {
      product = {
        ...product,
        changeQuantity: product.changeQuantity - 1,
      };
    }

    const newProductData = productData.map((item) => {
      if (item.id === id) {
        return product;
      }
      return item;
    });

    // console.log('newProductData :>> ', newProductData[0]);

    setProductData(newProductData);

    // return product;
  }

  // ****************** RENDER LIST******************
  type products = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    changeQuantity: number;
  };
  const renderProducts = ({ item }: { item: products }) => {
    return (
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item?.image,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.namePriceWrapper}>
          <Text numberOfLines={1} style={styles.name}>
            {item?.name}
          </Text>
          <Text numberOfLines={1} style={styles.price}>
            ₦{item?.price}
          </Text>
          <Text numberOfLines={1} style={styles.currentQuantity}>
            {/* {item?.quantity} {item?.quantity > 1 ? 'items' : 'item'} */}
            {item?.quantity === 0
              ? 'Out of stock'
              : item?.quantity === 1
              ? '1 Left'
              : ''}
          </Text>
        </View>
        <View style={styles.quantityWrapper}>
          <Button
            type='clear'
            radius={50}
            icon={{
              name: 'minus',
              type: 'feather',
              size: 18,
              color:
                item?.changeQuantity === 0 ? Colors['grey'] : Colors['white'],
            }}
            disabled={item?.changeQuantity === 0}
            buttonStyle={{
              backgroundColor: Colors['black'],
            }}
            onPress={() => {
              // console.log('minus');
              handleQuantity('minus', item?.id);
              // setSelectedProduct({
              //   type: 'minus',
              //   id: item?.id,
              // });
            }}
          />
          <Text style={styles.quantity}>{item?.changeQuantity}</Text>
          <Button
            type='clear'
            radius={50}
            icon={{
              name: 'plus',
              type: 'feather',
              size: 18,
              color:
                item?.changeQuantity === item?.quantity
                  ? Colors['grey']
                  : Colors['white'],
            }}
            disabled={item?.changeQuantity === item?.quantity}
            buttonStyle={{
              backgroundColor: Colors['black'],
              overflow: 'hidden',
            }}
            onPress={() => {
              // console.log('plus');
              handleQuantity('plus', item?.id);
              // setSelectedProduct({
              //   type: 'plus',
              //   id: item?.id,
              // });
            }}
          />
        </View>
        <View style={styles.selectedWrapper}>
          <View
            style={[
              styles.selectIcon,
              {
                opacity: item?.changeQuantity === 0 ? 0 : 1,
              },
            ]}
          >
            <Icon
              name='check'
              type='feather'
              size={18}
              color={Colors['white']}
            />
          </View>
        </View>
      </View>
    );
  };

  // ******************* FLATLIST DATA *******************
  type IProduct = Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    changeQuantity: number;
  }>;
  const [productData, setProductData] = useState<IProduct>([]);

  // console.log('productData :>> ', productData[0]);

  useEffect(() => {
    if (allProducts) {
      const tempArr = [] as IProduct;
      allProducts.forEach((item) => {
        const obj = {
          ...item,
          changeQuantity: 0,
        };
        tempArr.push(obj);
      });
      setProductData(tempArr);
      setSearchData(tempArr);
    }
    return () => {
      setSearchData([]);
    };
  }, []);

  // ******************* SEARCH FUNCTIONALITY *******************
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState<IProduct>([]);

  // console.log('searchValue', searchValue);
  // console.log('searchData :>> ', searchData);

  // useEffect(() => {
  //   // if searchValue has a value, then filter the productData and set it to the new array with the filtered data else set the productData to the searchData

  //   // const tempArr = [] as IProduct;
  //   // productData.forEach((item) => {
  //   //   if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
  //   //     tempArr.push(item);
  //   //   }
  //   // });

  //   // setProductData(tempArr);

  //   if (searchValue !== '' && searchData.length > 0) {
  //     const tempArr = [] as IProduct;
  //     productData.forEach((item) => {
  //       if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
  //         tempArr.push(item);
  //       }
  //     });
  //     setProductData(tempArr);
  //   } else {
  //     setProductData(searchData);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchValue, searchData]);

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
            <HeaderComponent title='Sell Product' handleBack={handleBack} />
          </View>
          <View style={styles.searchWrapper}>
            <Searchbar
              value={searchValue}
              onChangeText={(value) => {
                setSearchValue(value);
                debounced(value);
              }}
              placeholder='Search product'
              style={styles.searchBar}
              inputStyle={styles.searchBarInput}
              theme={{
                colors: {
                  primary: Colors['black'],
                  text: Colors['black'],
                  placeholder: Colors['grey'],
                },
              }}
              icon={() => <SearchSvgComponent />}
            />
          </View>
          <View style={styles.contentWrapper}>
            <FlatList
              data={productData}
              renderItem={renderProducts}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20,
              }}
              ListEmptyComponent={
                <EmptyListComponent message='No Product Available' />
              }
            />
          </View>
          <FAB
            title='Sell Products'
            // onPress={handleSellProducts}
            size='small'
            color={Colors['newSaleBtn']}
            style={styles.fab}
            buttonStyle={styles.fabBtn}
            radius={10}
          />
        </View>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewProduct;

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
  searchWrapper: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: Colors['white'],
    borderRadius: 7,
    height: 50,
  },
  searchBarInput: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
  },
  contentWrapper: {
    flex: 1,
    // marginHorizontal: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  content: {
    position: 'relative',
    width: '45%',
    // height: 300,
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
    padding: 10,
    backgroundColor: Colors['white'],
    transform: [{ translateY: -30 }],
    borderRadius: 15,
    // borderWidth: 1,
    marginBottom: -20,
    width: '90%',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['black'],
  },
  price: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['black'],
  },
  currentQuantity: {
    fontSize: 12,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['black'],
    textAlign: 'right',
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    marginHorizontal: 10,
    marginBottom: 15,
    backgroundColor: Colors['black'],
    borderWidth: 1,
    borderRadius: 50,
  },
  quantity: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['white'],
  },
  selectedWrapper: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectIcon: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: Colors['black'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    // margin: 16,
    // marginHorizontal: 15,
    right: 0,
    bottom: 10,
    left: 0,
    // borderWidth: 1,
    borderRadius: 10,
    // backgroundColor: Colors['newSaleBtn'],
  },
  fabBtn: {
    width: '100%',
    // height: 40,
    borderRadius: 10,
    // borderWidth: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

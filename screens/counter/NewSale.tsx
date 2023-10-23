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
import HeaderComponent from '@/components/Header/HeaderComponent';
import Colors from '@/constants/Colors';
import { Searchbar } from 'react-native-paper';
import { SearchSvgComponent } from '@/assets/icons';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getParentName } from '@/store/slice/hideTabsSlice';
import { Button, Icon, Image, FAB } from '@rneui/themed';
import { allProducts } from '@/data/dummy_data';
import { useDebouncedCallback } from 'use-debounce';
import EmptyListComponent from '@/components/EmptyList/EmptyList';
import { addSale } from '@/store/slice/newSaleSlice';
import { CounterNewSaleNavigation } from '@/interfaces/navigation/counter';

const NewSale = ({ navigation }: CounterNewSaleNavigation) => {
  // ******************* HIDE TABS *******************
  const dispatch = useAppDispatch();

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      // setSearchValue(value);
      // console.log(value);
      handleSearch(value);
    },
    // delay in ms
    1000
  );

  useEffect(() => {
    dispatch(getParentName('hideScreen'));
    return () => {
      dispatch(getParentName(''));
    };
  }, [dispatch]);

  // ********************* DATA FROM REDUX ***********************
  const { selectedSales } = useAppSelector((state) => state.newSale);

  useEffect(() => {
    if (selectedSales.length > 0) {
      // console.log('fired');
      // console.log('selectedSales :>> ', selectedSales);

      const tempArr = [] as IProduct;
      allProducts.forEach((item) => {
        const obj = {
          ...item,
          discount: 0,
          discountPercent: 0,
          sellingPrice: item.price,
          isFree: false,
          isGift: false,
          changeQuantity: 0,
          total: 0,
        };
        tempArr.push(obj);
      });
      setSelectedIds(new Set());
      // get each id from the selectedSales and get the product from the productData and then change the quantity of productData to the quantity of the selectedSales
      selectedSales.forEach((item) => {
        const foundObj = tempArr.find((product) => product.id === item.id);
        if (foundObj) {
          // get the index of the foundObj in the productData and change the quantity of the productData to the quantity of the selectedSales
          const index = tempArr.findIndex(
            (product) => product.id === foundObj.id
          );
          tempArr[index] = item;
          //  add the id to the selectedIds
          setSelectedIds((prev) => new Set(prev.add(item.id)));
        }
      });
      setProductData(tempArr);
      setSearchData(tempArr);
      // setSelectedIds((prev) => new Set(prev));
    } else {
      const tempArr = [] as IProduct;
      allProducts.forEach((item) => {
        const obj = {
          ...item,
          discount: 0,
          discountPercent: 0,
          sellingPrice: item.price,
          isFree: false,
          isGift: false,
          changeQuantity: 0,
          total: 0,
        };
        tempArr.push(obj);
      });
      setProductData([]);
      setSearchData([]);
      setSelectedIds(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSales]);

  // ******************** ALL DATA FROM ENDPOINT ***********************
  // useEffect(() => {
  //   if (allProducts) {
  //     const tempArr = [] as IProduct;
  //     allProducts.forEach((item) => {
  //       const obj = {
  //         ...item,
  //         discount: 0,
  //         discountPercent: 0,
  //         sellingPrice: item.price,
  //         isFree: false,
  //         isGift: false,
  //         changeQuantity: 0,
  //         total: 0,
  //       };
  //       tempArr.push(obj);
  //     });
  //     setProductData(tempArr);
  //     setSearchData(tempArr);
  //   }
  //   return () => {
  //     setSearchData([]);
  //     setProductData([]);
  //     // dispatch(addSale([]));
  //   };
  // }, []);

  // ****************** GO BACK ******************
  const handleBack = () => {
    navigation.goBack();
    setSearchData([]);
    setProductData([]);
    dispatch(addSale([]));
  };

  // ****************** ADD PRODUCT ******************
  const [selectedIds, setSelectedIds] = useState(new Set());

  // console.log('selectedIds :>> ', selectedIds);
  // console.log('selectedProducts :>> ', selectedProducts);

  // ************************* CONFIRM SALE *************************
  const handleAddProduct = () => {
    // convert the selectedIds to an array

    const selectedIdsArray = Array.from(selectedIds);
    // console.log('selectedIdsArray :>> ', selectedIdsArray);

    // console.log('productData :>> ', productData);
    // console.log('searchData :>> ', searchData);
    // from each id in the selectedIdsArray, get the product from the productData and add it to the selectedProducts
    const filterProduct = selectedIdsArray.map((id) => {
      const foundObj = searchData.find((item) => item.id === id) as products;
      // console.log(foundObj);
      const total = foundObj.sellingPrice * foundObj.changeQuantity;
      return {
        ...foundObj,
        total,
      };
    });

    dispatch(addSale(filterProduct));
    navigation.navigate('ConfirmSale');
    setSelectedIds(new Set());
    // console.log('selectedProducts :>> ', selectedProducts);
    // setSelectedProducts(filterProduct);
  };

  // ****************** QUANTITY ******************
  // const [changeQuantity, setChangeQuantity] = useState(0);
  function handleQuantity(type: string, id: string | number) {
    // get the product from productData with the id and increase the changeQuantity by 1
    let product = productData.find((item) => item.id === id) as products;
    let searchProduct = searchData.find((item) => item.id === id) as products;
    if (type === 'plus') {
      product = {
        ...product,
        changeQuantity: product.changeQuantity + 1,
      };
      searchProduct = {
        ...searchProduct,
        changeQuantity: searchProduct.changeQuantity + 1,
      };
      setSelectedIds((prev) => new Set([...prev, id]));
      // use splice to update the productData with the newProductObj
    } else if (type === 'minus') {
      product = {
        ...product,
        changeQuantity: product.changeQuantity - 1,
      };
      searchProduct = {
        ...searchProduct,
        changeQuantity: searchProduct.changeQuantity - 1,
      };
      if (product.changeQuantity === 0) {
        setSelectedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        // const filterSelectedSales = selectedSales.filter(
        //   (item) => item.id !== id
        // );
        // console.log('selectedSales :>> ', selectedSales);
        // console.log('filterSelectedSales :>> ', filterSelectedSales);
        // dispatch(addSale(filterSelectedSales));
      }
    }

    const newProductData = productData.map((item) => {
      if (item.id === id) {
        return product;
      }
      return item;
    });

    const newSearchData = searchData.map((item) => {
      if (item.id === id) {
        return searchProduct;
      }
      return item;
    });

    // console.log('newProductData :>> ', newProductData[0]);

    setProductData(newProductData);
    setSearchData(newSearchData);
    // return product;
  }

  // ****************** RENDER LIST******************
  type products = {
    id: string | number;
    name: string;
    price: number;
    discount: number;
    discountPercent: number;
    sellingPrice: number;
    isFree: boolean;
    isGift: boolean;
    quantity: number;
    image: string;
    changeQuantity: number;
    total: number;
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
          {item?.quantity === 0 && (
            <Text style={styles.outOfStock}>Out of stock</Text>
          )}
          {item?.quantity === 1 && <Text style={styles.oneLeft}>1 Left</Text>}
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
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    changeQuantity: number;
    discount: number;
    discountPercent: number;
    sellingPrice: number;
    isFree: boolean;
    isGift: boolean;
    total: number;
  }>;

  const [productData, setProductData] = useState<IProduct>([]);

  // console.log('productData :>> ', productData);

  // ******************* SEARCH FUNCTIONALITY *******************
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState<IProduct>([]);

  const handleSearch = (value: string) => {
    if (value !== '') {
      const tempArr = [] as IProduct;
      searchData.forEach((item) => {
        if (item.name.toLowerCase().includes(value.toLowerCase())) {
          tempArr.push(item);
        }
      });
      setProductData(tempArr);
    } else if (value === '') {
      setProductData(searchData);
    }
  };

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
              keyExtractor={(item) => item.id.toString()}
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
            onPress={handleAddProduct}
            size='small'
            color={Colors['newSaleBtn']}
            style={styles.fab}
            buttonStyle={styles.fabBtn}
            radius={10}
            disabled={[...selectedIds].length === 0}
            // disabled={
            //   selectedSales.length === 0 && [...selectedIds].length === 0
            // }
          />
        </View>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewSale;

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
  namePriceWrapper: {
    padding: 10,
    backgroundColor: Colors['white'],
    transform: [{ translateY: -30 }],
    borderRadius: 15,
    // borderWidth: 1,
    height: 70,
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
  outOfStock: {
    fontSize: 12,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['red'],
    textAlign: 'right',
  },
  oneLeft: {
    fontSize: 12,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['orange'],
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

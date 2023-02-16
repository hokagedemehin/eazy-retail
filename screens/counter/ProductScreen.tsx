import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableRipple } from 'react-native-paper';
import Colors from '@/constants/Colors';
// import { Icon, Image } from '@rneui/themed';
// import { thousandSeperators } from '@/utils/thousandSeperators';
import { allSales } from '@/data/dummy_data';
import SingleProduct from '@/components/SingleProduct.tsx/SingleProduct';
import EmptyListComponent from '@/components/EmptyList/EmptyList';
import { ProductNavigation } from '@/interfaces/navigation/counter';

const ProductScreen = ({ navigation }: ProductNavigation) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredData, setFilteredData] = useState([] as ProductTypes[]);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredData(allSales);
    } else {
      setFilteredData(allSales.filter((item) => item.status === activeFilter));
    }
  }, [activeFilter]);

  type ProductTypes = {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
    image: string;
    status: string;
  };

  const nextPageNavigation = (id: string | number) => {
    navigation.navigate('CounterProduct', {
      id,
    });
  };

  const renderProduct = ({ item }: { item: ProductTypes }) => {
    return (
      // <View style={styles.touchableWrapper}>
      //   <TouchableRipple
      //     onPress={() => {
      //       // console.log('pressed');
      //       navigation.navigate('CounterProduct', {
      //         id: item.id,
      //       });
      //       // navigation.navigate('CounterProducts', {
      //       //   id: item.id,
      //       // });
      //     }}
      //     rippleColor={Colors['background']}
      //     style={styles.listCardWrapper}
      //   >
      //     <>
      //       <View style={styles.imageDescription}>
      //         <Image
      //           source={{
      //             uri: item?.image,
      //           }}
      //           style={styles.image}
      //         />
      //         <View style={styles.description}>
      //           <Text numberOfLines={1} style={styles.title}>
      //             {item.name}
      //           </Text>
      //           <Text numberOfLines={1} style={styles.price}>
      //             {item?.quantity} x ₦{thousandSeperators(item?.price)}
      //           </Text>
      //         </View>
      //       </View>
      //       <View style={styles.totalPriceWrapper}>
      //         <Text numberOfLines={1} style={styles.totalPriceText}>
      //           ₦{thousandSeperators(item?.totalPrice)}
      //         </Text>
      //         <Icon name='chevron-right' />
      //       </View>
      //     </>
      //   </TouchableRipple>
      // </View>
      <SingleProduct nextPageNavigation={nextPageNavigation} item={item} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <TouchableRipple
          onPress={() => {
            // console.log('pressed');
            setActiveFilter('all');
          }}
          rippleColor={Colors['transparent']}
          style={
            activeFilter === 'all'
              ? styles.FilterBtn
              : { ...styles.FilterBtn, backgroundColor: Colors['white'] }
          }
        >
          <Text
            style={
              activeFilter === 'all'
                ? styles.activeFilterText
                : styles.filterText
            }
          >
            All Sales
          </Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            // console.log('pressed');
            setActiveFilter('completed');
          }}
          rippleColor={Colors['transparent']}
          style={
            activeFilter === 'completed'
              ? styles.FilterBtn
              : {
                  ...styles.FilterBtn,
                  backgroundColor: Colors['white'],
                }
          }
        >
          <Text
            style={
              activeFilter === 'completed'
                ? styles.activeFilterText
                : styles.filterText
            }
          >
            Completed
          </Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            setActiveFilter('pending');
          }}
          rippleColor={Colors['transparent']}
          style={
            activeFilter === 'pending'
              ? styles.FilterBtn
              : {
                  ...styles.FilterBtn,
                  backgroundColor: Colors['white'],
                }
          }
        >
          <Text
            style={
              activeFilter === 'pending'
                ? styles.activeFilterText
                : styles.filterText
            }
          >
            Pending
          </Text>
        </TouchableRipple>
      </View>
      <View style={styles.contentList}>
        <FlatList
          data={filteredData}
          renderItem={renderProduct}
          keyExtractor={(item) =>
            typeof item.id === 'string' ? item.id : item.id.toString()
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <EmptyListComponent message='Product is empty' />
            </View>
          }
        />
      </View>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    // borderWidth: 1,
    width: '85%',
  },
  FilterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: Colors['activeFilter'],
    // overflow: 'hidden',
    // elevation: 2,
  },
  activeFilterText: {
    color: Colors['white'],
    fontFamily: 'Givonic-SemiBold',
  },
  filterText: {
    color: Colors['black'],
    fontFamily: 'Givonic-SemiBold',
  },
  contentList: {
    flex: 1,
    // borderWidth: 1,
  },
  emptyContainer: {
    flex: 1,
  },
  touchableWrapper: {
    // borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  listCardWrapper: {
    backgroundColor: Colors['white'],
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  price: {
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
});

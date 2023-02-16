import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { TouchableRipple } from 'react-native-paper';
import { thousandSeperators } from '@/utils/thousandSeperators';
import { Icon } from '@rneui/themed';
import { allCustomers } from '@/data/dummy_data';

const CustomersScreen = () => {
  type CustomerTypes = {
    id: string | number;
    name: string;
    numberOfItems: number;
    totalAmount: number;
  };

  const renderCustomers = ({ item }: { item: CustomerTypes }) => {
    return (
      <View style={styles.touchableWrapper}>
        <TouchableRipple
          onPress={() => {
            console.log('pressed');
            // navigation.navigate('CounterProducts', {
            //   id: item.id,
            // });
          }}
          rippleColor={Colors['background']}
          style={styles.listCardWrapper}
        >
          <>
            <View style={styles.nameWrapper}>
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={styles.itemsWrapper}>
                {item?.numberOfItems}
                {item?.numberOfItems > 1 ? ' items' : ' item'}
              </Text>
            </View>
            <View style={styles.totalPriceWrapper}>
              <Text numberOfLines={1} style={styles.totalAmount}>
                ₦{thousandSeperators(item?.totalAmount)}
              </Text>
              <Icon name='chevron-right' />
            </View>
          </>
        </TouchableRipple>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allCustomers}
        renderItem={renderCustomers}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CustomersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  touchableWrapper: {
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
  },
  nameWrapper: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['black'],
    marginBottom: 5,
  },
  itemsWrapper: {
    fontSize: 14,
    fontFamily: 'Givonic-Regular',
    color: Colors['black'],
  },
  totalPriceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['black'],
    marginRight: 10,
    width: 80,
  },
});

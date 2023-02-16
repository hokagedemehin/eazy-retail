import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { thousandSeperators } from '@/utils/thousandSeperators';
import { Icon, Image } from '@rneui/themed';
import { TouchableRipple } from 'react-native-paper';
import { SingleProductProps } from '@/interfaces/components/singleProduct';

const SingleProduct = ({ nextPageNavigation, item }: SingleProductProps) => {
  return (
    <View style={styles.touchableWrapper}>
      <TouchableRipple
        onPress={() => nextPageNavigation(item.id)}
        // navigation.navigate('CounterProducts', {
        //   id: item.id,
        // });

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
              <Text numberOfLines={1} style={styles.price}>
                {item?.quantity} x ₦{thousandSeperators(item?.price)}
              </Text>
            </View>
          </View>
          <View style={styles.totalPriceWrapper}>
            <Text numberOfLines={1} style={styles.totalPriceText}>
              ₦{thousandSeperators(item?.totalPrice)}
            </Text>
            <Icon name='chevron-right' />
          </View>
        </>
      </TouchableRipple>
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
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

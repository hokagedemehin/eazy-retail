import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BackSvgComponent } from '@/assets/icons';
import { Button } from '@rneui/themed';
import { handleBack } from '@/interfaces/header';

const HeaderComponent = ({ title, handleBack }: handleBack) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Button
          title='Back'
          // onPress={() => console.log('Back')}
          onPress={() => handleBack()}
          icon={<BackSvgComponent />}
          titleStyle={{
            color: 'black',
            marginLeft: 10,
            fontFamily: 'Givonic-SemiBold',
          }}
          type='clear'
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
  },
  rightContainer: {
    // borderWidth: 1,
    // width: '70%',
    marginLeft: 25,
  },
  headerText: {
    fontFamily: 'Givonic-Bold',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

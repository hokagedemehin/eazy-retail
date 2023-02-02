import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import Colors from '../../constants/Colors';

const LoadingComp = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/AppIcons/playstore.png')}
      />
      <ActivityIndicator size='large' color={Colors['green-600']} />
    </View>
  );
};

export default LoadingComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});

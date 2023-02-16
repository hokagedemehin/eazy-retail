import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { UpcomingSvgComponent } from '@/assets/icons';
import Colors from '@/constants/Colors';

const UpcomingComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <UpcomingSvgComponent />
      </View>
      <Text style={styles.message}>
        Rome was not built in a day, Calm Down!!!
      </Text>
    </View>
  );
};

export default UpcomingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors['background'],
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    // width: 200,
    // height: 200,
    // marginBottom: 20,
    // borderWidth: 1,
  },
  message: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Givonic-Bold',
    textAlign: 'center',
  },
});

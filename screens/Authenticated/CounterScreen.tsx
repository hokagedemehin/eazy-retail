import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import React from 'react';

const CounterScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Text>CounterScreen</Text>
    </SafeAreaView>
  );
};

export default CounterScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 10,
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
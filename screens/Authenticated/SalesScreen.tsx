import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native';
import React from 'react';

const SalesScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Text>SalesScreen</Text>
    </SafeAreaView>
  );
};

export default SalesScreen;

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

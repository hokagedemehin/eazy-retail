import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import UpcomingComponent from '@/components/Upcoming/Upcoming';

const MoreScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <UpcomingComponent />
    </SafeAreaView>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 10,
    backgroundColor: 'white',
  },
});

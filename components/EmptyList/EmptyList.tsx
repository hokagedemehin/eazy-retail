import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { EmptyListSvgComponent } from '@/assets/icons';

type EmptyListProps = {
  message: string;
};
const EmptyListComponent = ({ message }: EmptyListProps) => {
  return (
    <View style={styles.container}>
      <View>
        <EmptyListSvgComponent />
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default EmptyListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  message: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Givonic-Bold',
    textAlign: 'center',
  },
});

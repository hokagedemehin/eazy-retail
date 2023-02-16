import React, { useState } from 'react';
import ProductsCategoryPage from './ProductsCategoryPage';
import Colors from '@/constants/Colors';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import EmptyListComponent from '@/components/EmptyList/EmptyList';
import { Button } from '@rneui/themed';
import { InventoryHomeProps } from '@/interfaces/navigation/inventory';

const InventoryHome = ({ navigation }: Omit<InventoryHomeProps, 'route'>) => {
  const [section, setSection] = useState('products');

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerText}>Inventory</Text>
          </View>
          <View style={styles.sectionsButtonWrapper}>
            <Button
              title='Products'
              type={section === 'products' ? 'solid' : 'clear'}
              titleStyle={
                section === 'products' ? styles.activeBtnText : styles.btnText
              }
              onPress={() => setSection('products')}
              buttonStyle={
                section === 'products'
                  ? styles.activeSectionBtn
                  : styles.sectionBtn
              }
            />
            <Button
              title='Category'
              type={section === 'category' ? 'solid' : 'clear'}
              titleStyle={
                section === 'category' ? styles.activeBtnText : styles.btnText
              }
              onPress={() => setSection('category')}
              buttonStyle={
                section === 'category'
                  ? styles.activeSectionBtn
                  : styles.sectionBtn
              }
            />
          </View>
        </View>
        {section === 'products' && (
          <ProductsCategoryPage navigation={navigation} />
        )}
        {section === 'category' && (
          <EmptyListComponent message='Category is empty' />
        )}
      </View>
    </SafeAreaView>
  );
};

export default InventoryHome;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 10,
    backgroundColor: Colors['white'],
  },
  container: {
    flex: 1,
    backgroundColor: Colors['background'],
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: Colors['white'],
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    // fontWeight: 'bold',
    color: Colors['black'],
    fontFamily: 'Givonic-Bold',
  },
  sectionsButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    // backgroundColor: Colors['activeFilter'],
    // overflow: 'hidden',
    // elevation: 2,
  },
  activeSectionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: Colors['activeFilter'],
    // overflow: 'hidden',
    // elevation: 2,
  },
  btnText: {
    color: Colors['black'],
    fontFamily: 'Givonic-SemiBold',
  },
  activeBtnText: {
    color: Colors['white'],
    fontFamily: 'Givonic-SemiBold',
  },
});

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { getParentName } from '@/store/slice/hideTabsSlice';
import HeaderComponent from '@/components/Header/HeaderComponent';
import { AddProductOrCategoryProps } from '@/interfaces/navigation/inventory';

const AddCategoryScreen = ({
  navigation,
}: Omit<AddProductOrCategoryProps<'AddCategory'>, 'route'>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getParentName('hideScreen'));
    return () => {
      dispatch(getParentName(''));
    };
  }, [dispatch]);

  // ****************** GO BACK ******************
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <HeaderComponent title='Add Category' handleBack={handleBack} />
      </View>
      <Text>AddCategoryScreen</Text>
    </ScrollView>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  contentContainer: {
    // paddingTop: 15,
    justifyContent: 'space-between',
  },
  header: {
    // marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

type CategorySheetProps = {
  actionSheetRef: React.RefObject<ActionSheetRef>;
};

const CategorySheetComp = ({ actionSheetRef }: CategorySheetProps) => {
  return (
    <View>
      <ActionSheet ref={actionSheetRef} gestureEnabled={true}>
        <Text>Select Category</Text>
      </ActionSheet>
    </View>
  );
};

export default CategorySheetComp;

const styles = StyleSheet.create({});

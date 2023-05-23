import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useAppDispatch } from '@/hooks/redux';
import { addBarcode } from '@/store/slice/barcodeSlice';
import { InventoryHomeProps } from '@/interfaces/navigation/inventory';
import { Button } from '@rneui/themed';
import Colors from '@/constants/Colors';
import LoadingComp from '@/components/Loading/LoadingComp';

const BarcodeScannerScreen = ({
  navigation,
}: Omit<InventoryHomeProps<'AddBarcodeScanner'>, 'route'>) => {
  // ******************* BARCODE SCANNER *******************
  const [hasPermission, setHasPermission] = useState(null || false);
  const [scanned, setScanned] = useState(false);

  const dispatch = useAppDispatch();

  const handleBack = () => {
    dispatch(addBarcode(''));
    navigation.goBack();
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    // type,
    data,
  }: {
    // type: string;
    data: string;
  }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    dispatch(addBarcode(data));
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <LoadingComp />;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.barCodeWindow}
      />
      <View style={styles.backBtn}>
        <Button
          title='Go Back'
          onPress={() => handleBack()}
          radius={10}
          size='lg'
          buttonStyle={{ backgroundColor: Colors['black'], height: 50 }}
          icon={{
            name: 'arrow-back',
            color: Colors['white'],
            size: 20,
          }}
        />
      </View>
    </View>
  );
};

export default BarcodeScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  barCodeWindow: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // height: 300,
    // width: 300,
    marginTop: 30,
    marginHorizontal: 30,
  },
  backBtn: {
    // flex: 0.5,
    // justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 30,
  },
});

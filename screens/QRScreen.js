import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useLibraryList, useLibraryListUpdate } from '../store/QRContext';

import Playbill from '../models/PlaybillConstructor';


export default function QRScreen({ 
  navigation, 
  //onScanned,
 }) {

  //context
  const qrValue = useLibraryList()
  const addQRValue = useLibraryListUpdate()

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ itemData, type, data: url }) => {
    setScanned(true);
    new Playbill 
    addQRValue(url);
    console.log(itemData);
    
    navigation.navigate('PDFScreen', 
                    {
                        pdfId: itemData.item.id,
                        imageUri: itemData.item.imageUri
                    });
                    console.log(itemData.item);
                    

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Scan Complete'} onPress={() => setScanned(false)} />}
    </View>
  );
}
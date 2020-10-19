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

  //so using handleBarCodeScanned with { type, data } I can pass 
  const handleBarCodeScanned = ({ type, data: url }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    
    //use a firestore server --> make a network request to get an arrau somewhere else --> firestore server for storage ~ user  
    
    // data is a url .. given this url, 
    // give me the coevr photo url and an id associated to the pdf for it 
    
    // data url 
    // cover photo url 
    // id --> all goes in function 

    new Playbill 
    //context
    addQRValue(url);
    //navigation.navigate('PDFScreen'..item.id)


    //So after alert, this will navigation.navigate(LibraryScreen) and the 'type' and 'data' will be used to add '$playbill' to the library flatlist
    //How can dylan's dashboard view show the contents of each users' library flatlists?
    //so 1. pass data from qr code back to library flatlist and 2. render the flatlist to firebase 

    // react navigation: navigating with route parameters *from libraryscreen to pdfscreen

    //either react-redux or useContext *an event thats broadcasted in the entire app that a new QR code was scanned 
    //the library adds a unit to the array
    //libraryscreen will have some way of adding to array 
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

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useLibraryList, useLibraryListUpdate } from '../store/QRContext';

import Playbill from '../models/PlaybillConstructor';
import * as firebase from 'firebase';
import { identify } from 'expo-analytics-segment';
import { Image } from 'native-base';

export default function QRScreen({ 
  navigation, 
  //onScanned,
 }) {

  //context
  const qrValue = useLibraryList()
  const addQRValue = useLibraryListUpdate()

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  //firestore
  var db = firebase.firestore();
  var user = firebase.auth().currentUser;
  


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data: qrdata }) => {
    setScanned(true);
    
    let qrArray = qrdata.split(" ")
    let image = qrArray[0]
    let pdf = qrArray[1]
    // let id = user.getIdToken()
    let id = user.uid
    console.log(user.uid)
    qrArray.push(id)
   
    new Playbill 
    addQRValue( qrArray );

    db.collection("users").doc(user.uid).set({
      playbill: {
        PDF: pdf,
        Image: image, 
        Id: id
      }
    }, { merge: true })
    .then(function(docRef) {
      // console.log("Document written with ID: ");
   })
    .catch(function(error) {
      console.error("Error adding document: ", error);
   });

   navigation.navigate('LibraryScreen02')
                    

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

      {/* {scanned && <Button title={'Scan Complete'} onPress={() => setScanned(false)} />} */}
    </View>
  );
}
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
    // console.log(user.uid)
    qrArray.push(id)
    console.log(qrArray)

    new Playbill 
    addQRValue( qrArray );

  if (db.collection("users").doc(user.uid) === null) {

    db.collection("users").doc(user.uid).set({
          ID: id
        }, { merge: true })
        .then(function(docRef) {
          //  console.log("Document written with ID: " + id);
       })
        .catch(function(error) {
          console.error("Error adding document: ", error);
       });

  } else if (db.collection("users").doc(user.uid) != null) {

    var playbills = db.collection("users").doc(user.uid)

    playbills.update({
      pdf: firebase.firestore.FieldValue.arrayUnion(pdf),
      image: firebase.firestore.FieldValue.arrayUnion(image),
      id: firebase.firestore.FieldValue.arrayUnion(id)
    }) 

  }


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
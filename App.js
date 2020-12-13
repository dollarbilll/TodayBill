//firebase,firestore
import * as firebase from 'firebase';
import firebaseConfig from './utils/firebaseConfig';
firebase.initializeApp(firebaseConfig);
require("firebase/firestore");
var db = firebase.firestore();

import React, { useState, useEffect } from 'react';

import { View, Text, Button, Image, Alert } from 'react-native';

import { NavigationContainer, useLinkProps } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { AppLoading } from 'expo';

import * as Font from 'expo-font';



import AuthScreen from './screens/AuthScreen';
import LibraryScreen02 from './screens/LibraryScreen02';
import QRScreen from './screens/QRScreen';
import PDFScreen from './screens/PDFScreen';
import SignUpScreen from './screens/SignUpScreen';
// import LoadingScreen from './screens/LoadingScreen';


//context
import { QRProvider } from './store/QRContext';

const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'title-font': require('./assets/fonts/Burford_Base.otf'),
    'montserrat-regular': require('./assets/fonts/Montserrat-Regular.otf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.otf'),
    'sfprodisplay-regular': require('./assets/fonts/SFProDisplay-Regular.ttf'),
    'graphique-regular': require('./assets/fonts/Graphique-Regular.otf')
  });
};

function signOutUser ( {navigation} ) {

      navigation.navigate('AuthScreen');
      console.log('e');

}

export default function App( {navigation} ) {
  console.log("16");
  //font 
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

    

  //no capital latter in input fields
  //loading screen/animation for log in / sign up into library 
  //catch(error) and alert(error) for 
  

  return (
    // <SignUpScreen />
    <QRProvider>
    <NavigationContainer>
    <Stack.Navigator 
      initialRouteName="Auth"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF2D11',
        },
        // headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'graphique-regular',
          fontSize: 35,
          fontWeight: '200',
          color: 'white',
          textAlign: 'center'
        },
        title: 'TODAYBILL',
        headerBackTitle: 'Back'
      }} >
      {/* <Stack.Screen name="LoadingScreen" component={LoadingScreen}
      /> */}
      <Stack.Screen name="AuthScreen" component={AuthScreen} 
      options={{
        headerTransparent: true,
      title: ''
    }} />
    
        <Stack.Screen 
          name="LibraryScreen02" 
          component={LibraryScreen02} 
          options={{
            headerLeft: null,
            headerRight: null
          }}

          />
        <Stack.Screen name="QRScreen" component={QRScreen} />
        <Stack.Screen name="PDFScreen" component={PDFScreen} /> 
      <Stack.Screen 
        name="SignUpScreen" 
        component={SignUpScreen} 
        options={{
          headerLeft: null
        }}
        />
    </Stack.Navigator>
  </NavigationContainer>
  </QRProvider>
  
  );
}



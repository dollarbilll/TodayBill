import React, { useState, useEffect } from 'react';
console.log("1");
import { View, Text, Button, Image, Alert } from 'react-native';
console.log("2");
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
console.log("3");
import { createSwitchNavigator, createStackNavigator } from '@react-navigation/stack';
console.log("4");
import { AppLoading } from 'expo';
console.log("5");
import * as Font from 'expo-font';
console.log("6");
import * as firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen'
// import { firebaseConfig } from './config/firebase.js';
// import { Facebook } from "expo"; 


import AuthScreen from './screens/AuthScreen';
import LibraryScreen02 from './screens/LibraryScreen02';
import QRScreen from './screens/QRScreen';
import PDFScreen from './screens/PDFScreen';
import SignUpScreen from './screens/SignUpScreen';
import firebaseConfig from './utils/firebaseConfig';
import SignInScreen from './screens/SignInScreen';

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

//firebase,firestore
require("firebase/firestore");
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();



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
  

  return (
    // <SignUpScreen />
    <QRProvider>
    <NavigationContainer>
    <Stack.Navigator 
      initialRouteName="AuthScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF2D11',
        },
        // headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'graphique-regular',
          fontSize: 35,
          fontWeight: '700',
          color: 'white'
        },
        title: 'TODAYBILL',
        headerBackTitle: 'Back'
      }} >
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
            
            // () => (
            //   <Button
            //     onPress={() => navigation.navigate('AuthScreen')}
            //     title="Log Out"
            //     color="#fff"
                  

            //   />
            // ),
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



import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useDispatch } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Input from '../models/Input';
import Card from '../models/Card';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import * as firebase from 'firebase';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import * as Facebook from 'expo-facebook';
import firebaseConfig from '../utils/firebaseConfig';
const facebookAppId = firebaseConfig.facebookAppId;

export default class AuthScreen extends React.Component{

    constructor(props){
        super(props)

        this.state = ({
            email: '',
            password: ''
        })
    }

    onLoginSuccess() {
        this.props.navigation.navigate('LibraryScreen02');
      }
      onLoginFailure(errorMessage) {
        this.setState({ error: errorMessage, loading: false });
      }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user != null) {
                // console.log(user)
            }
        })
    }

    loginUser = ( email, password) => {
       
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(error => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    this.onLoginFailure.bind(this)(alert("Incorrect Email or Password"));
                
                })
        
    }

    async logInWithFacebook() {
        try {
          // console.log(facebookAppId, typeof(facebookAppId));
          await Facebook.initializeAsync(facebookAppId);
          const { type, token } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const facebookProfileData = await firebase.auth().signInWithCredential(credential);
            this.onLoginSuccess.bind(this)
            this.props.navigation.navigate('LibraryScreen02')
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
      }

    render() {
    return (
        <ScrollView style={styles.authContainer}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>TodayBill</Text>
                    <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitleText}>Keep your programs digitally on hand!</Text>
                    </View>
                </View>
            </View>
            {/* <View style={styles.cardFlex}> */}
            <View style={styles.cardContainer}>
                <View style={styles.usernameContainer}> 
                    <View style={styles.iconContainer}>
                        {/* <MaterialCommunityIcons name="account" size={30} color="gray" /> */}
                    </View>
                    <View >
                    <TextInput
                        style={{ 
                        height: 20, 
                        width: 230, 
                        borderColor: 'gray', 
                        borderWidth: 1,
                        borderTopWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                         }}
                        onChangeText={(email) => this.setState({email})}
                        placeholder="Email"
                        placeholderTextColor="#B1B1B1"
                        returnKeyType="done"
                        textContentType="name"
                        autoCapitalize='none'
                    />
                    </View>
                </View>
                <View style={styles.usernameContainer}> 
                    <View style={styles.iconContainer}>
                        {/* <AntDesign name="lock" size={30} color="gray" /> */}
                    </View>
                    <View >
                        <TextInput
                            style={{ 
                                height: 20, 
                                width: 230, 
                                borderColor: 'gray', 
                                borderWidth: 1,
                                borderTopWidth: 0,
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                                color: 'black'
                            }}
                            placeholder="Password"
                            placeholderTextColor="#B1B1B1"
                            returnKeyType="done"
                            textContentType="Password"
                            autoCapitalize='none'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                        />
                    </View>
                </View>
            </View>
        {/* </View> */}
        <View style={styles.buttonView}>
            
            <TouchableOpacity style={[styles.buttonContainer, styles.signInButton]}
                onPress={() => 
                    this.loginUser(this.state.email, this.state.password)}>
                    
                <View style={styles.socialButtonContent}>
                    <Text style={styles.loginText}>     Sign In</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
            <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]} onPress={() => this.logInWithFacebook()}>
                <View style={styles.socialButtonContent}>
            <AntDesign name="facebook-square" size={24} color="white" />
            <Text style={styles.loginText}>     Sign in with Facebook</Text>
                </View>
            </TouchableOpacity>
        </View>
            <View style={styles.switcherContainer}>
                <Text style={styles.switchTextStyle}>Dont have an account?</Text>
                <Text style={styles.switchButtonStyle} onPress={() => {this.props.navigation.navigate('SignUpScreen')}}
                >SIGN UP</Text> 
            </View>
         </ScrollView>
    );
}
}

const styles = StyleSheet.create({
    header: 
    {
        width: '100%',
        height: '35%',
        // flex: 1,
        backgroundColor: '#ff2508',
    },
    titleContainer:
    {
        width: '100%',
        alignItems: 'center',
        resizeMode: 'contain',
        marginTop: '17%'
        
    },
    titleText: 
    {
        fontSize: 63,
        fontFamily: 'graphique-regular',
        color: 'white'
    },
    subtitleContainer:
    {
        width: 221,
        alignItems: 'center',
        resizeMode: 'contain',
        height: 77,
        color: '#ffffff',
        // marginVertical: 10

    },
    subtitleText: 
    {
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center'
    },
    authContainer: 
    {
        
    },
    usernameContainer: {
        width: '80%',
        height: '10%',
        flexDirection: 'row',
        flex: 1,
        // padding: 5,
        justifyContent: 'center',
        marginTop: '5%'
    },
    iconContainer: {
        marginBottom: 20
    },
    cardFlex: {
        // flexGrow: 2
    },
    cardContainer: 
    {
        width: '100%',
        flexGrow: 5,
        alignItems: 'center',
        resizeMode: 'contain',
        // height: '10%',
        //opacity: 0.4,
        color: '#2e2e2e',
        fontFamily: 'montserrat-regular',
        fontSize: 16,
        fontWeight: '500',
        // marginLeft: 33,
        marginTop: '35%',
    },
    signInButtonContainer:
    {
        width: '75%',
        height: 49,
        shadowColor: 'rgba(0, 153, 145, 0.32)',
        shadowOffset: { width: 4, height: 1 },
        shadowRadius: 8,
        shadowOpacity: 1,
        borderRadius: 4,
        backgroundColor: '#ff2508',
        marginTop: '10%',
        marginHorizontal: 32,
        justifyContent: 'center',
        // elevation: 5
    },
    switcherContainer: 
    {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-around',
        // marginLeft: 75,
        marginTop: '10%',
        marginBottom: '15%'
        
    },
    switchTextStyle: {
        opacity: 0.4,
        color: '#000000',
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        fontWeight: '500',
    },
    switchButtonStyle:
    {
        fontSize: 14,
        fontWeight: '700',
        color: '#ff2508',
    },
    buttonView: {
        width: '100%',
        alignItems: 'center',
        resizeMode: 'contain'
    },
    buttonContainer: {
        height:49,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width:'75%',
        borderRadius:4,
      },
      fabookButton: {
        backgroundColor: "#3b5998",
        height: 49  
      },
      signInButton: {
        backgroundColor: '#ff2508'
      },
      socialButtonContent:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
      },
      loginText: {
        color: 'white',
      },


})

// export default AuthScreen;
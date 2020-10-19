import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
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





// const AuthScreen = props => {
//     const [emailValue, onChangeText] = React.useState('Email');
//     const [passwordValue, onChangetext] = React.useState('Password');

function AuthScreen({ navigation }) {

    return (
        <ScrollView style={styles.authContainer}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>TodayBill</Text>
                    <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitleText}>Keep your playbills digitally on hand!</Text>
                    </View>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.usernameContainer}> 
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="account" size={30} color="gray" />
                    </View>
                    <View >
                    <TextInput
                        style={{ 
                        height: 20, 
                        width: 230, 
                        borderColor: 'gray', 
                        borderWidth: 2,
                        borderTopWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                         }}
                        // onChangeText={text => onChangeText(text)}
                        // emailValue={emailValue}
                        placeholder="Username"
                        placeholderTextColor="#B1B1B1"
                        returnKeyType="done"
                        textContentType="name"
                    />
                    </View>
                </View>
                <View style={styles.usernameContainer}> 
                    <View style={styles.iconContainer}>
                        <AntDesign name="lock" size={30} color="gray" />
                    </View>
                    <View >
                        <TextInput
                            style={{ 
                                height: 20, 
                                width: 230, 
                                borderColor: 'gray', 
                                borderWidth: 2,
                                borderTopWidth: 0,
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                                color: 'black'
                            }}
                            placeholder="Password"
                            placeholderTextColor="#B1B1B1"
                            returnKeyType="done"
                            textContentType="Password"
                            secureTextEntry={true}
                            // onChangeText={text => onChangeText(text)}
                            // passwordValue={passwordValue}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.signInButtonContainer}>
                <Button 
                title="SIGN IN" 
                color='white'
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('LibraryScreen02')
                    // <signInWithFacebook/>
                  }}
                />
            </View>
            <View style={styles.switcherContainer}>
                <Text style={styles.switchTextStyle}>Dont have an account?</Text>
                <Text style={styles.switchButtonStyle} onPress={() => {navigation.navigate('SignUpScreen')}}
                >SIGN UP</Text> 
            </View>
            
         </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: 
    {
        width: '100%',
        height: 230,
        // flex: 1,
        backgroundColor: '#ff2508',
    },
    titleContainer:
    {
        width: 300,
        height: 77,
        marginLeft: '25%',
        marginTop: '20%'
        
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
        height: 77,
        color: '#ffffff',
        marginLeft: '7%',
        marginVertical: 10

    },
    subtitleText: 
    {
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        fontWeight: '700',
        color: 'white'
    },
    authContainer: 
    {
        // padding: 20
    },
    usernameContainer: {
        width: 300,
        height: 100,
        flexDirection: 'row',
        flex: 1,
        // padding: 5,
        justifyContent: 'space-around',
        // marginVertical: 20
    },
    iconContainer: {
        marginBottom: 20
    },
    cardContainer: 
    {
        width: 200,
        height: 100,
        //opacity: 0.4,
        color: '#2e2e2e',
        fontFamily: 'montserrat-regular',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 33,
        marginTop: 175,
    },
    signInButtonContainer:
    {
        width: 311,
        height: 49,
        shadowColor: 'rgba(0, 153, 145, 0.32)',
        shadowOffset: { width: 4, height: 1 },
        shadowRadius: 8,
        shadowOpacity: 1,
        borderRadius: 4,
        backgroundColor: '#ff2508',
        marginTop: 60,
        marginHorizontal: 32,
        justifyContent: 'center',
        // elevation: 5
    },
    switcherContainer: 
    {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 75,
        marginTop: 40
        
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
    }


})

export default AuthScreen;
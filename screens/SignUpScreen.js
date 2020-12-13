import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    Image,
    ScrollView,
    Alert
  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import LibraryScreen from './LibraryScreen';
import 'firebase/firestore';
import firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as Segment from 'expo-analytics-segment';

import firebaseConfig from '../utils/firebaseConfig';
import LibraryScreen02 from './LibraryScreen02';
import { zip } from 'lodash';

export const isAndroid = () => Platform.OS === 'android';

  const facebookAppId = 
  firebaseConfig.facebookAppId;
// console.log(facebookAppId, typeof(facebookAppId));

const androidClientId = 
  firebaseConfig.androidClientId;

const IOSClientId = 
  firebaseConfig.iosClientId;

    //this.props.navigator.navigate()

    //firestore
    // var db = firebase.firestore();
    // var user = firebase.auth().currentUser;

class SignUpScreen extends React.Component {
    state = { name: '', zipcode: '', birthdate: '', gender: '', email: '', password: '', password2: '', errorMessage: '', loading: false };
    constructor( props ) {
      super(props);
    }
    onLoginSuccess() {
      this.props.navigation.navigate('LibraryScreen02');
      
    }
    onLoginFailure(errorMessage) {
      this.setState({ error: errorMessage, loading: false });
    }
    renderLoading() {
      if (this.state.loading) {
        return (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        );
      }
    }
    async signUpWithEmail() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(this.onLoginSuccess.bind(this))
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                this.onLoginFailure.bind(this)(alert('Weak Password!'));
            } else {
                this.onLoginFailure.bind(this)(alert('Inputs are badly formatted!'));
            }
        })
        //firestore
        var db = firebase.firestore();
        var user = firebase.auth().currentUser;
        db.collection("users").doc(user.uid).set({
          email: this.state.email,
          name: this.state.name,
          zipcode: this.state.zipcode,
          birthdate: this.state.birthdate,
          gender: this.state.gender
        }, { merge: true })
        .then(function(docRef) {
          console.log("Document written with ID: ");
       })
        .catch(function(error) {
          console.error("Error adding document: ", error);
       });
       console.log(this.state.name, this.state.zipcode, this.state.birthdate, this.state.gender);
        
    }
    async signUpWithFacebook() {
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
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }
    // async signInWithGoogle() {
    //   try {
    //     const result = await Expo.Google.logInAsync({
    //       androidClientId: androidClientId,
    //       iosClientId: IOSClientId,
    //       behavior: 'web',
    //       iosClientId: '', //enter ios client id
    //       scopes: ['profile', 'email']
    //     });
        
    //     if (result.type  === 'success') {
    //       await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    //       const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
    //       const googleProfileData = await firebase.auth().signInWithCredential(credential);
    //       this.onLoginSuccess.bind(this);
    //     }
    //   } catch ({ message }) {
    //     alert('login: Error:' + message);
    //   }
    // }
    render() {
    return (
      <ScrollView style={styles.scrollContainer}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
              <TextInput
                style={styles.input}
                placeholder="Zip Code"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="postalCode"
                value={this.state.zipcode}
                onChangeText={zipcode => this.setState({ zipcode })}
              />
              <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                //textContentType="none"
                value={this.state.birthdate}
                onChangeText={birthdate => this.setState({ birthdate })}
              />
              <TextInput
                style={styles.input}
                placeholder="Gender"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                //textContentType="none"
                value={this.state.gender}
                onChangeText={gender => this.setState({ gender })}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                //textContentType="emailAddress"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password2}
                onChangeText={password2 => this.setState({ password2 })}
              />
            </View>
            {this.renderLoading()}
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'red',
                width: '80%'
              }}
            >
              {this.state.error}
            </Text>
            <TouchableOpacity 
            style={[styles.buttonContainer, styles.signUpButton]}
            onPress={() => 
                this.signUpWithEmail(this.state.email, this.state.password)
                // console.log(this.state.email)
              }
            // onPress={() => { this.props.navigation.navigate('AuthScreen')}} 
            >
          <View style={styles.socialButtonContent}>
            {/* <AntDesign name="twiSigtter" size={24} color="white" /> */}
            <Text style={styles.loginText}>     SIGN UP</Text>
          </View>
        </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]} onPress={() => this.signUpWithFacebook()}>
            <View style={styles.socialButtonContent}>
            <AntDesign name="facebook-square" size={24} color="white" />
            <Text style={styles.loginText}>     Sign Up with Facebook</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity style={[styles.buttonContainer, styles.googleButton]}>
          <View style={styles.socialButtonContent}>
            <AntDesign name="google" size={24} color="black" />
            <Text style={styles.loginText_Black}>   Continue with Google</Text>
          </View>
        </TouchableOpacity> */}
            <View style={{ marginTop: 15, marginBottom: '20%' }}>
              <Text
                style={{ fontWeight: '200', fontSize: 17, textAlign: 'center' }}
                onPress={() => {
                   this.props.navigation.navigate('AuthScreen');
                }}
              >
                Already have an account?
              </Text>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
       </TouchableWithoutFeedback>
       </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  form: {
    width: '86%',
    marginTop: '20%',
    marginBottom: '10%'
  },
  logo: {
    marginTop: 20
  },
  input: {
    fontSize: 15,
    borderColor: '#707070',
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    width:'75%',
    borderRadius:4,
  },
  fabookButton: {
    backgroundColor: "#3b5998",
  },
  googleButton: {
    backgroundColor: "#ff0000",
  },
  loginText: {
    color: 'white',
  },
  loginText_Black: {
    color: 'black',
  },
  button: {
    backgroundColor: '#3A559F',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  signUpButton: {
    backgroundColor: '#ff2508',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#707070'
  },
  socialButtonContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  socialIcon:{
    color: "#FFFFFF",
    marginRight:5
  }
});


export default SignUpScreen;
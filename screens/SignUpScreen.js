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
    Image
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
import LibraryScreen_02 from './LibraryScreen02';

export const isAndroid = () => Platform.OS === 'android';


  const facebookAppId = 
  firebaseConfig.facebookAppId;
console.log(facebookAppId, typeof(facebookAppId));

const androidClientId = 
  firebaseConfig.androidClientId;

const IOSClientId = 
  firebaseConfig.iosClidentId;

    //this.props.navigator.navigate()

class SignUpScreen extends React.Component {
    state = { email: '', password: '', errorMessage: '', loading: false };
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
    async signInWithEmail() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(this.onLoginSuccess.bind(this))
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                this.onLoginFailure.bind(this)('Weak Password!');
            } else {
                this.onLoginFailure.bind(this)(errorMessage);
            }
        });
    }
    async signInWithFacebook() {
      try {
        console.log(facebookAppId, typeof(facebookAppId));
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
    async signInWithGoogle() {
      try {
        const result = await Expo.Google.logInAsync({
          androidClientId: androidClientId,
          iosClientId: IOSClientId,
          behavior: 'web',
          iosClientId: '', //enter ios client id
          scopes: ['profile', 'email']
        });
        
        if (result.type  === 'success') {
          await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
          const googleProfileData = await firebase.auth().signInWithCredential(credential);
          this.onLoginSuccess.bind(this);
        }
      } catch ({ message }) {
        alert('login: Error:' + message);
      }
    }
    render() {
    return (
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
                //Type="name"
                value={this.state.displayName}
                onChangeText={displayName => this.setState({ displayName })}
              />
              <TextInput
                style={styles.input}
                placeholder="Zip Code"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                //textContentType="postalCode"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                //textContentType="none"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              <TextInput
                style={styles.input}
                placeholder="Gender"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                //textContentType="none"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
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
              style={{ width: '86%', marginTop: 10, marginBottom: 10 }}
              onPress={() => this.signInWithEmail()}
            onPress={() => { navigation.navigate('AuthScreen')}}
            >
                <Text>Sign Up</Text>
            </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]} onPress={() => this.signInWithFacebook()}>
            <View style={styles.socialButtonContent}>
            <AntDesign name="facebook-square" size={24} color="white" />
            <Text style={styles.loginText}>     Continue with Facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.twitterButton]}>
          <View style={styles.socialButtonContent}>
            <AntDesign name="twitter" size={24} color="white" />
            <Text style={styles.loginText}>     Continue with Twitter</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.googleButton]}>
          <View style={styles.socialButtonContent}>
            <AntDesign name="google" size={24} color="black" />
            <Text style={styles.loginText_Black}>   Continue with Google</Text>
          </View>
        </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  form: {
    width: '86%',
    marginTop: 15
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
    marginBottom:20,
    width:250,
    borderRadius:30,
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
    borderRadius: 22
  },
  twitterButton: {
    backgroundColor: '#00ACEE',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22
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
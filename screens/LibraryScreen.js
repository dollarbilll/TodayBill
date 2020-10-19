import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../models/Input';
import Card from '../models/Card';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import Header from '../components/Header';
import { PLAYBILLS } from '../DummyData';



// const LibraryScreen = props => {
function LibraryScreen({ navigation }) {
    return(
        <ScrollView>
        <View style={styles.screen}> 
                     {/* <Header title="TODAYBILL" /> */}
            <View style={styles.scanContainer}>
                <TouchableOpacity onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('QRScreen')
                  }}>
                    <Image 
                    style={styles.scanImage}
                    source = {require('../assets/screens/library/scan/scan.png')} />
                </TouchableOpacity>
                </View>
            <View style={styles.subHeaderContainer}> 
                     <Text style={styles.subHeader}>Your Programs</Text>
                </View>
            <View style={styles.shelf}>
                <LinearGradient
                    colors={['white', '#F5EFEE', '#192f6a']}
                    style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    // height: 300,
                    }}
                    >
                <TouchableOpacity 
                    onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('PDFScreen')
                  }}
                  >
                    <Image style={styles.pdf} source={require('../assets/screens/library/pdf/playbill.png')} />
                    <Image style={styles.pdf} source={require('../assets/screens/library/pdf/playbill.png')} />
                    <Image style={styles.pdf} source={require('../assets/screens/library/pdf/playbill.png')} />
                </TouchableOpacity>
                </LinearGradient>
                </View>
            <View style={styles.shelf}>
                <LinearGradient
                    colors={['white', '#F5EFEE', '#192f6a']}
                    style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    // height: 300,
                    }}
                    >
                <TouchableOpacity 
                    onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('PDFScreen')
                  }}
                  >
                    <Image style={styles.pdf} source={require('../assets/screens/library/pdf/playbill.png')} />
                    <Image style={styles.pdf} source={require('../assets/screens/library/pdf/playbill.png')} />
                    <Image style={styles.pdf} source={require('../assets/screens/library/pdf/playbill.png')} />
                </TouchableOpacity>
                </LinearGradient>
                </View>
            <View style={styles.shelf}>
                <LinearGradient
                    colors={['white', '#F5EFEE']}
                    style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    // height: 300,
                    }}
                    >
                <TouchableOpacity 
                    onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('PDFScreen')
                  }}
                  >
                    <Image style={styles.pdf} source={require('../assets/screens/library/pdf/playbill.png')} />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('PDFScreen')
                  }}
                  >
                    <Image style={styles.pdf} source={require('../assets/screens/library/pdf/playbill.png')} />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('PDFScreen')
                  }}
                  >
                    <Image style={styles.pdf} source={require('../assets/screens/library/pdf/playbill.png')} />
                </TouchableOpacity>
                </LinearGradient>
                </View>
        </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    scanText: {
      color: '#000000',
      fontFamily: 'sfprodisplay-regular',
      fontSize: 16,
      fontWeight: '400',
    },
    scanContainer: {
        paddingTop: 80,
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 30
    }, 
    scanImage: {
        resizeMode: 'contain',
        width: 70, 
        height: 70,
    },
    screen: {
        flex: 1,
        //padding: 10,
        backgroundColor: 'white'
      },
    subHeaderContainer: {
        paddingLeft: 20,
        paddingVertical: 20,
        width: 200, 
        height: 70,
        // backgroundColor: 'black'
    },
    subHeader: {
        opacity: 0.4,
        color: 'black',
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        fontWeight: '500',
    },
    shelf: {
        width: '100%',
        height: 125,
        paddingHorizontal: 50,
        backgroundColor: '#F5EFEE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    pdf: {
        height: 100,
        resizeMode: 'contain'
    },
    libraryItemStyle: {
        flex: 1, 
        margin: 5, 
        height: 50,
    }
  });

  export default LibraryScreen;
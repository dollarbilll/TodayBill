import * as firebase from 'firebase';



import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    FlatList,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';


import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import _ from 'lodash';

import { useLibraryList, useLibraryListUpdate } from '../store/QRContext';


const maxItemHeight = 151;

const LibraryScreen02 = props => {
    const qrValue = useLibraryList()
    const addQRValue = useLibraryListUpdate()
    const [items, setItems] = useState([])
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    var documentReference = db.collection('users').doc(user.uid);

    useEffect(
        () => {
            const loadUserData = async () => {
                documentReference.get().then(function(documentSnapshot){
                    console.log("LIBRARY " + items.length + 1)
                    
                const playbillFirestore = documentSnapshot.data();
               
                var combinedItems = [];
                for(var i = 0; i < playbillFirestore.image.length; i++){
                    combinedItems.push({image: playbillFirestore.image[i], pdf: playbillFirestore.pdf[i]})
                }
                console.log("LIBRARY " + combinedItems.length)
                setItems(combinedItems)
           
                console.log("LIBRARY " + items.length + 2)
                });
            }
            loadUserData()
        }, []
    )

     const renderLibraryItem = (itemData) => {        
        return (
            <TouchableOpacity
                style={styles.libraryItem}
                onPress={() => {
                    props.navigation.navigate('PDFScreen',
                        {
                            pdf: itemData.item.pdf,
                            image: itemData.item.image
                        });
                }
                } >
                <View style={styles.libraryItem}>
                    <Image
                        source={{ uri: itemData.item.image }}
                        style={{ width: 75, height: maxItemHeight - 50, resizeMode: 'contain' }}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('QRScreen')
                    }} >
                    <Image
                        style={styles.scanImage}
                        source={require('../assets/screens/library/scan/scan.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.shelving}>
                <View style={styles.gradient}>
                    {
                        _.range(Math.max(4, Math.ceil(items.length / 3))).map(i =>
                            <LinearGradient
                                colors={['white', '#F5EFEE', '#ede5e1']}
                                style={{
                                    height: maxItemHeight,
                                    width: '100%'
                                }}
                            >
                            </LinearGradient>)}
                </View>
                <View style={styles.flatlist}>
                    <FlatList
                        // id={item.id}
                        // data={qrValue}
                        data={items}
                        renderItem={renderLibraryItem}
                        numColumns={3}
                        columnWrapperStyle={styles.rowStyle}
                        contentContainerStyle={styles.flatlist} />
                </View>
            </View>
        </ScrollView>
    )
}

//LibraryScreen02.navigationOptions

const styles = StyleSheet.create({
    libraryItem: {
        display: 'flex',
        flexDirection: 'column-reverse',
        flexGrow: 1,
        height: maxItemHeight,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        resizeMode: 'contain',


    },
    screen: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    scanImage: {
        // minWidth: '10%', 
        maxWidth: '18%',
        resizeMode: 'contain',
        marginVertical: '9%'

    },
    shelving: {
        marginBottom: '10%'
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%'
    },
    flatlistContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
    },
    flatlist: {
        // justifyContent: 'flex-start',
        marginHorizontal: 3
    }
})

export default LibraryScreen02;
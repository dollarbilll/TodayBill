import React, { useContext } from 'react';
import { 
    StyleSheet, 
    FlatList, 
    Text, 
    View,
    TouchableOpacity,
    Image,
 } from 'react-native';

import { PLAYBILLS } from '../DummyData';
import Playbill from '../models/PlaybillConstructor';
import LibraryScreen from './LibraryScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { max } from 'react-native-reanimated';
import _ from 'lodash';
import { render } from 'react-dom';
import { useLibraryList, useLibraryListUpdate } from '../store/QRContext';

const maxItemHeight = 151; 

const LibraryScreen_02 = props => {
    const qrValue = useLibraryList()
    const addQRValue = useLibraryListUpdate()

    const renderLibraryItem = (itemData) => {
     return (
            <TouchableOpacity 
            style={styles.libraryItem}
            onPress={() => {
                props.navigation.navigate('PDFScreen', 
                    {
                        pdfId: itemData.item.id,
                        imageUri: itemData.item.imageUri
                    });
                    }
                } >
                {/* practice getting pdfscreen to be specific pdf, so navigate to a screen thats based on params and isn't always the same thing.  */}
            
                <View style={styles.libraryItem}>
                    <Image 
                         source={{uri: itemData.item.imageUri}} 
                            style={{ width: 100, height: maxItemHeight-25, resizeMode: 'contain'}}
                        
                         />
                    {/* <Text>{itemData.item.imageUri}</Text> */}
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
                        source = {require('../assets/screens/library/scan/scan.png')} />
                    </TouchableOpacity>
            </View>
            <View style={styles.shelving}>
                <View style={styles.gradient}>
                    { 
                    _.range(Math.max(4, Math.ceil(PLAYBILLS.length/3))).map(i => 
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
                            data={qrValue} 
                            renderItem={renderLibraryItem} 
                            numColumns={3} 
                            columnWrapperStyle={styles.rowStyle}
                            contentContainerStyle={styles.flatlist} />
                </View>
            </View>
        </ScrollView>
    )
}

//LibraryScreen_02.navigationOptions

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
        resizeMode: 'contain'
        // height: '15%',
        
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

export default LibraryScreen_02;
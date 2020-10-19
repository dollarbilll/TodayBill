import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const Header = props => {
    return(
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 110,
        paddingTop: 36,
        backgroundColor: '#ff2d11',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'title-font',
        fontSize: 35,
        fontWeight: '700',
        color: 'white'
    }
});

export default Header; 
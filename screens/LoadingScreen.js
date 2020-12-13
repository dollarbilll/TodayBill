// import React from 'react'
// import { Spinner, View, StyleSheet } from 'react-native'
// import * as firebase from 'firebase'

// import LibraryScreen02 from './LibraryScreen02'
// import AuthScreen from './AuthScreen'

// export default function LoadingScreen( {navigation} ) {

    
//     React.useEffect(() => {
//         // Runs after the first render() lifecycle
   
//         firebase.auth().onAuthStateChanged(user => {
//             if (user) {
//                 navigation.navigate('LibraryScreen02');
//             } else {
//                 navigation.navigate('AuthScreen');
//             }
//           });          
//     }, []);
    
//     return(
//       <View style={styles.spinnerStyle}>
//         <Spinner size="large" />
//       </View>
//         )
//     }

// const styles = StyleSheet.create({
//     spinnerStyle: {
//         backgroundColor: '#ff2508'
//     }
// })


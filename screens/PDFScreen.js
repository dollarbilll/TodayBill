import * as React from 'react';
import { View } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

import { PLAYBILLS } from '../DummyData';
import { useLibraryList } from '../store/QRContext';

const PDFScreen = props => {
  const route = useRoute();
  const { pdfId }  = route.params;
  const qrValue = useLibraryList();
  const selectedPDF = qrValue.find( pdf => pdf.id === pdfId );
    //const navigation = useNavigation();
    return (
      <PDFReader
        source={{
          //uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          uri: selectedPDF.uri
        }}
      />
      // <View>
      //   <Text>
      //     Hello:]
      //   </Text>
      // </View>
    )
  }

  export default PDFScreen;



/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


// import React from 'react';
// import { StyleSheet, Dimensions, View } from 'react-native';
// import Pdf from 'react-native-pdf';

// export default class PDFScreen extends React.Component {
//     render() {
//         // const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
//         // const source = require('../assets/pdf/HighSociety.pdf');  // ios only
//         // const source = {uri:'bundle-assets://test.pdf'};

//         //const source = {uri:'file:///sdcard/test.pdf'};
//         //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

//         return (
//             <View style={styles.container}>
//                 <Pdf
//                     source={source}
//                     onLoadComplete={(numberOfPages,filePath)=>{
//                         console.log(`number of pages: ${numberOfPages}`);
//                     }}
//                     onPageChanged={(page,numberOfPages)=>{
//                         console.log(`current page: ${page}`);
//                     }}
//                     onError={(error)=>{
//                         console.log(error);
//                     }}
//                     onPressLink={(uri)=>{
//                         console.log(`Link presse: ${uri}`)
//                     }}
//                     style={styles.pdf}/>
//             </View>
//         )
//   }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginTop: 25,
//     },
//     pdf: {
//         flex:1,
//         width:Dimensions.get('window').width,
//         height:Dimensions.get('window').height,
//     }
// });
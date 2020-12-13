import * as React from 'react';
import { View, Text} from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

import { PLAYBILLS } from '../DummyData';
import { useLibraryList } from '../store/QRContext';

const PDFScreen = props => {
  const route = useRoute();
  const { pdf }  = route.params;

    return (
        <PDFReader
        source={{
          uri: pdf
        }}
      />
    )
  }

  export default PDFScreen;
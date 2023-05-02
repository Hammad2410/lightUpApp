/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';

import 'react-native-gesture-handler';

import Navigator from './src/navigator';
import { Provider } from 'react-redux';
import createStore from './src/Redux/createStore';
import { StripeProvider } from '@stripe/stripe-react-native';


const store = createStore()

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // backgroundColor: 'red'
  };


  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey="pk_test_51MxcVyJ6mDybK89H8EWDB1sDt68whHSXSPe69Le5q0NDme5Xw5yxpNDjckx2Oyyr4v5PPRNt6cyaSxkczB0Fo1Wg00wDRhOtjH"

        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
      >
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Navigator />
        </SafeAreaView>
      </StripeProvider>
    </Provider>
  );
}

export default App;

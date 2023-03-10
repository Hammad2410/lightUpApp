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


const store = createStore()

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // backgroundColor: 'red'
  };


  return (
    <Provider store={store}>
      <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
}

export default App;

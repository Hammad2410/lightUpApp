import * as React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../views/Home';
import EssayScreen from '../views/Essay';
import StoryScreen from '../views/Story';
import SummarizeScreen from "../views/Summerize";
import TestScreen from "../views/Test";
import LoginScreen from "../views/Login";
import SignUpScreen from '../views/SignUp';

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name='login' component={LoginScreen} />
                <Stack.Screen name='signUp' component={SignUpScreen} />
                <Stack.Screen name='home' component={HomeScreen} />
                <Stack.Screen name='essay' component={EssayScreen} />
                <Stack.Screen name='story' component={StoryScreen} />
                <Stack.Screen name='summarize' component={SummarizeScreen} />
                <Stack.Screen name='test' component={TestScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
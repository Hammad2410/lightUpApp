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
import AskQuestionScreen from '../views/AskQuestion';
import MathsQuestion from '../views/MathsQuestion';
import LetterScreen from '../views/Letter';
import SplashScreen from '../views/Splash';
import ApplicationScreen from '../views/Application';
import SpeechScreen from '../views/Speech';
import EmailScreen from '../views/Email';
import BlogScreen from '../views/Blog';
import TranslateScreen from '../views/Translate';
import VerifyNumberScreen from '../views/VerifyNumber';
import ChangePasswordScreen from '../views/ChangePassword';
import ForgotPasswordScreen from '../views/forgetPassword';

const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions} initialRouteName={'splash'}>
                <Stack.Screen name='login' component={LoginScreen} />
                <Stack.Screen name='signUp' component={SignUpScreen} />
                <Stack.Screen name='home' component={HomeScreen} />
                <Stack.Screen name='essay' component={EssayScreen} />
                <Stack.Screen name='story' component={StoryScreen} />
                <Stack.Screen name='summarize' component={SummarizeScreen} />
                <Stack.Screen name='test' component={TestScreen} />
                <Stack.Screen name='askQuestion' component={AskQuestionScreen} />
                <Stack.Screen name='mathsQuestion' component={MathsQuestion} />
                <Stack.Screen name='letter' component={LetterScreen} />
                <Stack.Screen name='splash' component={SplashScreen} />
                <Stack.Screen name='application' component={ApplicationScreen} />
                <Stack.Screen name='speech' component={SpeechScreen} />
                <Stack.Screen name='email' component={EmailScreen} />
                <Stack.Screen name='blog' component={BlogScreen} />
                <Stack.Screen name='translate' component={TranslateScreen} />
                <Stack.Screen name='verifyNumber' component={VerifyNumberScreen} />
                <Stack.Screen name='forgotPassword' component={ForgotPasswordScreen} />
                <Stack.Screen name='changePassword' component={ChangePasswordScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
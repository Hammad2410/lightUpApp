import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, Platform, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';
import { postCall } from '../../utils/apiCall';
import md5 from 'md5';
import { ScrollView } from 'react-native-gesture-handler';
import { loggedIn } from '../../Redux/Actions/activity';
import PrimaryButton from '../../components/primaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        try {
            let username = await AsyncStorage.getItem('username', null);
            let password = await AsyncStorage.getItem('password', null);

            if (username && password) {
                setPassword(password);
                setEmail(username);
                setToggleCheckBox(true);
            }

        }
        catch (error) {
            console.log("Error: ", error.message)
        }
    }, [])


    const dispatch = useDispatch()

    const onSubmit = () => {

        setLoading(true)

        const params = {
            email: email,
            password: md5(password)
        }

        const cbSuccess = (data) => {
            setLoading(false)
            console.log('Response: ', data)

            if (toggleCheckBox) {
                AsyncStorage.setItem('password', password);
                AsyncStorage.setItem('username', email);
            }
            else {
                AsyncStorage.setItem('password', '');
                AsyncStorage.setItem('username', '');
            }


            dispatch(loggedIn(data.token))

            navigation.navigate("home")


        }

        const cbFailure = (error) => {
            setLoading(false)
            alert(error)
        }

        postCall('/auth/login', params, cbSuccess, cbFailure)

    }

    const onForgetPassword = () => {

        setLoading(true)

        const params = {
            email: email,
            // password: md5(password)
        }

        const cbSuccess = (data) => {
            setLoading(false)
            console.log('Response: ', data)
            // dispatch(loggedIn(data.token))

            navigation.navigate('forgotPassword', { email: email })


        }

        const cbFailure = (error) => {
            setLoading(false)
            alert(error)
        }

        postCall('/auth/forgotPassword', params, cbSuccess, cbFailure)

    }

    return (

        <View style={styles.container} >
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'height' : null} keyboardVerticalOffset={RFValue(50)}>
                <ScrollView>


                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    </View>

                    <View style={{ padding: RFValue(5), marginTop: RFValue(50) }}>
                        <Text style={styles.label}>Login</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholderTextColor={'#B5B5B5'}
                            keyboardType={'email-address'}
                            placeholder={"Email"}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.TextInput}
                            placeholderTextColor={'#B5B5B5'}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                            placeholder={"Password"} />

                        <View style={{ width: '100%', marginVertical: RFValue(15), flexDirection: 'row' }}>


                            <TouchableOpacity style={{ flexDirection: 'row', flex: 1, }} onPress={() => setToggleCheckBox(!toggleCheckBox)}>
                                <CheckBox
                                    disabled={true}
                                    value={toggleCheckBox}
                                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                    tintColors={{ true: '#000', false: "#000" }}
                                    style={styles.checkBox}
                                    boxType={'square'}
                                />
                                <Text style={styles.textRememberMe}>Remember me</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => onForgetPassword()}>
                                <Text style={styles.textForgotPassword}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        {
                            loading ?
                                <ActivityIndicator size={'large'} color={'#628BEC'} />
                                :
                                <PrimaryButton label={"Log In"}
                                    // onPress={() => navigation.navigate("home")}
                                    onPress={onSubmit}

                                />
                            // <TouchableOpacity style={{ width: '50%', height: RFValue(40), justifyContent: 'center', alignItems: 'center', backgroundColor: '#628BEC', marginVertical: RFValue(20), borderRadius: RFValue(5), alignSelf: 'center' }}
                            //     // onPress={() => navigation.navigate("home")}
                            //     onPress={onSubmit}
                            // >
                            //     <Text
                            //         style={{ color: '#FFF', fontSize: RFValue(14) }}
                            //     >
                            //         Submit
                            //     </Text>
                            // </TouchableOpacity>
                        }



                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingVertical: RFValue(20) }}>
                <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}
                    onPress={() => navigation.navigate("signUp")}
                >
                    <Text
                        style={styles.textRememberMe}
                    >
                        Don't have an account?
                        <Text style={styles.textForgotPassword}> SIGN UP!</Text>

                    </Text>
                </TouchableOpacity>
            </View>
        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: RFValue(10),
        backgroundColor: "#FFF"
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RFValue(75)
    },
    body: {
        width: '100%'
    },
    textLabel: {
        fontSize: RFValue(12),
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: RFValue(5)
    },
    TextInput: {
        backgroundColor: "#F6F6F6",
        height: RFValue(60),
        width: '100%',
        borderRadius: RFValue(10),
        marginVertical: RFValue(5),
        paddingHorizontal: RFValue(10),
        fontSize: RFValue(15),
        color: '#6D6D6D'
    },
    label: {
        color: '#000',
        fontSize: RFValue(20),
        marginVertical: RFValue(5)
    },
    logo: {
        width: RFValue(80),
        height: RFValue(80),
        resizeMode: 'contain'
    },
    textForgotPassword: {
        color: '#BFAA94',
        fontSize: RFValue(13)
    },
    textRememberMe: {
        color: '#000',
        fontSize: RFValue(13)
    },
    checkBox: {
        marginRight: Platform.OS == 'ios' ? RFValue(10) : RFValue(20),
        height: RFValue(15),
        width: RFValue(15)
    }


})

export default Login
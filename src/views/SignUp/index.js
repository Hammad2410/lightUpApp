import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-input';
import { postCall } from '../../utils/apiCall';
import md5 from 'md5'
import PrimaryButton from '../../components/primaryButton';

function SignUp({ navigation }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('+92')
    const [loading, setLoading] = useState(false)

    const phoneRef = useRef(undefined);

    const onSubmit = () => {

        if (password == confirmPassword) {
            setLoading(true)
            const params = {
                email: email,
                password: md5(password),
                first_name: firstName,
                last_name: lastName,
                phone: phoneNumber
            }

            const cbSuccess = (data) => {
                setLoading(false)
                console.log('Response: ', data)

                navigation.navigate('verifyNumber', { email: email, phone: phoneNumber })

            }

            const cbFailure = (error) => {
                setLoading(false)
                alert(error)
            }

            postCall('/auth/signUp', params, cbSuccess, cbFailure)
        }
        else {
            alert("Password doesnot match")
        }
    }


    return (
        <View style={styles.container} >
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'height' : null} keyboardVerticalOffset={RFValue(50)}>
                <ScrollView>

                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    </View>


                    <View style={{ padding: RFValue(5) }}>
                        <Text style={styles.label}>sign up</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholderTextColor={'#B5B5B5'}
                            onChangeText={setEmail}
                            keyboardType={'email-address'}
                            placeholder={"Email"} />
                        <PhoneInput
                            style={styles.TextInput}
                            textStyle={{ color: '#000', fontSize: RFValue(15) }}
                            ref={phoneRef}
                            onPressFlag={() => { }}
                            value={phoneNumber}
                            initialCountry={'pk'}
                            initialValue={"92"}
                            onChangePhoneNumber={setPhoneNumber}
                        />
                        {/* <TextInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(25) }}
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={setFirstName}
                        placeholder={"First Name"} />

                    <TextInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(25) }}
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={setLastName}
                        placeholder={"Last Name"} /> */}

                        {/* <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}> */}
                        <TextInput
                            style={styles.TextInput}
                            placeholderTextColor={'#B5B5B5'}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholder={"Password"} />
                        <TextInput
                            style={styles.TextInput}
                            placeholderTextColor={'#B5B5B5'}
                            secureTextEntry={true}
                            onChangeText={setConfirmPassword}
                            placeholder={"Confirm Password"} />
                        {/* </View> */}


                        <View style={{ width: '100%', marginVertical: RFValue(5), flexDirection: 'row' }}>


                            <View style={{ width: '100%', marginVertical: RFValue(5), flexDirection: 'row' }}>


                                <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => setToggleCheckBox(!toggleCheckBox)}>
                                    <CheckBox
                                        disabled={true}
                                        value={toggleCheckBox}
                                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                        tintColors={{ true: '#000', false: "#000" }}
                                        style={styles.checkBox}
                                        boxType={'square'}
                                    />
                                    <Text style={styles.textRememberMe}>Show Password</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        {
                            loading ?
                                <ActivityIndicator size={'large'} color={'#628BEC'} />
                                :
                                <PrimaryButton label={"Submit"} onPress={onSubmit} />

                        }


                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingVertical: RFValue(20) }}>
                <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}
                    onPress={() => navigation.navigate("login")}
                >
                    <Text
                        style={styles.textRememberMe}
                    >
                        Already have an account?
                        <Text style={styles.textForgotPassword}> SIGN IN!</Text>

                    </Text>
                </TouchableOpacity>
            </View>
        </View>
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
        color: '#000'
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

export default SignUp
import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-input';
import { postCall } from '../../utils/apiCall';
import md5 from 'md5'

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

                navigation.navigate('verifyNumber', { email: email })

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
        <ImageBackground style={styles.container} source={require('../../assets/landing.png')}>
            <ScrollView>
                <View style={{ padding: RFValue(20), paddingVertical: RFValue(5), marginTop: RFValue(150) }}>
                    <Text style={{ fontSize: RFValue(34), color: '#FFF', fontWeight: 'bold', fontFamily: 'times new roman' }}>Lightup.ai</Text>
                    <Text style={{ fontSize: RFValue(10), color: '#A16B5D', marginHorizontal: RFValue(20) }}>Unlock your creative potential</Text>
                    <Text style={{ color: '#A16B5D', fontSize: RFValue(12), marginVertical: RFValue(25), textAlign: 'center' }}>Write amazing essays, stories, letters,
                        applications, emails, speeches, articles, blogposts
                        and many more in different languages, academic levels
                        and tones within seconds!</Text>
                </View>

                <View style={{ padding: RFValue(5) }}>
                    <Text>Enter your details to sign up</Text>
                    <TextInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(25) }}
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={setEmail}
                        keyboardType={'email-address'}
                        placeholder={"Email"} />
                    <PhoneInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(25), height: RFValue(40) }}
                        ref={phoneRef}
                        onPressFlag={() => { }}
                        value={phoneNumber}
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

                    <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <TextInput
                            style={{ backgroundColor: '#79839B', color: '#FFF', margin: RFValue(5), flex: 1, marginLeft: RFValue(0), borderRadius: RFValue(50), paddingHorizontal: RFValue(10) }}
                            placeholderTextColor={'#B5B5B5'}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholder={"Password"} />
                        <TextInput
                            style={{ backgroundColor: '#79839B', color: '#FFF', margin: RFValue(5), flex: 1, marginRight: RFValue(0), borderRadius: RFValue(50), paddingHorizontal: RFValue(10) }}
                            placeholderTextColor={'#B5B5B5'}
                            secureTextEntry={true}
                            onChangeText={setConfirmPassword}
                            placeholder={"Confirm Password"} />
                    </View>


                    <View style={{ width: '100%', marginVertical: RFValue(5), flexDirection: 'row' }}>


                        <View style={{ width: '100%', marginVertical: RFValue(5), flexDirection: 'row' }}>


                            <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => setToggleCheckBox(!toggleCheckBox)}>
                                <CheckBox
                                    disabled={true}
                                    value={toggleCheckBox}
                                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                    // tintColors={{ true: '#D97D54', false: "#FFF" }}
                                    style={{ marginHorizontal: Platform.OS == 'ios' ? RFValue(10) : RFValue(20), height: RFValue(15), width: RFValue(15) }}
                                    boxType={'square'}
                                />
                                <Text>Show Password</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {
                        loading ?
                            <ActivityIndicator size={'large'} color={'#628BEC'} />
                            :
                            <TouchableOpacity style={{ width: '50%', height: RFValue(40), justifyContent: 'center', alignItems: 'center', backgroundColor: '#628BEC', marginVertical: RFValue(20), borderRadius: RFValue(5), alignSelf: 'center' }}
                                // onPress={() => navigation.navigate('verifyNumber')}
                                onPress={onSubmit}
                            >
                                <Text
                                    style={{ color: '#FFF', fontSize: RFValue(14) }}
                                >
                                    Submit
                                </Text>
                            </TouchableOpacity>
                    }

                    <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: RFValue(0), borderRadius: RFValue(5) }}
                        onPress={() => navigation.navigate("login")}
                    >
                        <Text
                            style={{ color: '#FFF', fontSize: RFValue(14) }}
                        >
                            Already have an account?
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-end',

    },
    body: {
        // height: RFValue(400),
        // backgroundColor: "#563",
        width: '100%'
    },
    textLabel: {
        fontSize: RFValue(12),
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: RFValue(5)
    }

})

export default SignUp
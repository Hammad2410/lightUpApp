import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { postCall } from '../../utils/apiCall';
import md5 from 'md5'

function SignUp({ navigation }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)



    const onSubmit = () => {

        if (password == confirmPassword) {
            setLoading(true)
            const params = {
                email: email,
                password: md5(password),
                first_name: firstName,
                last_name: lastName
            }

            const cbSuccess = (data) => {
                setLoading(false)
                console.log('Response: ', data)

                navigation.navigate('login')
            }

            const cbFailure = (error) => {
                setLoading(false)
                alert(error)
            }

            postCall('/auth/signUp', params, cbSuccess, cbFailure)
        }
        else {
            alert("Password does not match")
        }
    }


    return (
        <ImageBackground style={styles.container} source={require('../../assets/landing.png')}>
            <ScrollView>
                <View style={{ padding: RFValue(20), paddingVertical: RFValue(5), marginTop: RFValue(150) }}>
                    <Text style={{ fontSize: RFValue(34), color: '#FFF', fontWeight: 'bold', fontFamily: 'times new roman' }}>Lightup.ai</Text>
                    <Text style={{ color: '#848484', fontSize: RFValue(10), marginVertical: RFValue(25), }}>Write amazing essays, stories, letters,
                        applications, emails, speeches, articles, blogposts
                        and many more in different languages, academic levels
                        and tones within seconds!</Text>
                </View>

                <View style={{ padding: RFValue(5) }}>
                    <Text>Enter 6 verification code sent to your number</Text>
                    <View style={{ alignSelf: 'center', marginBottom: RFValue(75), marginTop: RFValue(25) }}>
                        <SmoothPinCodeInput
                            cellStyle={{
                                borderBottomWidth: 2,
                                borderColor: '#79839B',
                            }}
                            cellStyleFocused={{
                                borderColor: '#79839B',
                            }}
                            // value={code}
                            codeLength={6}
                            // onTextChange={code => setCode(code)}
                            keyboardShouldPersistTaps={'always'}
                        />
                    </View>




                    {
                        loading ?
                            <ActivityIndicator size={'large'} color={'#628BEC'} />
                            :
                            <TouchableOpacity style={{ width: '50%', height: RFValue(40), justifyContent: 'center', alignItems: 'center', backgroundColor: '#628BEC', marginVertical: RFValue(20), borderRadius: RFValue(5), alignSelf: 'center' }}
                                onPress={() => navigation.navigate('login')}
                            >
                                <Text
                                    style={{ color: '#FFF', fontSize: RFValue(14) }}
                                >
                                    Submit
                                </Text>
                            </TouchableOpacity>
                    }

                    {/* <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginVertical: RFValue(0), borderRadius: RFValue(5) }}
                        onPress={() => navigation.navigate("login")}
                    >
                        <Text
                            style={{ color: '#FFF', fontSize: RFValue(14) }}
                        >
                            Already have an account?
                        </Text>
                    </TouchableOpacity> */}
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
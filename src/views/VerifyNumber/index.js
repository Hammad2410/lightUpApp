import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { postCall } from '../../utils/apiCall';
import md5 from 'md5'
import PrimaryButton from '../../components/primaryButton';

function SignUp({ navigation, route }) {


    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState('');



    const onSubmit = () => {


        setLoading(true)
        const params = {
            otp: code,
            email: route.params.email,
            // password: md5(password),
            // first_name: firstName,
            // last_name: lastName
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

        postCall('/auth/verifyNumber', params, cbSuccess, cbFailure)

    }


    return (
        <View style={styles.container} >
            <ScrollView>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                </View>

                <View style={{ padding: RFValue(5) }}>
                    <Text style={styles.heading}>6 Digit Code</Text>
                    <Text style={styles.subheading}>Please enter the code send to</Text>
                    <Text style={styles.subheading}>{route.params.phone}</Text>
                    <View style={{ alignSelf: 'center', marginBottom: RFValue(75), marginTop: RFValue(25) }}>
                        <SmoothPinCodeInput
                            cellStyle={{

                                borderColor: '#F6F3F0',
                                backgroundColor: '#F6F3F0',
                                borderRadius: RFValue(5)
                            }}
                            cellStyleFocused={{
                                borderColor: '#D7CABD',
                                backgroundColor: '#D7CABD',
                                borderRadius: RFValue(5)
                            }}
                            value={code}
                            codeLength={6}
                            onTextChange={code => setCode(code)}
                            keyboardShouldPersistTaps={'always'}
                        />
                    </View>




                    {
                        loading ?
                            <ActivityIndicator size={'large'} color={'#628BEC'} />
                            :
                            <PrimaryButton onPress={onSubmit} label={'Submit'} />
                    }
                </View>
            </ScrollView>
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
    logo: {
        width: RFValue(80),
        height: RFValue(80),
        resizeMode: 'contain'
    },
    heading: {
        fontSize: RFValue(27),
        color: "#000",
        textAlign: 'center'
    },
    subheading: {
        fontSize: RFValue(12),
        color: "#000",
        textAlign: 'center',
        marginVertical: RFValue(5)
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
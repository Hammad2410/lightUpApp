import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { postCall } from '../../utils/apiCall';
import md5 from 'md5'

function ChangePassword({ navigation, route }) {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = () => {

        if (password == confirmPassword) {
            setLoading(true)
            const params = {
                email: route.params.email,
                password: md5(password),
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

            postCall('/auth/resetPassword', params, cbSuccess, cbFailure)
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
                    <Text>Enter New Password</Text>


                    <TextInput
                        style={{ backgroundColor: '#79839B', color: '#FFF', margin: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(10) }}
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholder={"Password"} />
                    <TextInput
                        style={{ backgroundColor: '#79839B', color: '#FFF', margin: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(10) }}
                        placeholderTextColor={'#B5B5B5'}
                        secureTextEntry={true}
                        onChangeText={setConfirmPassword}
                        placeholder={"Confirm Password"} />

                    {
                        loading ?
                            <ActivityIndicator size={'large'} color={'#628BEC'} />
                            :
                            <TouchableOpacity style={{ width: '50%', height: RFValue(40), justifyContent: 'center', alignItems: 'center', backgroundColor: '#628BEC', marginVertical: RFValue(20), borderRadius: RFValue(5), alignSelf: 'center' }}
                                onPress={() => onSubmit()}
                            // onPress={() => navigation.navigate('login')}
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

export default ChangePassword
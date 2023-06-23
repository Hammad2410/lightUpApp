import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { postCall } from '../../utils/apiCall';
import PrimaryButton from '../../components/primaryButton';
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
        <View style={styles.container} >
            <ScrollView>
                {/* <View style={{ padding: RFValue(20), paddingVertical: RFValue(5), marginTop: RFValue(150) }}>
                    <Text style={{ fontSize: RFValue(34), color: '#FFF', fontWeight: 'bold', fontFamily: 'times new roman' }}>Lightup.ai</Text>
                    <Text style={{ color: '#848484', fontSize: RFValue(10), marginVertical: RFValue(25), }}>Write amazing essays, stories, letters,
                        applications, emails, speeches, articles, blogposts
                        and many more in different languages, academic levels
                        and tones within seconds!</Text>
                </View> */}

                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                </View>

                <View style={{ padding: RFValue(5), marginTop: RFValue(50) }}>
                    <Text style={styles.label}>Enter New Password</Text>


                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholder={"Password"} />
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={'#B5B5B5'}
                        secureTextEntry={true}
                        onChangeText={setConfirmPassword}
                        placeholder={"Confirm Password"} />

                    {
                        loading ?
                            <ActivityIndicator size={'large'} color={'#628BEC'} />
                            :
                            <PrimaryButton
                                onPress={onSubmit}
                                label={'Submit'}
                            />

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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
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
    },
    textInput: {
        width: '100%',
        backgroundColor: '#F6f6f6',
        color: '#000',
        marginVertical: RFValue(5),
        borderRadius: RFValue(10),
        paddingHorizontal: RFValue(25),
        height: RFValue(40),
        fontSize: RFValue(15)
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
    label: {
        color: '#000',
        fontSize: RFValue(20),
        marginVertical: RFValue(5)
    },

})

export default ChangePassword
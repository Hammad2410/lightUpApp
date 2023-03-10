import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, Platform, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';
import { postCall } from '../../utils/apiCall';
import md5 from 'md5';
import { ScrollView } from 'react-native-gesture-handler';
import { loggedIn } from '../../Redux/Actions/activity'

function Login({ navigation }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

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
            dispatch(loggedIn(data.token))

            navigation.navigate("home")


        }

        const cbFailure = (error) => {
            setLoading(false)
            alert(error)
        }

        postCall('/auth/login', params, cbSuccess, cbFailure)

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


                <View style={{ padding: RFValue(5), marginTop: RFValue(50) }}>
                    <TextInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(25) }}
                        placeholderTextColor={'#B5B5B5'}
                        keyboardType={'email-address'}
                        placeholder={"Email"}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(25) }}
                        placeholderTextColor={'#B5B5B5'}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        placeholder={"Password"} />

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
                            <Text>Remember me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('forgotPassword')}>
                            <Text>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        loading ?
                            <ActivityIndicator size={'large'} color={'#628BEC'} />
                            : <TouchableOpacity style={{ width: '50%', height: RFValue(40), justifyContent: 'center', alignItems: 'center', backgroundColor: '#628BEC', marginVertical: RFValue(20), borderRadius: RFValue(5), alignSelf: 'center' }}
                                // onPress={() => navigation.navigate("home")}
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
                        onPress={() => navigation.navigate("signUp")}
                    >
                        <Text
                            style={{ color: '#FFF', fontSize: RFValue(14) }}
                        >
                            Sign Up
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
    }

})

export default Login
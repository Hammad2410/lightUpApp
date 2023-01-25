import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckBox from '@react-native-community/checkbox';

function Login({ navigation }) {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <ImageBackground style={styles.container} source={require('../../assets/landing.png')}>
            <View style={{ padding: RFValue(10), paddingVertical: RFValue(15), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: RFValue(175) }}>
                <Text style={{ fontSize: RFValue(34), color: '#FFF', fontWeight: 'bold' }}>LightUp!</Text>
                <Text style={{ width: RFValue(150), fontSize: RFValue(10), color: '#000' }}>Assist Teachers and Students
                    in creating educational
                    contents by AI!</Text>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5) }} onPress={() => navigation.navigate('essay')}>
                {/* <Image source={require('../../assets/icn_story.png')} style={{ width: RFValue(33), height: RFValue(33) }} /> */}
                <View style={{ justifyContent: 'center', padding: RFValue(5), textAlign: 'center', alignItems: 'center', flex: 1 }}>
                    <Text style={{
                        fontSize: RFValue(20),
                        fontWeight: 'bold',
                        color: '#FFF',
                        textAlign: 'center',
                        marginBottom: RFValue(5),
                        width: '75%'
                    }}>Welcome to your
                        personal AIde!</Text>
                </View>
            </TouchableOpacity>
            <View style={{ padding: RFValue(5) }}>
                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#FFF'}
                    placeholder={"Email"} />
                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#FFF'}
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

                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ width: '100%', height: RFValue(40), justifyContent: 'center', alignItems: 'center', backgroundColor: '#628BEC', marginVertical: RFValue(20), borderRadius: RFValue(5) }}
                    onPress={() => navigation.navigate("home")}
                >
                    <Text
                        style={{ color: '#FFF', fontSize: RFValue(14) }}
                    >
                        Submit
                    </Text>
                </TouchableOpacity>

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

export default Login
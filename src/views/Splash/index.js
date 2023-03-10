import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';

function Splash({ navigation }) {

    return (
        <ImageBackground style={styles.container} source={require('../../assets/landing.png')}>
            <View style={styles.body}>
                <View style={{ padding: RFValue(10), paddingVertical: RFValue(5), marginTop: RFValue(150) }}>
                    <Text style={{ fontSize: RFValue(34), color: '#FFF', fontWeight: 'bold', textAlign: 'center', fontFamily: 'times new roman' }}>Lightup.ai</Text>
                    <Text style={{ color: '#848484', fontSize: RFValue(10), marginVertical: RFValue(50), textAlign: 'center' }}>Write amazing essays, stories, letters,
                        applications, emails, speeches, articles, blogposts
                        and many more in different languages, academic levels
                        and tones within seconds!</Text>
                </View>


            </View >
            <TouchableOpacity style={{ marginBottom: RFValue(50) }} onPress={() => navigation.navigate('login')}>
                <Text style={{ fontSize: RFValue(15), color: '#A16B5D' }}>
                    Get Started! {">"}
                </Text>
            </TouchableOpacity>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        // height: RFValue(400),
        // backgroundColor: "#563",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textLabel: {
        fontSize: RFValue(12),
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: RFValue(5)
    }

})

export default Splash;
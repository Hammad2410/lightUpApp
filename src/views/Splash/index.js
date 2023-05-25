import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import TypeWriter from 'react-native-typewriter'

function Splash({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('login')
        }, 3000);
    }, [])

    return (
        <View style={styles.container} >
            <View style={styles.body}>

                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                <ActivityIndicator size={'large'} color={'#FFF'} style={styles.loader} />


            </View >

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5B5A62'
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
    },
    loader: {
        marginVertical: RFValue(20)
    },
    logo: {
        width: RFValue(120),
        height: RFValue(80),
        resizeMode: 'contain',
        tintColor: '#FFF'
    }

})

export default Splash;
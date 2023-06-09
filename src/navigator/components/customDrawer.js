import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StatusBar, Text, Image, StyleSheet, Touchable, Share, Platform, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';




function CustomDrawer(props) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
            </View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Main')}>
                    <Image source={require('../../assets/icn_home.png')} style={styles.icon} />
                    <Text style={styles.btnText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Profile')}>
                    <Image source={require('../../assets/icn_profile.png')} style={styles.icon} />
                    <Text style={styles.btnText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Image source={require('../../assets/icn_learn.png')} style={styles.icon} />
                    <Text style={styles.btnText}>Learning</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Settings')}>
                    <Image source={require('../../assets/icn_setting.png')} style={styles.icon} />
                    <Text style={styles.btnText}>Setting</Text>
                </TouchableOpacity>



            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.button, { alignSelf: 'flex-end', }]} onPress={() => props.navigation.navigate("login")}>
                    <Image source={require('../../assets/icn_logout.png')} style={styles.icon} />
                    <Text style={styles.btnText}>Logout</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: RFValue(200),
        backgroundColor: '#5B5A62',
        paddingTop: Platform.OS == 'ios' ? RFValue(34) : StatusBar.currentHeight,
        flexDirection: 'row',
        paddingHorizontal: RFValue(10),
        alignItems: 'center',
        justifyContent: "center",
        paddingBottom: RFValue(10)
    },
    body: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        marginTop: RFValue(25),
        paddingHorizontal: RFValue(20)
    },
    footer: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: RFValue(20),
        flex: 1
    },
    card: {
        backgroundColor: '#FFF',
        width: '75%',
        padding: RFValue(15),
        borderRadius: RFValue(5),
        elevation: 12
    },
    label: {
        fontSize: RFValue(15),
        fontFamily: Platform.OS == 'ios' ? 'Europa Bold' : 'europa-bold',
        color: '#334856',
        flex: 1
    },
    item: {
        padding: RFValue(5)
    },
    logoutButton: {
        padding: RFValue(10),
        borderRadius: RFValue(25),
        borderColor: '#334856',
        borderWidth: 0.5,
        marginVertical: RFValue(50),
        paddingHorizontal: RFValue(25)
    },
    btnText: {
        marginLeft: RFValue(20),
        fontSize: RFValue(15),
        color: '#000'
    },
    button: {
        width: "100%",
        flexDirection: 'row',
        marginVertical: RFValue(10)
        // flex: 1,
    },
    logo: {
        width: RFValue(100),
        height: RFValue(50),
        resizeMode: 'contain',
        tintColor: "#FFF"
    },
    icon: {
        width: RFValue(20),
        height: RFValue(20),
        resizeMode: 'contain',
    }
})


export default CustomDrawer
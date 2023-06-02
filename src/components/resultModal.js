import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, Alert, ActivityIndicator, Modal, Dimensions, Share } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './header';
import ScreenHeading from './screenHeading';

function resultModal({ showModal, setShowModal, result, topic }) {
    return (<Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
    // transparent
    >
        <View style={{ flex: 1, backgroundColor: '#FFF', padding: RFValue(25), alignItems: 'center' }}>

            <View style={{ width: '100%', marginTop: RFValue(20) }}>
                <ScreenHeading
                    heading={topic}
                    subheading={'                                                                           '}
                    logo={require('../assets/icn_script.png')}
                />
            </View>

            <View style={{
                marginTop: RFValue(20),
                backgroundColor: '#F6F6F6',
                // justifyContent: 'center',
                // alignItems: 'center',
                marginHorizontal: RFValue(10),
                borderRadius: RFValue(10),
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
                // padding: RFValue(5),
                height: Dimensions.get("window").height - RFValue(200),
                width: '100%'
            }}>


                <ScrollView style={{ padding: RFValue(5) }}
                >
                    <Text style={{ color: '#000', fontSize: RFValue(18), fontWeight: 'bold', alignSelf: 'center' }}>{topic}</Text>

                    <Text style={{ color: '#000' }}>{result}</Text>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: RFValue(0), width: '100%', padding: RFValue(10), justifyContent: 'space-around', flexDirection: 'row', backgroundColor: '#5B5A62', borderBottomLeftRadius: RFValue(10), borderBottomRightRadius: RFValue(10) }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                        Clipboard.setString(result);

                        // alert("Result Copied")


                    }}>
                        <Icon name="copy" size={18} color="#FFF" />
                        <Text style={{ color: '#FFF', marginLeft: RFValue(5) }}>Copy</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowModal(false)}>
                        <Icon name="save" size={18} color="#FFF" />
                        <Text style={{ color: '#FFF', marginLeft: RFValue(5) }}>Save</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{ flexDirection: 'row' }}
                        onPress={

                            async () => {
                                //  props.navigation.navigate('InviteFriends')
                                let response = await Share.share({
                                    message: result
                                })
                                // setShowModal(false)
                            }

                        }>
                        <Icon name="share" size={18} color="#FFF" />
                        <Text style={{ color: '#FFF', marginLeft: RFValue(5) }}>share</Text>
                    </TouchableOpacity>
                </View >
            </View>



            <TouchableOpacity style={{ position: 'absolute', top: RFValue(20), left: RFValue(10), flexDirection: 'row' }} onPress={() => setShowModal(false)}>
                <Icon name="close" size={18} color="#000" />
                <Text style={{ color: '#FFF', marginLeft: RFValue(5) }}>close</Text>
            </TouchableOpacity>





        </View>

    </Modal>)
}


export default resultModal

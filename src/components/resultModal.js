import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, Alert, ActivityIndicator, Modal, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';

function resultModal({ showModal, setShowModal, result, topic }) {
    return (<Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
    // transparent
    >
        <View style={{ flex: 1, backgroundColor: '#fff', padding: RFValue(25), alignItems: 'center' }}>


            <View style={{
                marginTop: RFValue(20),
                backgroundColor: '#FFF',
                // justifyContent: 'center',
                // alignItems: 'center',
                marginHorizontal: RFValue(10),
                borderRadius: RFValue(5),
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
                padding: RFValue(5),
                height: Dimensions.get("window").height - RFValue(150)
            }}>
                <ScrollView
                >
                    <Text style={{ color: '#000', fontSize: RFValue(18), fontWeight: 'bold', alignSelf: 'center' }}>{topic}</Text>

                    <Text style={{ color: '#000' }}>{result}</Text>
                </ScrollView>
            </View>



            <TouchableOpacity style={{ position: 'absolute', top: RFValue(10), left: RFValue(10), flexDirection: 'row' }} onPress={() => setShowModal(false)}>
                <Icon name="close" size={18} color="#000" />
                <Text style={{ color: '#000', marginLeft: RFValue(5) }}>close</Text>
            </TouchableOpacity>

            <View style={{ position: 'absolute', bottom: RFValue(10), width: '100%', padding: RFValue(10), justifyContent: 'space-around', flexDirection: 'row' }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowModal(false)}>
                    <Icon name="copy" size={18} color="#000" />
                    <Text style={{ color: '#000', marginLeft: RFValue(5) }}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowModal(false)}>
                    <Icon name="save" size={18} color="#000" />
                    <Text style={{ color: '#000', marginLeft: RFValue(5) }}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowModal(false)}>
                    <Icon name="share" size={18} color="#000" />
                    <Text style={{ color: '#000', marginLeft: RFValue(5) }}>share</Text>
                </TouchableOpacity>
            </View >



        </View>

    </Modal>)
}


export default resultModal

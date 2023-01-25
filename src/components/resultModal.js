import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, Alert, ActivityIndicator, Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


function resultModal({ showModal, setShowModal, result }) {
    return (<Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
    // transparent
    >
        <View style={{ flex: 1, backgroundColor: '#fff', padding: RFValue(25) }}>
            <Text style={{ color: '#000' }}>{result}</Text>

            <TouchableOpacity style={{ position: 'absolute', top: RFValue(10), left: RFValue(10) }} onPress={() => setShowModal(false)}>
                <Text style={{ color: '#000' }}>close</Text>
            </TouchableOpacity>
        </View>

    </Modal>)
}


export default resultModal

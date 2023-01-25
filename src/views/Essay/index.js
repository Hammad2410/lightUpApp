import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, Alert, ActivityIndicator, Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { postCall } from '../../utils/apiCall';
import ResultModal from '../../components/resultModal';

function Essay({ navigation }) {

    const [topic, setTopic] = useState('')
    const [words, setWords] = useState(50)

    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const [result, setResult] = useState('');

    const onSubmit = () => {
        setLoading(true)

        const params = {
            topic: topic,
            words: words
        }

        const cbSuccess = (data) => {
            setLoading(false)
            setResult(data.result)
            setShowModal(true)
        }

        const cbFailure = (error) => {
            setLoading(false)
            alert(error)
        }

        if (+words < 1000) {
            postCall('/chat/createEssay', params, cbSuccess, cbFailure)
        }
        else {
            alert("Number of words should be less then 1000")
        }

    }

    return (
        <ImageBackground style={styles.container} source={require('../../assets/landing.png')}>
            <View style={{ padding: RFValue(10), paddingVertical: RFValue(15), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: RFValue(75) }}>
                <Text style={{ fontSize: RFValue(34), color: '#FFF', fontWeight: 'bold' }}>LightUp!</Text>
                <Text style={{ width: RFValue(150), fontSize: RFValue(10), color: '#000' }}>Assist Teachers and Students
                    in creating educational
                    contents by AI!</Text>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5) }} onPress={() => navigation.navigate('essay')}>
                <Image source={require('../../assets/icn_note.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                <View style={{ justifyContent: 'center', padding: RFValue(5) }}>
                    <Text style={{
                        fontSize: RFValue(20),
                        fontWeight: 'bold',
                        color: '#FFF',
                        marginBottom: RFValue(5)
                    }}>Essay writing</Text>
                </View>
            </TouchableOpacity>
            <View style={{ padding: RFValue(5) }}>
                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#FFF'}
                    onChangeText={(text) => setTopic(text)}
                    placeholder={"Enter Topic"} />
                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#FFF'}
                    placeholder={"Academic Level"} />

                <View style={{ width: '100%', marginVertical: RFValue(5), flexDirection: 'row' }}>
                    <TouchableOpacity style={{ backgroundColor: '#79839B', justifyContent: 'center', alignItems: 'center', width: RFValue(40) }} onPress={() => setWords(words - 1)}>
                        <Text>-</Text>
                    </TouchableOpacity>
                    <TextInput
                        // style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                        style={{ flex: 1, backgroundColor: '#79839B', color: '#FFF', marginHorizontal: RFValue(10), textAlign: 'center', height: RFValue(40), textAlignVertical: 'center' }}
                        placeholderTextColor={'#FFF'}
                        keyboardType={'numeric'}
                        value={words.toString()}
                        onChangeText={(text) => setWords(text)}
                        placeholder={"Number of words"} />

                    <TouchableOpacity style={{ backgroundColor: '#79839B', justifyContent: 'center', alignItems: 'center', width: RFValue(40) }} onPress={() => setWords(+words + 1)}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>


                {
                    loading ?
                        <ActivityIndicator size={'large'} color={'#628BEC'} />
                        :
                        <TouchableOpacity style={{ width: '100%', height: RFValue(40), justifyContent: 'center', alignItems: 'center', backgroundColor: '#628BEC', marginVertical: RFValue(20), borderRadius: RFValue(5) }}
                            onPress={onSubmit}
                        >
                            <Text
                                style={{ color: '#FFF', fontSize: RFValue(14) }}
                            >
                                Submit
                            </Text>
                        </TouchableOpacity>}
            </View>

            <ResultModal showModal={showModal} setShowModal={setShowModal} result={result} />

            {/* <Modal
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

            </Modal> */}

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

export default Essay
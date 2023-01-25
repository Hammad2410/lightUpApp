import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator } from 'react-native';
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
            postCall('/chat/createTest', params, cbSuccess, cbFailure)
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
                <Image source={require('../../assets/icn_task.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                <View style={{ justifyContent: 'center', padding: RFValue(5) }}>
                    <Text style={{
                        fontSize: RFValue(20),
                        fontWeight: 'bold',
                        color: '#FFF',
                        marginBottom: RFValue(5)
                    }}>Create Test</Text>
                </View>
            </TouchableOpacity>
            <View style={{ padding: RFValue(5) }}>

                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#FFF'}
                    onChangeText={(text) => setTopic(text)}
                    placeholder={"Enter Topic"} />

                <Text
                    style={{ color: '#FFF', fontSize: RFValue(14), width: '100%', marginVertical: RFValue(5), textAlign: 'center' }}
                >
                    OR
                </Text>

                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5), backgroundColor: '#79839B', marginVertical: RFValue(5) }}>
                    <Image source={require('../../assets/file.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                    <View style={{ justifyContent: 'center', padding: RFValue(5), flex: 1 }}>
                        <Text style={{
                            fontSize: RFValue(14),
                            fontWeight: 'bold',
                            color: '#FFF',
                            marginBottom: RFValue(5)
                        }}>Upload file</Text>
                        <Text style={{ fontSize: RFValue(10), color: '#C5C5C5' }}>Max size 1 MB (.txt or .doc)</Text>
                    </View>

                    <TouchableOpacity style={{ backgroundColor: '#79839B', justifyContent: 'center', alignItems: 'center', width: RFValue(40), height: (40), elevation: RFValue(10) }}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                {/* <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#FFF'}
                    placeholder={"Enter Topic"} />
                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#FFF'}
                    placeholder={"Academic Level"} /> */}

                <View style={{ width: '100%', marginVertical: RFValue(5), flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginRight: RFValue(5) }}>
                        <Text style={{ fontSize: RFValue(8), color: '#FFF' }}>MCQs</Text>
                        <TextInput
                            style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                            placeholderTextColor={'#FFF'}
                            onChangeText={(text) => setWords(text)}
                            keyboardType={'numeric'}
                            placeholder={"Enter Number"} />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: RFValue(5) }}>
                        <Text style={{ fontSize: RFValue(8), color: '#FFF' }}>Short Questions</Text>
                        <TextInput
                            style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                            placeholderTextColor={'#FFF'}
                            placeholder={"Enter Number"} />
                    </View>
                    <View style={{ flex: 1, marginLeft: RFValue(5) }}>
                        <Text style={{ fontSize: RFValue(8), color: '#FFF' }}>Long Questions</Text>
                        <TextInput
                            style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                            placeholderTextColor={'#FFF'}
                            placeholder={"Enter Number"} />
                    </View>
                </View>


                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#FFF'}
                    placeholder={"Academic Level"} />
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
                        </TouchableOpacity>
                }


            </View>
            <ResultModal showModal={showModal} setShowModal={setShowModal} result={result} />
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
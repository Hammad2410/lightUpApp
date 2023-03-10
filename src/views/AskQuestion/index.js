import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator, Modal, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { postCall } from '../../utils/apiCall';
import CheckBox from '@react-native-community/checkbox';
import ResultModal from '../../components/resultModal';

function Question({ navigation }) {

    const [question, setQuestion] = useState('');
    const [words, setWords] = useState(50);
    const [option, setOption] = useState('');
    const [level, setLevel] = useState('');

    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const [showLevelModal, setShowLevelModal] = useState(false)

    const [result, setResult] = useState('');

    const onSubmit = () => {
        setLoading(true)

        const params = {
            question: question,
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
            postCall('/chat/answerQuestion', params, cbSuccess, cbFailure)
        }
        else {
            alert("Number of words should be less then 1000")
        }

    }

    return (
        <ImageBackground style={styles.container} source={require('../../assets/landing.png')}>
            <View style={{ padding: RFValue(10), paddingVertical: RFValue(15), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: RFValue(75) }}>
                <Text style={{ fontSize: RFValue(34), color: '#FFF', fontWeight: 'bold', fontFamily: 'times new roman' }}>LightUp!</Text>
                <Text style={{ width: RFValue(150), fontSize: RFValue(10), color: '#000' }}>Assist Teachers and Students
                    in creating educational
                    contents by AI!</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5) }} >
                <Image source={require('../../assets/icn_note.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                <View style={{ justifyContent: 'center', padding: RFValue(5) }}>
                    <Text style={{
                        fontSize: RFValue(20),
                        fontWeight: 'bold',
                        color: '#FFF',
                        marginBottom: RFValue(5)
                    }}>Ask Question</Text>
                </View>
            </View>
            <View style={{ padding: RFValue(5) }}>

                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5), backgroundColor: '#79839B' }}>
                    <Image source={require('../../assets/file.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                    <TouchableOpacity style={{ justifyContent: 'center', padding: RFValue(5), flex: 1 }}
                    // onPress={onSelect}
                    >
                        <Text style={{
                            fontSize: RFValue(14),
                            fontWeight: 'bold',
                            color: '#FFF',
                            marginBottom: RFValue(5)
                        }}>Upload file</Text>
                        <Text style={{ fontSize: RFValue(10), color: '#C5C5C5' }}>Max size 1 MB (.txt or .doc)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#79839B', justifyContent: 'center', alignItems: 'center', width: RFValue(40), height: (40), elevation: RFValue(10) }}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), height: RFValue(150), textAlignVertical: 'top' }}
                    placeholderTextColor={'#B5B5B5'}
                    onChangeText={(text) => setQuestion(text)}
                    placeholder={"Enter Question"} />

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

            <ResultModal showModal={showModal} setShowModal={setShowModal} result={result} topic={question} />

            <Modal
                visible={showLevelModal}
                onRequestClose={() => setShowLevelModal(false)}
                transparent
            >
                <View disabled style={styles.modal} onPress={() => setShowLevelModal(false)}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.heading}>Select Level</Text>
                        {/* <TextInput style={[styles.item, { width: '100%', height: RFValue(45), fontSize: RFValue(14) }]} placeholder={'Search'} /> */}
                        <FlatList
                            keyboardShouldPersistTaps={'always'}
                            style={styles.modalList}
                            keyExtractor={(item, index) => index.toString()}
                            data={["Masters", "Graduate", "Grade 11 & 12", "Grade 9 & 10", "Grade 8", "Grade 7", "Grade 6", "Grade 5", "Grade 4", "Grade 3", "Grade 2", "Grade 1"]}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={styles.modalItem} onPress={() => {
                                    setLevel(item)
                                    setShowLevelModal(false)
                                }}>
                                    <Text style={{ flex: 1 }}>{item}</Text>
                                </TouchableOpacity>)
                            }
                        />
                    </View>
                </View>

            </Modal>

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
    },
    modal: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    modalContainer: {
        height: '75%',
        backgroundColor: '#79839B',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderTopLeftRadius: RFValue(10),
        borderTopRightRadius: RFValue(10)
    },
    modalList: {
        width: '100%',
        marginTop: 10
    },
    modalItem: {
        flexDirection: 'row',
        padding: RFValue(10),
        borderColor: "#000",
        borderBottomWidth: 0.5,
        marginVertical: 5
    },

})

export default Question
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator, Modal, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { postCall } from '../../utils/apiCall';
import CheckBox from '@react-native-community/checkbox';
import ResultModal from '../../components/resultModal';

function Essay({ navigation }) {

    const [topic, setTopic] = useState('');
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
            topic: topic,
            words: words,
            option: option,
            level: level

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
            postCall('/chat/createQuery', params, cbSuccess, cbFailure)
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

                <View style={{ width: '100%', marginVertical: RFValue(5), flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
                        <CheckBox
                            disabled={false}
                            value={option == 'Essay'}
                            onValueChange={(newValue) => setOption('Essay')}
                        />
                        <Text style={{ color: '#FFF' }}>
                            Essay
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
                        <CheckBox
                            disabled={false}
                            value={option == 'Story'}
                            onValueChange={(newValue) => setOption('Story')}
                        />
                        <Text style={{ color: '#FFF' }}>
                            Story
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
                        <CheckBox
                            disabled={false}
                            value={option == 'Letter'}
                            onValueChange={(newValue) => setOption('Letter')}
                        />
                        <Text style={{ color: '#FFF' }}>
                            Letter
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
                        <CheckBox
                            disabled={false}
                            value={option == 'Application'}
                            onValueChange={(newValue) => setOption('Application')}
                        />
                        <Text style={{ color: '#FFF' }}>
                            Application
                        </Text>
                    </View>
                </View>
                <View style={{ width: '100%', marginVertical: RFValue(5), flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
                        <CheckBox
                            disabled={false}
                            value={option == 'Email'}
                            onValueChange={(newValue) => setOption('Email')}
                        />
                        <Text style={{ color: '#FFF' }}>
                            Email
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
                        <CheckBox
                            disabled={false}
                            value={option == 'Blog'}
                            onValueChange={(newValue) => setOption('Blog')}
                        />
                        <Text style={{ color: '#FFF' }}>
                            Blog
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
                        <CheckBox
                            disabled={false}
                            value={option == 'Article'}
                            onValueChange={(newValue) => setOption('Article')}
                        />
                        <Text style={{ color: '#FFF' }}>
                            Article
                        </Text>
                    </View>

                </View>

                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#FFF'}
                    onChangeText={(text) => setTopic(text)}
                    placeholder={"Enter Topic"} />
                <TouchableOpacity onPress={() => setShowLevelModal(true)}>
                    <TextInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                        placeholderTextColor={'#FFF'}
                        editable={false}
                        value={level}
                        placeholder={"Academic Level"} />
                </TouchableOpacity>
                {/* <View style={{ width: '100%', marginVertical: RFValue(5), flexDirection: 'row' }}> */}
                {/* <TouchableOpacity style={{ backgroundColor: '#79839B', justifyContent: 'center', alignItems: 'center', width: RFValue(40) }} onPress={() => setWords(words - 1)}>
                        <Text>-</Text>
                    </TouchableOpacity> */}
                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    // style={{ flex: 1, backgroundColor: '#79839B', color: '#FFF', marginHorizontal: RFValue(10), textAlign: 'center', height: RFValue(40), textAlignVertical: 'center' }}
                    placeholderTextColor={'#FFF'}
                    keyboardType={'numeric'}
                    value={words.toString()}
                    onChangeText={(text) => setWords(text)}
                    placeholder={"Number of words"} />

                {/* <TouchableOpacity style={{ backgroundColor: '#79839B', justifyContent: 'center', alignItems: 'center', width: RFValue(40) }} onPress={() => setWords(+words + 1)}>
                        <Text>+</Text>
                    </TouchableOpacity> */}
                {/* </View> */}


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

            <ResultModal showModal={showModal} setShowModal={setShowModal} result={result} topic={topic} />

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

export default Essay
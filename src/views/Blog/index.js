import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator, Modal, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { postCall } from '../../utils/apiCall';
import ResultModal from '../../components/resultModal';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

function Essay({ navigation }) {

    const [topic, setTopic] = useState('')
    const [words, setWords] = useState(50)
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
            option: 'Blog',
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
            <ScrollView>
                <TouchableOpacity style={{ position: 'absolute', top: RFValue(10), left: RFValue(10), flexDirection: 'row' }} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={18} color="#FFF" />
                    <Text style={{ color: '#FFF', marginLeft: RFValue(5) }}>Back</Text>
                </TouchableOpacity>
                <View style={{ padding: RFValue(20), paddingVertical: RFValue(5), marginTop: RFValue(150) }}>
                    <Text style={{ fontSize: RFValue(34), color: '#FFF', fontWeight: 'bold', fontFamily: 'times new roman' }}>Lightup.ai</Text>
                    <Text style={{ color: '#848484', fontSize: RFValue(10), marginVertical: RFValue(25), }}>Write amazing essays, stories, letters,
                        applications, emails, speeches, articles, blogposts
                        and many more in different languages, academic levels
                        and tones within seconds!</Text>
                </View>
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(40), padding: RFValue(5), marginVertical: RFValue(5), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: RFValue(14), flex: 0.75 }}>Write Blog</Text>
                </LinearGradient>
                <View style={{ padding: RFValue(5) }}>
                    <TextInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(25) }}
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={(text) => setTopic(text)}
                        placeholder={"Topic"} />

                    <TouchableOpacity onPress={() => setShowLevelModal(true)}>
                        <TextInput
                            style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(25) }}
                            placeholderTextColor={'#B5B5B5'}
                            editable={false}
                            value={level}
                            placeholder={"Academic Level"} />
                    </TouchableOpacity>

                    <TextInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(25) }}
                        // style={{ flex: 1, backgroundColor: '#79839B', color: '#FFF', marginHorizontal: RFValue(10), textAlign: 'center', height: RFValue(40), textAlignVertical: 'center' }}
                        placeholderTextColor={'#B5B5B5'}
                        keyboardType={'numeric'}
                        value={words.toString()}
                        onChangeText={(text) => setWords(text)}
                        placeholder={"Number of words"} />

                    {
                        loading ?
                            <ActivityIndicator size={'large'} color={'#628BEC'} />
                            :
                            <TouchableOpacity style={{ width: '50%', height: RFValue(40), justifyContent: 'center', alignItems: 'center', backgroundColor: '#628BEC', marginVertical: RFValue(20), borderRadius: RFValue(5), alignSelf: 'center' }}
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
            </ScrollView>
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
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator, Modal, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { postCall } from '../../utils/apiCall';
import CheckBox from '@react-native-community/checkbox';
import ResultModal from '../../components/resultModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

function Question({ navigation }) {

    const [question, setQuestion] = useState('');
    const [words, setWords] = useState(50);
    const [option, setOption] = useState('');
    const [language, setLanguage] = useState('');

    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const [showLanguageModal, setShowLanguageModal] = useState(false)

    const [result, setResult] = useState('');

    const onSubmit = () => {
        setLoading(true)

        const params = {
            text: question,
            language: language
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
            postCall('/chat/translate', params, cbSuccess, cbFailure)
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
                    <Text style={{ fontSize: RFValue(14), flex: 0.75 }}>Translate</Text>
                </LinearGradient>

                <View style={{ padding: RFValue(5) }}>

                    {/* <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5), backgroundColor: '#79839B' }}>
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
                </View> */}

                    <TextInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), height: RFValue(150), textAlignVertical: 'top' }}
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={(text) => setQuestion(text)}
                        placeholder={"Enter Text"} />

                    <TouchableOpacity onPress={() => setShowLanguageModal(true)}>
                        <TextInput
                            style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(25) }}
                            placeholderTextColor={'#B5B5B5'}
                            editable={false}
                            value={language}
                            placeholder={"Language"} />
                    </TouchableOpacity>



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

                <ResultModal showModal={showModal} setShowModal={setShowModal} result={result} topic={"Translation"} />

                <Modal
                    visible={showLanguageModal}
                    onRequestClose={() => setShowLanguageModal(false)}
                    transparent
                >
                    <View disabled style={styles.modal} onPress={() => setShowLanguageModal(false)}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.heading}>Select Language</Text>
                            {/* <TextInput style={[styles.item, { width: '100%', height: RFValue(45), fontSize: RFValue(14) }]} placeholder={'Search'} /> */}
                            <FlatList
                                keyboardShouldPersistTaps={'always'}
                                style={styles.modalList}
                                keyExtractor={(item, index) => index.toString()}
                                data={["English", "French", "German", "Italian", "Arabic", "Hindi", "Bengali", "Urdu"]}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity style={styles.modalItem} onPress={() => {
                                        setLanguage(item)
                                        setShowLanguageModal(false)
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

export default Question
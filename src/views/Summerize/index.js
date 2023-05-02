import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DocumentPicker from 'react-native-document-picker';
import { uploadCall, postCall } from '../../utils/apiCall';
import ResultModal from '../../components/resultModal';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

function Essay({ navigation }) {

    const [words, setWords] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [result, setResult] = useState('');
    const [text, setText] = useState('');

    const onSelect = () => {
        DocumentPicker.pickSingle({
            type: [DocumentPicker.types.doc, DocumentPicker.types.docx]
        })
            .then((response) => {
                console.log(response);
                setFile(response)
            })
            .catch((error) => {
                console.warn("Error: ", error)
            })
    }

    const onSubmit = () => {
        setLoading(true)

        const params = {
            text: text,
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

        // if (+words < 1000) {
        postCall('/chat/summerize', params, cbSuccess, cbFailure)
        // }
        // else {
        //     alert("Number of words should be less then 1000")
        // }

    }

    // const onSubmit = () => {
    //     if (file != null) {
    //         const formData = new FormData();

    //         formData.append('words', words)
    //         formData.append('file', file)

    //         const cbSuccess = (data) => {
    //             setLoading(false)
    //             setResult(data.result)
    //             setShowModal(true)
    //         }

    //         const cbFailure = (error) => {
    //             setLoading(false)
    //             alert(error)
    //         }

    //         uploadCall('/chat/summerize', formData, cbSuccess, cbFailure)

    //     }
    // }

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
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(45), padding: RFValue(5), marginVertical: RFValue(5), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: RFValue(14), flex: 0.75, fontFamily: 'Roboto-Regular' }}>Summerize</Text>
                    <Text style={{ fontSize: RFValue(8), flex: 0.75, fontFamily: 'Roboto-Regular' }}>Save hours writing your essay, just give a topic and lightup will write it for you !</Text>
                </LinearGradient>
                <View style={{ padding: RFValue(5) }}>

                    {/* <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5), backgroundColor: '#79839B' }}>
                        <Image source={require('../../assets/file.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                        <TouchableOpacity style={{ justifyContent: 'center', padding: RFValue(5), flex: 1 }}
                            onPress={onSelect}
                        >
                            <Text style={{
                                fontSize: RFValue(14),
                                fontWeight: 'bold',
                                color: '#FFF',
                                marginBottom: RFValue(5)
                            }}>Upload file</Text>
                            <Text style={{ fontSize: RFValue(10), color: '#C5C5C5' }}>{file != null ? file.name : "Max size 1 MB (.txt or .doc)"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: '#79839B', justifyContent: 'center', alignItems: 'center', width: RFValue(40), height: (40), elevation: RFValue(10) }}>
                            <Text>+</Text>
                        </TouchableOpacity>
                    </View> */}

                    <TextInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), height: RFValue(150), textAlignVertical: 'top' }}
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={(text) => setText(text)}
                        placeholder={"Enter Text"} />

                    {/* <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#B5B5B5'}
                    placeholder={"Enter Topic"} />
                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#B5B5B5'}
                    placeholder={"Academic Level"} /> */}

                    <TextInput
                        style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5), borderRadius: RFValue(50), paddingHorizontal: RFValue(25) }}
                        // style={{ flex: 1, backgroundColor: '#79839B', color: '#FFF', marginHorizontal: RFValue(10), textAlign: 'center', height: RFValue(40), textAlignVertical: 'center' }}
                        placeholderTextColor={'#B5B5B5'}
                        keyboardType={'numeric'}
                        value={words.toString()}
                        onChangeText={(text) => setWords(text)}
                        placeholder={"Number of words"} />

                    <ResultModal showModal={showModal} setShowModal={setShowModal} result={result} topic={"Summary"} />

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
    }

})

export default Essay
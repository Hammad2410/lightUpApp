import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DocumentPicker from 'react-native-document-picker';
import { uploadCall, postCall } from '../../utils/apiCall';
import ResultModal from '../../components/resultModal';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import PrimaryButton from '../../components/primaryButton';
import Header from '../../components/header';
import ScreenHeading from '../../components/screenHeading';

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
        <View style={styles.container} >
            <ScrollView>
                {/* <TouchableOpacity style={{ position: 'absolute', top: RFValue(10), left: RFValue(10), flexDirection: 'row' }} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={18} color="#FFF" />
                    <Text style={{ color: '#FFF', marginLeft: RFValue(5) }}>Back</Text>
                </TouchableOpacity> */}
                <Header />

                <ScreenHeading
                    heading='Summerize'
                    subheading='Save hours writing your essay, just give a topic and lightup will write it for you !'
                    logo={require('../../assets/icn_script.png')}
                />


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
                        style={[styles.textInput, { height: RFValue(150), textAlignVertical: 'top' }]}
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
                        style={styles.textInput}
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
                            <PrimaryButton onPress={onSubmit} label={'Submit'} />
                        // <TouchableOpacity style={{ width: '50%', height: RFValue(40), justifyContent: 'center', alignItems: 'center', backgroundColor: '#628BEC', marginVertical: RFValue(20), borderRadius: RFValue(5), alignSelf: 'center' }}
                        //     onPress={onSubmit}
                        // >
                        //     <Text
                        //         style={{ color: '#FFF', fontSize: RFValue(14) }}
                        //     >
                        //         Submit
                        //     </Text>
                        // </TouchableOpacity>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: RFValue(10)
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
    textInput: {
        width: '100%',
        backgroundColor: '#F6f6f6',
        color: '#B7b7b7',
        marginVertical: RFValue(5),
        borderRadius: RFValue(10),
        paddingHorizontal: RFValue(25),
        height: RFValue(40),
        fontSize: RFValue(15)
    }

})

export default Essay
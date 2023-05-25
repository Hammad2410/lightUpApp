import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator, Modal, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { postCall } from '../../utils/apiCall';
import ResultModal from '../../components/resultModal';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import PrimaryButton from '../../components/primaryButton';
import ScreenHeading from '../../components/screenHeading';
import Header from '../../components/header';

function Essay({ navigation }) {

    const [topic, setTopic] = useState('')
    const [words, setWords] = useState('')
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
            option: 'Letter',
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
        <View style={styles.container} >
            <ScrollView>
                {/* <TouchableOpacity style={{ position: 'absolute', top: RFValue(10), left: RFValue(10), flexDirection: 'row' }} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={18} color="#FFF" />
                    <Text style={{ color: '#FFF', marginLeft: RFValue(5) }}>Back</Text>
                </TouchableOpacity> */}
                <Header />

                <ScreenHeading
                    heading='Lets Write Letter'
                    subheading='Save hours writing your essay, just give a topic and lightup will write it for you !'
                    logo={require('../../assets/icn_letter.png')}
                />

                {/* <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(45), padding: RFValue(5), marginVertical: RFValue(5), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: RFValue(14), flex: 0.75, fontFamily: 'Roboto-Regular' }}>Lets Write Letter</Text>
                    <Text style={{ fontSize: RFValue(8), flex: 0.75, fontFamily: 'Roboto-Regular' }}>Save hours writing your essay, just give a topic and lightup will write it for you !</Text>
                </LinearGradient> */}
                <View style={{ padding: RFValue(5) }}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={(text) => setTopic(text)}
                        placeholder={"Letter"} />

                    <TouchableOpacity onPress={() => setShowLevelModal(true)}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor={'#B5B5B5'}
                            editable={false}
                            value={level}
                            placeholder={"Academic Level"} />
                    </TouchableOpacity>

                    <TextInput
                        style={styles.textInput}
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
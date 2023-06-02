import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator, FlatList, Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { postCall } from '../../utils/apiCall';
import ResultModal from '../../components/resultModal';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/header';
import ScreenHeading from '../../components/screenHeading';
import PrimaryButton from '../../components/primaryButton';

function Essay({ navigation }) {

    const [topic, setTopic] = useState('')
    const [mcqs, setMcqs] = useState(0)
    const [short, setShort] = useState(0)
    const [long, setLong] = useState(0)

    // const [words, setWords] = useState(50)
    const [level, setLevel] = useState('');

    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const [result, setResult] = useState('');

    const [showLevelModal, setShowLevelModal] = useState(false)


    const onSubmit = () => {
        setLoading(true)

        const params = {
            topic: topic,
            level: level,
            mcqs: mcqs,
            short: short,
            long: long
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
        postCall('/chat/createTest', params, cbSuccess, cbFailure)
        // }
        // else {
        //     alert("Number of words should be less then 1000")
        // }

    }

    return (

        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={'always'}>
                {/* <TouchableOpacity style={{ position: 'absolute', top: RFValue(10), left: RFValue(10), flexDirection: 'row' }} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={18} color="#FFF" />
                    <Text style={{ color: '#FFF', marginLeft: RFValue(5) }}>Back</Text>
                </TouchableOpacity> */}
                <Header onPress={() => navigation.goBack()} />

                <ScreenHeading
                    heading='Make Question Paper'
                    subheading='Save hours writing your essay, just give a topic and lightup will write it for you !'
                    logo={require('../../assets/icn_essay.png')}
                />


                <View style={{ padding: RFValue(5) }}>

                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={(text) => setTopic(text)}
                        placeholder={"Enter Topic"} />

                    {/* <Text
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
                </View> */}
                    {/* <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#B5B5B5'}
                    placeholder={"Enter Topic"} />
                <TextInput
                    style={{ width: '100%', backgroundColor: '#79839B', color: '#FFF', marginVertical: RFValue(5) }}
                    placeholderTextColor={'#B5B5B5'}
                    placeholder={"Academic Level"} /> */}

                    <View style={{ width: '100%', marginVertical: RFValue(5), flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginRight: RFValue(5), alignItems: 'center' }}>
                            <Text style={{ fontSize: RFValue(8), color: '#000' }}>MCQs</Text>
                            <TextInput
                                style={[styles.textInput, { paddingHorizontal: RFValue(5) }]}
                                placeholderTextColor={'#B5B5B5'}
                                onChangeText={(text) => setMcqs(text)}
                                keyboardType={'numeric'}
                            // placeholder={"Enter Number"} 
                            />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: RFValue(5), alignItems: 'center' }}>
                            <Text style={{ fontSize: RFValue(8), color: '#000' }}>Short Questions</Text>
                            <TextInput
                                style={[styles.textInput, { paddingHorizontal: RFValue(5) }]}
                                placeholderTextColor={'#B5B5B5'}
                                onChangeText={(text) => setShort(text)}
                                keyboardType={'numeric'}
                            // placeholder={"Enter Number"} 
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: RFValue(5), alignItems: 'center' }}>
                            <Text style={{ fontSize: RFValue(8), color: '#000' }}>Long Questions</Text>
                            <TextInput
                                style={[styles.textInput, { paddingHorizontal: RFValue(5) }]}
                                placeholderTextColor={'#B5B5B5'}
                                onChangeText={(text) => setLong(text)}
                                keyboardType={'numeric'}
                            // placeholder={"Enter Number"} 
                            />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => setShowLevelModal(true)}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor={'#B5B5B5'}
                            editable={false}
                            value={level}
                            placeholder={"Academic Level"} />
                    </TouchableOpacity>

                    {
                        loading ?
                            <ActivityIndicator size={'large'} color={'#628BEC'} />
                            :
                            <PrimaryButton onPress={onSubmit} label={'Submit'} />

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
        color: '#000',
        marginVertical: RFValue(5),
        borderRadius: RFValue(10),
        paddingHorizontal: RFValue(25),
        height: RFValue(40),
        fontSize: RFValue(15)
    }

})

export default Essay
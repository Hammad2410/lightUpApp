import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, TextInput, ActivityIndicator, Modal, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { postCall } from '../../utils/apiCall';
import CheckBox from '@react-native-community/checkbox';
import ResultModal from '../../components/resultModal';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/header';
import PrimaryButton from '../../components/primaryButton';
import ScreenHeading from '../../components/screenHeading';

function Profile({ navigation }) {

    const [topic, setTopic] = useState('');
    const [words, setWords] = useState('');
    const [option, setOption] = useState('');
    const [level, setLevel] = useState('');

    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const [showLevelModal, setShowLevelModal] = useState(false)

    const [result, setResult] = useState('');

    const onSubmit = () => {


    }

    return (
        <View style={styles.container} >
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'height' : null} keyboardVerticalOffset={RFValue(10)}>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                    <Header onPress={() => navigation.toggleDrawer()} isHome />

                    <ScreenHeading
                        heading={"Profile"}
                        subheading={"                                                                                      "}
                        logo={require('../../assets/icn_profile.png')}
                    />

                    <View >


                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor={'#B5B5B5'}
                            onChangeText={(text) => setTopic(text)}
                            placeholder={"Name"} />

                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor={'#B5B5B5'}
                            // editable={false}

                            placeholder={"Country"} />


                        {/* <TouchableOpacity onPress={() => setShowLevelModal(true)}> */}
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor={'#B5B5B5'}
                            // editable={false}
                            // value={level}
                            placeholder={"Email"} />
                        {/* </TouchableOpacity> */}

                        <TextInput
                            style={styles.textInput}
                            // style={{ flex: 1, backgroundColor: '#79839B', color: '#FFF', marginHorizontal: RFValue(10), textAlign: 'center', height: RFValue(40), textAlignVertical: 'center' }}
                            placeholderTextColor={'#B5B5B5'}
                            keyboardType={'numeric'}
                            value={words.toString()}
                            onChangeText={(text) => setWords(text)}
                            placeholder={"Phone"} />




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



            </KeyboardAvoidingView>
            <View style={{ position: 'absolute', bottom: RFValue(20), width: '100%', padding: RFValue(10), alignSelf: 'center' }}>


                {
                    loading ?
                        <ActivityIndicator size={'large'} color={'#628BEC'} />
                        :
                        <PrimaryButton onPress={onSubmit} label={'Submit'} />

                }
            </View>
        </View >
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

export default Profile
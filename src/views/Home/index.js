import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlanModal from '../../components/planModal';
import { getCall } from '../../utils/apiCall';

function Home({ navigation }) {

    const [showModal, setShowModal] = useState(false);

    const [words, setWords] = useState('0');

    useEffect(() => getWords(), [])

    const getWords = () => {

        const cbSuccess = (data) => {
            setWords(data.words)
        }

        const cbFailure = (error) => {

            alert(error)
        }

        getCall('/chat/getWords', cbSuccess, cbFailure)



    }

    return (
        <ImageBackground style={styles.container} source={require('../../assets/landing.png')}>
            <View style={styles.body}>
                <TouchableOpacity style={{ position: 'absolute', top: RFValue(20), backgroundColor: '#f0f0f0', opacity: 0.75, right: RFValue(10), flexDirection: 'row', padding: RFValue(10), borderRadius: RFValue(10) }} onPress={() => setShowModal(true)}>
                    {/* <Icon name="chevron-left" size={18} color="#FFF" /> */}
                    <Text style={{ color: '#A16B5D', marginLeft: RFValue(5), fontWeight: 'bold' }}>Words: {words}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', top: RFValue(20), left: RFValue(10), flexDirection: 'row', backgroundColor: '#f0f0f0', opacity: 0.75, padding: RFValue(10), borderRadius: RFValue(10) }} onPress={() => navigation.goBack()}>
                    <Text style={{ color: '#A16B5D', marginRight: RFValue(5), fontWeight: 'bold' }}>Log Out</Text>
                    <Icon name="undo" size={18} color="#A16B5D" />
                </TouchableOpacity>
                <View style={{ padding: RFValue(20), paddingVertical: RFValue(5), marginTop: RFValue(150), marginBottom: RFValue(15) }}>
                    <Text style={{ fontSize: RFValue(34), color: '#FFF', fontWeight: 'bold', fontFamily: 'times new roman' }}>Lightup.ai</Text>
                    <Text style={{ fontSize: RFValue(10), color: '#A16B5D', marginHorizontal: RFValue(20) }}>Unlock your creative potential</Text>
                    <Text style={{ fontSize: RFValue(8), color: '#FFF', marginHorizontal: RFValue(30) }}>Writing was never been easier!</Text>
                    {/* <Text style={{
                        color: '#A8A8A8', fontSize: RFValue(12), marginVertical: RFValue(25), alignSelf: 'center',
                        textShadowColor: '#DDFF00', textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 10
                    }}>Unlock your creative potential</Text> */}
                </View>



                {/* <View style={{ height: RFValue(300), flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#FFF', padding: RFValue(5), justifyContent: 'space-around', width: RFValue(100) }}>
                        <View style={{ alignItems: 'center', padding: RFValue(5) }}>
                            <Text style={styles.textLabel}>Diet Plan</Text>
                            <Text style={{ fontSize: RFValue(10), color: '#79839B' }}>Any</Text>
                        </View>
                        <View style={{ alignItems: 'center', padding: RFValue(5) }}>
                            <Text style={styles.textLabel}>Cooking Recipe</Text>
                            <Text style={{ fontSize: RFValue(10), color: '#79839B' }}>Flexible</Text>
                        </View>
                        <View style={{ alignItems: 'center', padding: RFValue(5) }}>
                            <Text style={styles.textLabel}>Compare</Text>
                            <Text style={{ fontSize: RFValue(10), color: '#79839B' }}>Managable</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#79839B', flex: 1, padding: RFValue(10), justifyContent: 'space-around' }}>
                        <Text style={styles.textLabel}>Lets Begin!</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5) }} onPress={() => navigation.navigate('essay')}>
                            <Image source={require('../../assets/icn_note.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                            <View style={{ justifyContent: 'center', padding: RFValue(5) }}>
                                <Text style={{
                                    fontSize: RFValue(14),
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    marginBottom: RFValue(5)
                                }}>Write</Text>
                                <Text style={{ fontSize: RFValue(10), color: '#FFF' }}>Just give a topic!</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5) }} onPress={() => navigation.navigate('askQuestion')}>
                            <Image source={require('../../assets/icn_story.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                            <View style={{ justifyContent: 'center', padding: RFValue(5) }}>
                                <Text style={{
                                    fontSize: RFValue(14),
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    marginBottom: RFValue(5)
                                }}>Light Up Assistant</Text>
                                <Text style={{ fontSize: RFValue(10), color: '#FFF' }}>Type a moral or title!</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5) }} onPress={() => navigation.navigate('summarize')}>
                            <Image source={require('../../assets/icn_doc.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                            <View style={{ justifyContent: 'center', padding: RFValue(5) }}>
                                <Text style={{
                                    fontSize: RFValue(14),
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    marginBottom: RFValue(5)
                                }}>Summarize content</Text>
                                <Text style={{ fontSize: RFValue(10), color: '#FFF' }}>Upload text file and get its summary!</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5) }} onPress={() => navigation.navigate('test')}>
                            <Image source={require('../../assets/icn_task.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                            <View style={{ justifyContent: 'center', padding: RFValue(5) }}>
                                <Text style={{
                                    fontSize: RFValue(14),
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    marginBottom: RFValue(5)
                                }}>Create Question Paper</Text>
                                <Text style={{ fontSize: RFValue(10), color: '#FFF' }}>Upload text and get a test paper!</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5) }} onPress={() => navigation.navigate('mathsQuestion')}>
                            <Image source={require('../../assets/icn_task.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                            <View style={{ justifyContent: 'center', padding: RFValue(5) }}>
                                <Text style={{
                                    fontSize: RFValue(14),
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    marginBottom: RFValue(5)
                                }}>Solve Maths Question</Text>
                                <Text style={{ fontSize: RFValue(10), color: '#FFF' }}>Step by step solution</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5) }} onPress={() => navigation.navigate('mathsQuestion')}>
                            <Image source={require('../../assets/icn_task.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                            <View style={{ justifyContent: 'center', padding: RFValue(5) }}>
                                <Text style={{
                                    fontSize: RFValue(14),
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    marginBottom: RFValue(5)
                                }}>Translate</Text>
                                <Text style={{ fontSize: RFValue(10), color: '#FFF' }}>Step by step solution</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> */}
                {/* <View style={{ height: RFValue(100), backgroundColor: '#fff', flexDirection: 'row' }}>
                    <View style={{ width: RFValue(100), backgroundColor: '#154CB9', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: RFValue(12), color: '#FFF' }}>Invite Friends</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: RFValue(8),
                            color: '#000',
                            textAlign: 'center',
                        }}>POWERED BY</Text>
                        <Text style={{ fontSize: RFValue(12), color: '#79839B' }}>Intellivus Technologies</Text>
                    </View>

                </View> */}
            </View >
            <ScrollView style={{ padding: RFValue(5) }} >
                <View style={{ flexDirection: 'row' }}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#107F8E', '#1C8694', '#115159']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5), flex: 1, marginRight: RFValue(5) }}>
                        <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('essay')} >
                            <Text style={{ fontSize: RFValue(14), flex: 0.75, fontFamily: 'Roboto-Regular' }}>ESSAYS</Text>
                            <Text style={{ fontSize: RFValue(10), fontFamily: 'Roboto-Regular' }}>Save hours writing your essay, just
                                give a topic and lightup will write it
                                for you.</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5), flex: 1, marginLeft: RFValue(5) }}>
                        <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('story')}>
                            <Text style={{ fontSize: RFValue(14), flex: 0.75, fontFamily: 'Roboto-Regular' }}>STORIES</Text>
                            <Text style={{ fontSize: RFValue(10), fontFamily: 'Roboto-Regular' }}>For test, exam of fanfiction, lightup
                                can help.</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5), flex: 1, marginRight: RFValue(5) }}>
                        <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('letter')}>
                            <Text style={{ fontSize: RFValue(14), flex: 0.75, fontFamily: 'Roboto-Regular' }}>LETTERS</Text>
                            <Text style={{ fontSize: RFValue(10), fontFamily: 'Roboto-Regular' }}>Create compelling motivational
                                letters for loved once and for
                                exams.</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#107F8E', '#1C8694', '#115159']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5), flex: 1, marginLeft: RFValue(5) }}>
                        <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('application')} >
                            <Text style={{ fontSize: RFValue(14), flex: 0.75, fontFamily: 'Roboto-Regular' }}>APPLICATIONS</Text>
                            <Text style={{ fontSize: RFValue(10), fontFamily: 'Roboto-Regular' }}>Just give relationship and topic,
                                lightup will write it for you.</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#107F8E', '#1C8694', '#115159']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5), flex: 1, marginRight: RFValue(5) }}>
                        <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('speech')}>
                            <Text style={{ fontSize: RFValue(14), flex: 0.75, fontFamily: 'Roboto-Regular' }}>SPEECHES</Text>
                            <Text style={{ fontSize: RFValue(10), fontFamily: 'Roboto-Regular' }}>Lightup will write speech for you
                                as per desired tone.</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5), flex: 1, marginLeft: RFValue(5) }}>
                        <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('email')}>
                            <Text style={{ fontSize: RFValue(14), flex: 0.75, fontFamily: 'Roboto-Regular' }}>EMAILS</Text>
                            <Text style={{ fontSize: RFValue(10), fontFamily: 'Roboto-Regular' }}>Communicate your message with
                                with confidence.</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                {/* <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#107F8E', '#1C8694', '#115159']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                    <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('blog')}>
                        <Text style={{ fontSize: RFValue(14), flex: 0.75 }}>ARTICLES & BLOGS</Text>
                        <Text style={{ fontSize: RFValue(10) }}>Write blogs and articles faster with the help of lightup.	</Text>
                    </TouchableOpacity>
                </LinearGradient> */}
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                    <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('translate')}>
                        <Text style={{ fontSize: RFValue(14), flex: 0.75, fontFamily: 'Roboto-Regular' }}>TRANSLATE</Text>
                        <Text style={{ fontSize: RFValue(10), fontFamily: 'Roboto-Regular' }}>Lightup can read, write and translate content in 8 languages including English, Urdu,
                            French, German, Italian, Arabic, Hindi and Bengali.	</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#107F8E', '#1C8694', '#115159']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                    <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('test')}>
                        <Text style={{ fontSize: RFValue(14), flex: 0.75, fontFamily: 'Roboto-Regular' }}>MAKE QUESTION PAPER</Text>
                        <Text style={{ fontSize: RFValue(10), fontFamily: 'Roboto-Regular' }}>Give topics and academic level or upload contents, get question paper in seconds
                            consists of MCQs, short or long questions with answers.</Text>
                    </TouchableOpacity>
                </LinearGradient>
                {/* <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#107F8E', '#1C8694', '#115159']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                    <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('askQuestion')}>
                        <Text style={{ fontSize: RFValue(14), flex: 0.75 }}>INSTANT Q&A </Text>
                        <Text style={{ fontSize: RFValue(10) }}>Upload your file, ask anything from the file and get instant answer.	</Text>
                    </TouchableOpacity>
                </LinearGradient> */}

                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                    <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('summarize')}>
                        <Text style={{ fontSize: RFValue(14), flex: 0.75, fontFamily: 'Roboto-Regular' }}>SUMMARIZE</Text>
                        <Text style={{ fontSize: RFValue(10), fontFamily: 'Roboto-Regular' }}>Upload the contents and get summary instantly just by giving number of words
                            of in summary.	</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <PlanModal showModal={showModal} setShowModal={setShowModal} />

                {/* <Modal
                    visible={showModal}
                    transparent
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: RFValue(10) }}>
                        <View style={{ backgroundColor: '#FFF', elevation: RFValue(10), padding: RFValue(10), width: '100%', borderRadius: RFValue(5) }}>
                            <Text style={{ color: '#000', fontSize: RFValue(16), fontWeight: 'bold' }}>Plans</Text>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => setShowModal(false)}>
                                    <Text style={{ color: '#FFF', fontSize: RFValue(16) }} >Rs 25 per 500 words</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => setShowModal(false)}>
                                    <Text style={{ color: '#FFF', fontSize: RFValue(16) }} >Rs 50 per 1000 words</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => setShowModal(false)}>
                                    <Text style={{ color: '#FFF', fontSize: RFValue(16) }} >Rs 100 per 2000 words</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                </Modal> */}

            </ScrollView >
        </ImageBackground >
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

export default Home;
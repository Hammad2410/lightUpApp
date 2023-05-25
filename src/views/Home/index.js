import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlanModal from '../../components/planModal';
import { getCall } from '../../utils/apiCall';
import Header from '../../components/header';
import ItemContainer from './components/itemContainer';

function Home({ navigation }) {

    const [showModal, setShowModal] = useState(false);

    const [words, setWords] = useState('0');

    // useEffect(() => getWords(), [])

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
        <View style={styles.container} source={require('../../assets/landing.png')}>
            <View style={styles.body}>
                <Header onPress={() => { navigation.toggleDrawer() }} />


            </View >
            <ScrollView style={{ padding: RFValue(5) }} >
                <View style={{ flexDirection: 'row' }}>
                    <ItemContainer
                        onPress={() => navigation.navigate('essay')}
                        label={"Essays"}
                        description={"Save hours writing your essay, just give a topic and lightup will write it for you."}
                        logo={require('../../assets/icn_download.png')}
                    />

                    <ItemContainer
                        onPress={() => navigation.navigate('story')}
                        label={"Stories"}
                        description={"For test, exam of fanfiction, lightup can help."}
                        logo={require('../../assets/icn_script.png')}
                    />

                </View>
                <View style={{ flexDirection: 'row' }}>

                    <ItemContainer
                        onPress={() => navigation.navigate('letter')}
                        label={"Letters"}
                        description={"Create compelling motivational letters for loved once and for exams."}
                        logo={require('../../assets/icn_letter.png')}
                    />

                    <ItemContainer
                        onPress={() => navigation.navigate('application')}
                        label={"Applications"}
                        description={"Just give relationship and topic, lightup will write it for you."}
                        logo={require('../../assets/icn_essay.png')}
                    />


                </View>
                <View style={{ flexDirection: 'row' }}>
                    <ItemContainer
                        onPress={() => navigation.navigate('speech')}
                        label={"Speeches"}
                        description={"Lightup will write speech for you as per desired tone."}
                        logo={require('../../assets/icn_translate.png')}
                    />
                    <ItemContainer
                        onPress={() => navigation.navigate('email')}
                        label={"Emails"}
                        description={"Communicate your message with with confidence."}
                        logo={require('../../assets/icn_email.png')}
                    />


                </View>

                <View style={{ flexDirection: 'row' }} >
                    <ItemContainer
                        onPress={() => navigation.navigate('translate')}
                        label={"Translate"}
                        description={"Lightup can read, write and translate content into different languages"}
                        logo={require('../../assets/icn_translate.png')}
                    />

                    <ItemContainer
                        onPress={() => navigation.navigate('test')}
                        label={"Question Paper"}
                        description={"Give topics and  get question paper in seconds with answers."}
                        logo={require('../../assets/icn_essay.png')}
                    />

                </View>

                <View style={{ flexDirection: 'row' }}>
                    <ItemContainer
                        onPress={() => navigation.navigate('summarize')}
                        label={"Summarize"}
                        description={"Upload the contents and get summary instantly just by giving number of words of in summary."}
                        logo={require('../../assets/icn_download.png')}
                    />
                </View>


                {/* <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#107F8E', '#1C8694', '#115159']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                    <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('blog')}>
                        <Text style={{ fontSize: RFValue(14), flex: 0.75 }}>ARTICLES & BLOGS</Text>
                        <Text style={{ fontSize: RFValue(10) }}>Write blogs and articles faster with the help of lightup.	</Text>
                    </TouchableOpacity>
                </LinearGradient> */}


                {/* <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#107F8E', '#1C8694', '#115159']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                    <TouchableOpacity style={{ height: RFValue(90) }} onPress={() => navigation.navigate('askQuestion')}>
                        <Text style={{ fontSize: RFValue(14), flex: 0.75 }}>INSTANT Q&A </Text>
                        <Text style={{ fontSize: RFValue(10) }}>Upload your file, ask anything from the file and get instant answer.	</Text>
                    </TouchableOpacity>
                </LinearGradient> */}



                <PlanModal showModal={showModal} setShowModal={setShowModal} />


            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6f6f6'
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
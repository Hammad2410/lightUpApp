import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


function Home({ navigation }) {

    return (
        <ImageBackground style={styles.container} source={require('../../assets/landing.png')}>
            <View style={styles.body}>
                <View style={{ padding: RFValue(10), width: RFValue(150), paddingVertical: RFValue(15) }}>
                    <Text style={{ fontSize: RFValue(34), color: '#FFF', fontWeight: 'bold' }}>LightUp!</Text>
                    <Text style={{ color: '#7A97C9', fontSize: RFValue(10) }}>Assist Teachers and Students
                        in creating educational
                        contents by AI!</Text>
                </View>


                <View style={{ height: RFValue(300), flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#FFF', padding: RFValue(5), justifyContent: 'space-around', width: RFValue(100) }}>
                        <View style={{ alignItems: 'center', padding: RFValue(5) }}>
                            <Text style={styles.textLabel}>Education Level</Text>
                            <Text style={{ fontSize: RFValue(10), color: '#79839B' }}>Any</Text>
                        </View>
                        <View style={{ alignItems: 'center', padding: RFValue(5) }}>
                            <Text style={styles.textLabel}>Number of words</Text>
                            <Text style={{ fontSize: RFValue(10), color: '#79839B' }}>Flexible</Text>
                        </View>
                        <View style={{ alignItems: 'center', padding: RFValue(5) }}>
                            <Text style={styles.textLabel}>Complexity</Text>
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
                                }}>Essay writing</Text>
                                <Text style={{ fontSize: RFValue(10), color: '#FFF' }}>Just give a topic!</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', alignItems: 'center', padding: RFValue(5) }} onPress={() => navigation.navigate('story')}>
                            <Image source={require('../../assets/icn_story.png')} style={{ width: RFValue(33), height: RFValue(33) }} />
                            <View style={{ justifyContent: 'center', padding: RFValue(5) }}>
                                <Text style={{
                                    fontSize: RFValue(14),
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                    marginBottom: RFValue(5)
                                }}>Story writing</Text>
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
                                }}>Create Test</Text>
                                <Text style={{ fontSize: RFValue(10), color: '#FFF' }}>Upload text and get a test paper!</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: RFValue(100), backgroundColor: '#fff', flexDirection: 'row' }}>
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

                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',

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
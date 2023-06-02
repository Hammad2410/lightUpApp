import react from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/FontAwesome';


const Header = ({ onPress = () => { }, isHome = false }) => {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
                {/* <Icon name="home" size={RFValue(20)} color="#707070" /> */}

                {
                    isHome ?

                        <Image source={require('../assets/icn_menu.png')} style={{ width: RFValue(30), height: RFValue(30), resizeMode: 'contain' }} />
                        : <Icon name="chevron-left" size={20} color="#000" />
                }
            </TouchableOpacity>




            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <TouchableOpacity style={[styles.buttonContainer, styles.buttonBorder]}>
                <Text style={styles.text}>Balance: 0</Text>
            </TouchableOpacity>

        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        height: RFValue(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: RFValue(15),
        alignItems: 'center'
    },
    buttonContainer: {
        padding: RFValue(10),
    },
    logo: {
        height: RFValue(40),
        width: RFValue(60),
        resizeMode: 'contain'
    },
    text: {
        fontSize: RFValue(11),
        color: '#9D8974'
    },
    buttonBorder: {
        borderRadius: RFValue(2.5),
        borderWidth: RFValue(0.5),
        borderColor: '#9D8974'
    }
})

export default Header;
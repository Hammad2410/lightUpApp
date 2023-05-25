import react from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const ScreenHeading = ({ heading = '', subheading = '', logo }) => {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <View>
                <Text style={styles.heading}>{heading}</Text>
                <Text style={styles.subheading}>{subheading}</Text>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        height: RFValue(90),
        paddingHorizontal: RFValue(50),
        marginVertical: RFValue(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BFAA94',
        borderRadius: RFValue(15),
        flexDirection: 'row'
    },
    heading: {
        fontSize: RFValue(14),
        // flex: 0.75,
        fontFamily: "Roboto-Regular"
    },
    subheading: {
        fontSize: RFValue(8),
        // flex: 0.75,
        fontFamily: 'Roboto-Regular'
    },
    logo: {
        margin: RFValue(5),
        height: RFValue(40),
        width: RFValue(40)
    }

})

export default ScreenHeading
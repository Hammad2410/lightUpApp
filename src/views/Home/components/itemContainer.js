import react from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const ItemContainer = ({ title, onPress, label = '', description = '', logo }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
            </View>
            <Text style={styles.label}>
                {label}
            </Text>
            <Text style={styles.decription}>
                {description}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: RFValue(150),
        padding: RFValue(5),
        margin: RFValue(5),
        backgroundColor: '#FFF',
        borderRadius: RFValue(5),
        elevation: RFValue(10),
        flex: 1,
        alignItems: 'center'
    },
    logoContainer: {
        height: RFValue(70),
        width: RFValue(70),
        backgroundColor: "#F6f6f6",
        borderRadius: RFValue(50),
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: RFValue(35),
        height: RFValue(35)
    },
    label: {
        fontSize: RFValue(14),
        color: '#000',
        marginVertical: RFValue(5)
    },
    decription: {
        fontSize: RFValue(9),
        color: '#000',
        marginVertical: RFValue(5),
        textAlign: 'center'
    }
})

export default ItemContainer
import react from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";


const PrimaryButton = ({ label, onPress }) => {

    return (

        <TouchableOpacity style={style.container} onPress={onPress}>
            <Text>{label}</Text>
        </TouchableOpacity>
    )

}

const style = StyleSheet.create({
    container: {
        height: RFValue(70),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#707070',
        borderRadius: RFValue(15)
    },
    text: {
        fontSize: RFValue(16)
    }
})

export default PrimaryButton;
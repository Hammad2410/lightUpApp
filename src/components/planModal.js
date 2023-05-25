
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, Image, Modal, Alert, Linking } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { useStripe } from '@stripe/stripe-react-native';
import { postCall } from '../utils/apiCall';
// import Icon from 'react-native-vector-icons/FontAwesome';

const planModal = ({ showModal, setShowModal }) => {


    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async (amount) => {
        const response = await fetch(`https://lightupai.com/payments/payment-sheet`, {
            method: 'POST',
            body: JSON.stringify({
                amount: amount
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async (amount) => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        } = await fetchPaymentSheetParams(amount);

        const { error } = await initPaymentSheet({
            merchantDisplayName: "LightUpAI",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });

        await openPaymentSheet(amount)

        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async (amount) => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');

            const params = {
                words: +amount * 25,
            }

            const cbSuccess = (data) => {
                setShowModal(false)
            }

            const cbFailure = (error) => {
                setLoading(false)
                alert(error)
            }


            postCall('/payments/confirmPayment', params, cbSuccess, cbFailure)

        }

    };

    // useEffect(() => {
    //     initializePaymentSheet();
    // }, []);

    return (
        <Modal
            visible={showModal}
            transparent
            onRequestClose={() => setShowModal(false)}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: RFValue(10) }}>
                <View style={{ backgroundColor: '#FFF', elevation: RFValue(10), padding: RFValue(10), width: '100%', borderRadius: RFValue(5) }}>
                    <Text style={{ color: '#000', fontSize: RFValue(16), fontWeight: 'bold' }}>Plans</Text>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                initializePaymentSheet(140)
                                // openPaymentSheet()
                                // setShowModal(false)
                            }}>
                            <Text style={{ color: '#FFF', fontSize: RFValue(16) }} >Rs 140 per 500 words</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => initializePaymentSheet(280)}>
                            <Text style={{ color: '#FFF', fontSize: RFValue(16) }} >Rs 280 per 1000 words</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#5C4DB7', '#4C3F97', '#2E275C']} style={{ height: RFValue(90), padding: RFValue(5), marginVertical: RFValue(5) }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => initializePaymentSheet(1000)}>
                            <Text style={{ color: '#FFF', fontSize: RFValue(16) }} >Rs 1000 per 2000 words</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </Modal>)
}

export default planModal;
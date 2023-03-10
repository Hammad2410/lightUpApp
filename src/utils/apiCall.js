import axios from 'axios';
import { BASE_URL } from './configs';
// import Auth from '@aws-amplify/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postCall = async (endpoint, params, cbSuccess, cbFailure) => {

    try {
        let token = await AsyncStorage.getItem('token')

        console.log(token)

        axios.post(BASE_URL + endpoint, params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.data.success) {
                    cbSuccess(response.data)
                }
                else {
                    cbFailure(response.data.message)
                }
            })
            .catch((error) => {
                console.warn("Error: ", error)
                cbFailure(error.message)
            })
    }
    catch (error) {
        cbFailure(error.message)
    }
}

export const getCall = async (endpoint, cbSuccess, cbFailure) => {

    try {
        // let user = await Auth.currentAuthenticatedUser()

        let token = await AsyncStorage.getItem('token')

        axios.get(BASE_URL + endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.data.success) {
                    cbSuccess(response.data)
                }
                else {
                    cbFailure(response.data.message)
                }
            })
            .catch((error) => {
                console.warn("Error: ", error)
                cbFailure(error.message)
            })
    }
    catch (error) {
        cbFailure(error.message)
    }
}


export const uploadCall = async (endpoint, params, cbSuccess, cbFailure) => {

    try {
        let token = await AsyncStorage.getItem('token')

        console.log(token)

        axios.post(BASE_URL + endpoint, params, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                if (response.data.success) {
                    cbSuccess(response.data)
                }
                else {
                    cbFailure(response.data.message)
                }
            })
            .catch((error) => {
                console.warn("Error: ", error)
                cbFailure(error.message)
            })
    }
    catch (error) {
        cbFailure(error.message)
    }
}
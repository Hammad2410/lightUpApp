import axios from 'axios';
import { BASE_URL } from './configs';
// import Auth from '@aws-amplify/auth';

export const postCall = async (endpoint, params, cbSuccess, cbFailure) => {

    try {
        // let user = await Auth.currentAuthenticatedUser()

        axios.post(BASE_URL + endpoint, params, {
            // headers: {
            //     Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`
            // }
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

        axios.get(BASE_URL + endpoint, {
            // headers: {
            //     Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`
            // }
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
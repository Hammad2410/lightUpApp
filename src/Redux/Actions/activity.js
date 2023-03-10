import * as types from '../ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const loggedIn = (token) => {
    return dispatch => {
        AsyncStorage.setItem('token', token).then(() => {
            dispatch({ type: types.AUTH_LOGIN, token: token })
        })
    }
}

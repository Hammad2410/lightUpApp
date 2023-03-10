import * as types from '../ActionTypes';

const initialState = {
    token: null
};

const auth = (state = initialState, action) => {
    switch (action.type) {

        case types.AUTH_LOGIN:
            return {
                ...state,
                token: action.token
            }

        default:
            return state;
    }
};

export default auth;
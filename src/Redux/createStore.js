import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./Reducers";

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunkMiddleware))
};


export default configureStore
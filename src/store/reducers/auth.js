import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 1/2/2021.
 */

const initialState = {
    token: null,
    error: null,
    loading: false,
};

const authStart = state => {
    const updatedObject = { error: null, loading: true };
    return updateObject(state, updatedObject);
};

const authSuccess = (state, action) => {
    const updatedObject = {
        token: action.idToken,
        error: null,
        loading: false
    };
    return updateObject(state, updatedObject);
};

const authFail = (state, action) => {
    const updatedObject = {
        error: action.error,
        loading: false
    };
    return updateObject(state, updatedObject);
};

const authLogout = state => {
    return updateObject(state, { token: null });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        default: return state;
    }
};

export default reducer;
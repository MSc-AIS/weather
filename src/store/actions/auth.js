import * as actionTypes from './actionTypes';
import axios from '../../axios-weather';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 1/2/2021.
 */

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token
    };
};

const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    //  remove local storage user information
    localStorage.removeItem('token');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authSignIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        axios.get(`ms/ais/api/user/signin?email=${email}&password=${password}`)
            .then(response => {
                //  store token into the local storage
                localStorage.setItem('token', response.data);

                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });
    }
}

export const authSignUp = (firstName, lastName, email, password) => {
    return dispatch => {
        dispatch(authStart());
        //  user authentication
        const authData = {
            firstName,
            lastName,
            email,
            password
        };

        //  SignUp
        axios.post(`ms/ais/api/user/signup`, authData)
            .then(response => {
                // console.log(response);
                // store token into the local storage
                localStorage.setItem('token', response.data);

                dispatch(authSuccess(response.data));
                console.log('done token');
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });
    }
};

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');

    dispatch(token ? authSuccess(token) : logout());
};
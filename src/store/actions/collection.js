import * as actionTypes from './actionTypes';
import axios from '../../axios-weather';

const fetchCitiesCollectionStart = () => {
    return {
        type: actionTypes.FETCH_CITIES_COLLECTION_START
    };
};

const fetchCitiesCollectionSuccess = cities => {
    return {
        type: actionTypes.FETCH_CITIES_COLLECTION_SUCCESS,
        cities: cities
    };
};

const fetchCitiesCollectionFail = error => {
    return {
        type: actionTypes.FETCH_CITIES_COLLECTION_FAIL,
        error: error
    };
};

export const fetchCitiesCollection = token => dispatch => {
    dispatch(fetchCitiesCollectionStart);
    //  fetching user cities collection
    axios.get(`http://localhost:9000/ms/ais/api/user/cities?tokenId=${token}`)
        .then(response => {
            dispatch(fetchCitiesCollectionSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchCitiesCollectionFail(error));
        });
};

export const clearCitiesCollection = () => {
    return {
        type: actionTypes.CLEAR_CITIES_COLLECTION
    };
};
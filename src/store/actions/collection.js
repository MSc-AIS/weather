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
    axios.get(`ms/ais/api/user/cities?tokenId=${token}`)
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

const startDeleteCity = cityId => {
    return {
        type: actionTypes.DELETE_CITY,
        cityId
    };
};

export const deleteCity = (cityId, token) => dispatch => {
    //  post the city for delete to the backend
    axios.delete(`ms/ais/api/user/city?tokenId=${token}&cityId=${cityId}`)
        .then(response => {
            //  delete city from the store
            dispatch(startDeleteCity(cityId));
        })
        .catch(error => {
            console.log(error);
        });
};

const addCitySuccess = city => {
    return {
        type: actionTypes.ADD_CITY,
        newCity: city
    };
};

export const addCity = (city, token) => dispatch => {
    axios.post(`ms/ais/api/user/city?tokenId=${token}&cityId=${city.id}`)
        .then(response => {
            console.log(response.data);
            dispatch(addCitySuccess(city));
            //  dispatch depends on the response data
            dispatch(fetchCitiesCollection(token));
        })
        .catch(error => {
            console.log(error);
        });
};
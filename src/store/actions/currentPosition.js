import * as actionTypes from './actionTypes';
import axios from 'axios';
import {mapWeatherConditions} from "../../shared/utility";

// import curSample from '../../assets/sample/currentAthens.json';
// import dailySample from '../../assets/sample/daily.json';
// import hourlySample from '../../assets/sample/hourly.json';

/**
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

const fetchCitySuccess = city => {
    return {
        type: actionTypes.FETCH_CITY_SUCCESS,
        city: city
    };
};

const fetchCityFail = error => {
    return {
        type: actionTypes.FETCH_CITY_FAIL,
        cityError: error
    };
};

export const fetchCity = () => dispatch => {
    axios.get('https://geolocation-db.com/json')
        .then(response => {
            // console.log(response.data);
            const city = {
                name: response.data.city,
                coordinates: [response.data.longitude, response.data.latitude]
            };
            dispatch(fetchCitySuccess(city))
        })
        .catch(error => dispatch(fetchCityFail(error.message)));
};

const fetchConditionsStart = () => {
    return {
        type: actionTypes.FETCH_CONDITIONS_START
    };
};

const fetchConditionsSuccess = (cityInfo, displayingData, forecastData) => {
    return {
        type: actionTypes.FETCH_CONDITIONS_SUCCESS,
        city: cityInfo,
        displayingData,
        forecastData
    };
};

const fetchConditionsFail = error => {
    return {
        type: actionTypes.FETCH_CONDITIONS_FAIL,
        conditionsError: error
    };
};

export const fetchConditions = city => dispatch => {
    dispatch(fetchConditionsStart());
    // concurrent async calls with join promises. Stavros Labrinos [stalab at linuxmail.org] on 2/2/21.
    Promise.all([
        axios.get(`http://localhost:9000/ms/ais/api/forecast/current/city/${city}`),
        axios.get(`http://localhost:9000/ms/ais/api/forecast/daily/city/${city}`),
        axios.get(`http://localhost:9000/ms/ais/api/forecast/hourly/city/${city}`)
    ]).then(response => {
        const { cityInfo, displayingData, forecastData } = mapWeatherConditions(response);
        //  action call to store weather condition data to the store
        dispatch(fetchConditionsSuccess(cityInfo, displayingData, forecastData));
    }).catch(error => {
        dispatch(fetchConditionsFail(error));
    });
};

export const setForecastToDisplayingConditions = conditions => {
    const newDisplayingConditions = {
        id: conditions.id,
        displaying: {
            timestamp: conditions.timestamp,
            temperatureConditions: conditions.dailyTemperatureConditions,
            weatherConditions: conditions.dailyWeatherConditions,
            windConditions: conditions.dailyWindConditions
        }
    };
    return {
        type: actionTypes.SET_FORECAST_TO_DISPLAYING_CONDITIONS,
        displayingConditions: newDisplayingConditions
    };
};

export const setCurrentToDisplayingConditions = () => {
    return {
        type: actionTypes.SET_CURRENT_TO_DISPLAYING_CONDITIONS
    };
};
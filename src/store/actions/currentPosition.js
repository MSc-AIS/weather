import * as actionTypes from './actionTypes';
import axios from 'axios';
import axiosWeather from '../../axios-weather';
import { mapWeatherConditions } from '../../shared/utility';

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
    axios.get('http://api.ipstack.com/check?access_key=8f0513df0cc0f66506cad2a187e485d6')
        .then(response => {
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
        axiosWeather.get(`ms/ais/api/forecast/current/city/${city}`),
        axiosWeather.get(`ms/ais/api/forecast/daily/city/${city}`),
        axiosWeather.get(`ms/ais/api/forecast/hourly/city/${city}`)
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
import * as actionTypes from './actionTypes';
import { mapWeatherConditions } from '../../shared/utility';
import axios from 'axios';

/**
 * @author Stavros Labrinos [stalab at linuxmail.org] on 31/01/21.
 */

const fetchInputCityConditionsStart = () => {
    return {
        type: actionTypes.FETCH_INPUT_CITY_CONDITIONS_START
    };
};

const fetchInputCityConditionsSuccess = (cityInfo, displayingData, forecastData) => {
    return {
        type: actionTypes.FETCH_INPUT_CITY_CONDITIONS_SUCCESS,
        city: cityInfo,
        displayingData,
        forecastData
    };
};

const fetchInputCityConditionsFail = error => {
    return {
        type: actionTypes.FETCH_INPUT_CITY_CONDITIONS_FAIL,
        conditionsError: error
    };
};

export const fetchInputCityConditions = city => dispatch => {
    dispatch(fetchInputCityConditionsStart());
    // concurrent async calls with join promises. Stavros Labrinos [stalab at linuxmail.org] on 2/2/21.
    Promise.all([
        axios.get(`http://localhost:9000/ms/ais/api/forecast/current/city/${city}`),
        axios.get(`http://localhost:9000/ms/ais/api/forecast/daily/city/${city}`),
        axios.get(`http://localhost:9000/ms/ais/api/forecast/hourly/city/${city}`)
    ]).then(response => {
        const { cityInfo, displayingData, forecastData } = mapWeatherConditions(response);
        //  action call to store weather condition data to the store
        dispatch(fetchInputCityConditionsSuccess(cityInfo, displayingData, forecastData));
    }).catch(error => {
        dispatch(fetchInputCityConditionsFail(error));
    });
};

export const setForecastToDisplay = conditions => {
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
        type: actionTypes.SET_FORECAST_TO_DISPLAY,
        displayingConditions: newDisplayingConditions
    };
};

export const setCurrentToDisplay = () => {
    return {
        type: actionTypes.SET_CURRENT_TO_DISPLAY
    };
};
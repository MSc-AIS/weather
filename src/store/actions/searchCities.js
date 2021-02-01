import * as actionTypes from './actionTypes';
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
    console.log(`http://localhost:9000/ms/ais/api/forecast/current/city/${city}`);
    //  getting the data from 3 backend calls
    axios.get(`http://localhost:9000/ms/ais/api/forecast/current/city/${city}`)
        .then(response => {
            const currentConditions = response.data;
            axios.get(`http://localhost:9000/ms/ais/api/forecast/daily/city/${city}`)
                .then(response => {
                    const dailyConditions = response.data;
                    axios.get(`http://localhost:9000/ms/ais/api/forecast/hourly/city/${city}`)
                        .then(response => {
                            console.log('in', response.data);
                            const hourlyConditions = response.data;

                            const cityInfo = {
                                name: currentConditions.cityGeoPoint.cityName,
                                coordinates: currentConditions.cityGeoPoint.coordinates
                            };

                            const displayingData = {
                                id: new Date(currentConditions.current.timestamp * 1000).toLocaleDateString(),
                                displaying: {
                                    ...currentConditions.current
                                },
                                hourly: hourlyConditions.hourly
                            };

                            const forecastData = dailyConditions.daily.map(day => {
                                return {
                                    ...day,
                                    id: new Date(day.timestamp * 1000).toLocaleDateString(),
                                };
                            });
                            //  action call to store weather condition data to the store
                            dispatch(fetchInputCityConditionsSuccess(cityInfo, displayingData, forecastData));
                        }).catch(error => {
                        dispatch(fetchInputCityConditionsFail(error));
                    })
                }).catch((error => {
                dispatch(fetchInputCityConditionsFail(error));
            }))
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
import * as actionTypes from './actionTypes';
import axios from 'axios';

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

    //  getting the data from 3 backend calls
    axios.get(`http://localhost:9000/ms/ais/api/forecast/current/city/${city}`)
        .then(response => {
            const currentConditions = response.data;
            axios.get(`http://localhost:9000/ms/ais/api/forecast/daily/city/${city}`)
                .then(response => {
                    const dailyConditions = response.data;
                    axios.get(`http://localhost:9000/ms/ais/api/forecast/hourly/city/${city}`)
                        .then(response => {
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
                            dispatch(fetchConditionsSuccess(cityInfo, displayingData, forecastData));
                        }).catch(error => {
                        dispatch(fetchConditionsFail(error));
                    })
                }).catch((error => {
                dispatch(fetchConditionsFail(error));
            }))
        }).catch(error => {
            dispatch(fetchConditionsFail(error));
    });

    // //  for now response data from json
    // const currentConditions = curSample;
    // const dailyConditions = dailySample;
    // const hourlyConditions = hourlySample;
    //
    // //  manipulating the returned data to the app needs
    // const cityInfo = {
    //     name: currentConditions.cityGeoPoint.cityName,
    //     coordinates: currentConditions.cityGeoPoint.coordinates
    // };
    //
    // const displayingData = {
    //     id: new Date(currentConditions.current.timestamp * 1000).toLocaleDateString(),
    //     displaying: {
    //         ...currentConditions.current
    //     },
    //     hourly: hourlyConditions.hourly
    // };
    //
    // const forecastData = dailyConditions.daily.map(day => {
    //     return {
    //         ...day,
    //         id: new Date(day.timestamp * 1000).toLocaleDateString(),
    //     };
    // });
    //
    // //  action call to store weather condition data to the store
    // dispatch(fetchConditionsSuccess(cityInfo, displayingData, forecastData));
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
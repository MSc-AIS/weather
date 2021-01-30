import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

/**
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */


const initialState = {
    city: null,
    displayingConditions: null,
    currentConditions: null,
    forecastConditions: null,
    loading: false,
    cityError: null,
    conditionsError: null,
    conditionsFetched: false
};

const fetchCitySuccess = (state, action) => {
    //  only for development
    const city = {
        name: action.city.name === 'Athens' ? action.city.name : 'Athens',
        coordinates: action.city.coordinates
    }
    return updateObject(state, { city: city });
};

const fetchCityError = (state, action) => {
    return updateObject(state, { cityError: action.cityError });
};

const fetchConditionsStart = state => {
    return updateObject(state, { loading: true });
};

const fetchConditionsSuccess = (state, action) => {
    return updateObject(state, {
        city: action.city,
        displayingConditions: action.displayingData,
        currentConditions: action.displayingData,
        forecastConditions: action.forecastData,
        loading: false,
        conditionsFetched: true
    });
};

const fetchConditionsFail = (state, action) => {
    return updateObject(state, { conditionsError: action.conditionsError, loading: false });
};

const setForecastToDisplayingConditions = (state, action) => {
    return updateObject(state, { displayingConditions: action.displayingConditions });
};

const setCurrentToDisplayingConditions = state => {
    return updateObject(state, { displayingConditions: state.currentConditions });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CITY_SUCCESS: return fetchCitySuccess(state, action);
        case actionTypes.FETCH_CITY_FAIL: return fetchCityError(state, action);
        case actionTypes.FETCH_CONDITIONS_START: return fetchConditionsStart(state);
        case actionTypes.FETCH_CONDITIONS_SUCCESS: return fetchConditionsSuccess(state, action);
        case actionTypes.FETCH_CONDITIONS_FAIL: return fetchConditionsFail(state, action);
        case actionTypes.SET_FORECAST_TO_DISPLAYING_CONDITIONS: return setForecastToDisplayingConditions(state, action);
        case actionTypes.SET_CURRENT_TO_DISPLAYING_CONDITIONS: return setCurrentToDisplayingConditions(state);
        default: return state;
    }
};

export default reducer;
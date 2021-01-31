import { updateObject } from '../../shared/utility';
import * as actionTypes from '../actions/actionTypes';

/**
 * @author Stavros Labrinos [stalab at linuxmail.org] on 31/01/21.
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

const fetchInputCityConditionsStart = state => {
    return updateObject(state, { loading: true,  conditionsFetched: false});
};

const fetchInputCityConditionsSuccess = (state, action) => {
    return updateObject(state, {
        city: action.city,
        displayingConditions: action.displayingData,
        currentConditions: action.displayingData,
        forecastConditions: action.forecastData,
        loading: false,
        conditionsFetched: true
    });
};

const fetchInputCityConditionsFail = (state, action) => {
    return updateObject(state, {
        conditionsError: action.conditionsError,
        loading: false,
        conditionsFetched: false
    });
};

const setForecastToDisplay = (state, action) => {
    return updateObject(state, { displayingConditions: action.displayingConditions });
};

const setCurrentToDisplay = state => {
    return updateObject(state, { displayingConditions: state.currentConditions });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INPUT_CITY_CONDITIONS_START: return fetchInputCityConditionsStart(state);
        case actionTypes.FETCH_INPUT_CITY_CONDITIONS_SUCCESS: return fetchInputCityConditionsSuccess(state, action);
        case actionTypes.FETCH_INPUT_CITY_CONDITIONS_FAIL: return fetchInputCityConditionsFail(state, action);
        case actionTypes.SET_FORECAST_TO_DISPLAY: return setForecastToDisplay(state, action);
        case actionTypes.SET_CURRENT_TO_DISPLAY: return setCurrentToDisplay(state);
        default: return state;
    }
};

export default reducer;
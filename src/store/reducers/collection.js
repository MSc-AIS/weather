import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    collection: [],
    loading: false
};

const fetchCitiesCollectionStart = state => {
    return updateObject(state, { loading: true });
};

const fetchCitiesCollectionSuccess = (state, action) => {
    return updateObject(state, {
        collection: action.cities ,
        loading: false
    });
};

const fetchCitiesCollectionFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const clearCitiesCollection = state => {
    return updateObject(state, { collection: [] });
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CITIES_COLLECTION_START: return fetchCitiesCollectionStart(state);
        case actionTypes.FETCH_CITIES_COLLECTION_SUCCESS: return fetchCitiesCollectionSuccess(state, action);
        case actionTypes.FETCH_CITIES_COLLECTION_FAIL: return fetchCitiesCollectionFail(state, action);
        case actionTypes.CLEAR_CITIES_COLLECTION: return clearCitiesCollection(state, action);
        default: return state;
    }
};

export default reducer;
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    collection: [],
    loading: false,
    collectionError: null,
    saved: false
};

const fetchCitiesCollectionStart = state => {
    return updateObject(state, { loading: true, saved: false });
};

const fetchCitiesCollectionSuccess = (state, action) => {
    return updateObject(state, {
        collection: action.cities ,
        loading: false
    });
};

const fetchCitiesCollectionFail = (state, action) => {
    return updateObject(state, { collectionError: action.error, loading: false });
};

const clearCitiesCollection = state => {
    return updateObject(state, { collection: [] });
};

const deleteCity = (state, action) => {
    const updatedCollection = state.collection.filter(city => city.id !== action.cityId);

    return updateObject(state, { collection: updatedCollection });
};

const addCity = (state, action) => {
    const city = {
        cityGeoPoint: {
            coordinates: action.newCity.coordinates,
            cityName: action.newCity.name
        },
        id: action.newCity.cityId,
        country: action.newCity.country
    }
    const updatedCollection = state.collection.concat(city);

    return updateObject(state, { collection: updatedCollection, saved: true });
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CITIES_COLLECTION_START: return fetchCitiesCollectionStart(state);
        case actionTypes.FETCH_CITIES_COLLECTION_SUCCESS: return fetchCitiesCollectionSuccess(state, action);
        case actionTypes.FETCH_CITIES_COLLECTION_FAIL: return fetchCitiesCollectionFail(state, action);
        case actionTypes.CLEAR_CITIES_COLLECTION: return clearCitiesCollection(state, action);
        case actionTypes.DELETE_CITY: return deleteCity(state, action);
        case actionTypes.ADD_CITY: return addCity(state, action);
        default: return state;
    }
};

export default reducer;
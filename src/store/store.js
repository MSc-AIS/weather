import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import currentReducer from './reducers/currentPotision';
import searchReducer from './reducers/searchCities';

/**
 * @author Stavros Labrinos [stalab at linuxmail.org] on 28/01/21.
 */

//  middleware enchanters from redux development tools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
   current:  currentReducer,
   search: searchReducer
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

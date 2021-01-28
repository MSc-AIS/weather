import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import currentReducer from './reducers/currentPotision';


//  middleware enchanters from redux development tools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
   current:  currentReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

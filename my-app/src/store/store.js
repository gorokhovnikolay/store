import { legacy_createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	userReducer,
	modalCatalogReducer,
	modalReducer,
	searchPhraseReducer,
	cartReducer,
} from './reducers';

const reducer = combineReducers({
	user: userReducer,
	modalCatalog: modalCatalogReducer,
	modal: modalReducer,
	searchPhrase: searchPhraseReducer,
	cart: cartReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk)),
);
